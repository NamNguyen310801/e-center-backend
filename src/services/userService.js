const User = require("../models/UserModel");
const Student = require("../models/StudentModel");
const Teacher = require("../models/TeacherModel");
const bcrypt = require("bcrypt"); // ma hoa password
const { generalAccessToken, generalRefreshToken } = require("./JWTService");
const register = async (newUser) => {
  const {
    email,
    password,
    confirmPassword,
    role = 3,
    name = "",
    phone = "",
    address = "",
    date = "",
    avatar = "",
    gender = "",
    coverImage = "",
    intro = "",
  } = newUser;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return {
        status: "ERROR",
        message: "Email đã tồn tại",
      };
    }
    const hash = bcrypt.hashSync(password, 10);
    const createUser = await User.create({
      email,
      password: hash,
      role,
      name,
      phone,
      address,
      date,
      avatar,
      coverImage,
      gender,
      intro,
    });
    if (createUser) {
      if (role === 2) {
        // Nếu người dùng có vai trò là 3, thêm vào bảng Teacher bằng TeacherModel
        const createTeacher = await Teacher.create({
          _id: createUser._id,
          email,
          salary: "",
          facebook: "",
          instagram: "",
          google: "",
          youtube: "",
          salaryList: [],
        });
        return {
          status: "OK",
          message: "Thêm giảng viên thành công",
          data: createTeacher,
        };
      }
      if (role === 3) {
        // Nếu người dùng có vai trò là 3, thêm vào bảng Student bằng StudentModel
        const createStudent = await Student.create({
          _id: createUser._id,
          email,
          tuition: "",
          klass: "",
          course: [],
          tuitionList: [],
        });
        return {
          status: "OK",
          message: "Thêm học viên thành công",
          data: createStudent,
        };
      }
      return {
        status: "OK",
        message: "Thêm người dùng thành công",
        data: createUser,
      };
    }
  } catch (error) {
    return {
      status: "ERROR",
      message: "Lỗi khi tạo người dùng",
      error: error.message,
    };
  }
};

//Login
const loginUser = async (userLogin) => {
  const { email, password } = userLogin;
  try {
    const checkUser = await User.findOne({ email: email });
    if (checkUser === null) {
      return {
        status: "ERROR",
        message: "Người dùng không tồn tại",
      };
    }
    const comparePassword = bcrypt.compareSync(password, checkUser.password);
    if (!comparePassword) {
      return {
        status: "ERROR",
        message: "Mật khẩu hoặc email không chính xác",
      };
    }
    const access_token = await generalAccessToken({
      id: checkUser._id,
      role: checkUser.role,
    });
    const refresh_token = await generalRefreshToken({
      id: checkUser._id,
      role: checkUser.role,
    });
    return {
      status: "OK",
      message: "Đăng nhập thành công",
      access_token,
      refresh_token,
    };
  } catch (error) {
    return {
      status: "ERROR",
      message: "Lỗi khi đăng nhập",
      error: error.message,
    };
  }
};
//Update
const updateUser = async (id, data) => {
  try {
    const checkUser = await User.findOne({ _id: id });
    if (checkUser === null) {
      return {
        status: "ERROR",
        message: "Người dùng không tồn tại",
      };
    }
    const oldRole = checkUser.role;
    const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
    if (oldRole === 2 && updatedUser?.role === 3) {
      const teacher = await Teacher.findOneAndRemove({ _id: id });
      if (teacher) {
        await Student.create({
          _id: id,
          email: updatedUser?.email,
          klass: "",
          tuition: "",
          course: [],
        });
      }
    }
    if (oldRole === 3 && updatedUser?.role === 2) {
      const student = await Student.findOneAndRemove({ _id: id });
      if (student) {
        await Teacher.create({
          _id: id,
          email: updatedUser?.email,
          facebook: "",
          instagram: "",
          google: "",
          youtube: "",
        });
      }
    }
    if (oldRole === 1 && updatedUser?.role === 2) {
      await Teacher.create({
        _id: updatedUser?._id,
        email: updatedUser?.email,
        facebook: "",
        instagram: "",
        google: "",
        youtube: "",
      });
    }
    if (oldRole === 1 && updatedUser?.role === 3) {
      await Student.create({
        _id: updatedUser._id,
        email: updatedUser?.email,
        klass: "",
        tuition: "",
        course: [],
      });
    }
    return {
      status: "OK",
      message: "Cập nhật người dùng thành công",
      data: updatedUser,
    };
  } catch (error) {
    return {
      status: "ERROR",
      message: "Lỗi khi cập nhật người dùng",
      error: error.message,
    };
  }
};
const updateTeacher = async (id, data) => {
  try {
    const checkTeacher = await Teacher.findOne({ _id: id });
    if (checkTeacher === null) {
      return {
        status: "ERROR",
        message: "Người dùng không tồn tại",
      };
    }
    const updatedTeacher = await Teacher.findByIdAndUpdate(id, data, {
      new: true,
    });
    return {
      status: "OK",
      message: "Cập nhật giảng viên thành công",
      data: updatedTeacher,
    };
  } catch (error) {
    return {
      status: "ERROR",
      message: "Lỗi khi cập nhật giảng viên",
      error: error.message,
    };
  }
};
const updateStudent = async (id, data) => {
  try {
    const { tuition, course, klass } = data;
    const checkStudent = await Student.findOne({ _id: id });
    if (checkStudent === null) {
      return {
        status: "ERROR",
        message: "Người dùng không tồn tại",
      };
    }
    checkStudent.tuition = tuition || checkStudent.tuition;
    checkStudent.course = course || checkStudent.course;
    checkStudent.klass = klass || checkStudent.klass;
    await checkStudent.save();
    return {
      status: "OK",
      message: "Cập nhật học viên thành công",
      data: checkStudent,
    };
  } catch (error) {
    return {
      status: "ERROR",
      message: "Lỗi khi cập nhật học viên",
      error: error.message,
    };
  }
};
//delete
const deleteUser = async (id) => {
  try {
    const checkUser = await User.findOne({ _id: id });
    if (checkUser === null) {
      return {
        status: "ERROR",
        message: "Người dùng không tồn tại",
      };
    }
    const userEmail = checkUser.email;
    await User.findByIdAndDelete(id);
    // Xóa học sinh hoặc giáo viên có cùng email
    await Student.deleteMany({ email: userEmail });
    await Teacher.deleteMany({ email: userEmail });

    return {
      status: "OK",
      message: "Xóa thành công",
    };
  } catch (error) {
    throw error;
  }
};
//delete many
const deleteManyUser = async (ids) => {
  try {
    await User.deleteMany({ _id: ids });
    await Teacher.deleteMany({ _id: { $in: ids } });
    await Student.deleteMany({ _id: { $in: ids } });
    return {
      status: "OK",
      message: "Xóa thành công",
    };
  } catch (error) {
    throw error;
  }
};
//Get all
const getAllUser = async (limit, page, sort, filter) => {
  try {
    const totalUser = await User.count();
    if (limit) {
      const allUserLimit = await User.find()
        .limit(limit)
        .skip(page * limit);
      return {
        status: "OK",
        message: "SUCCESS",
        data: allUserLimit,
        total: totalUser,
        currentPage: Number(page + 1),
        totalPage: Math.ceil(totalUser / limit),
      };
    }

    if (sort) {
      const objSort = {};
      objSort[sort[1]] = sort[0];
      const allUserSort = await User.find()
        .limit(limit)
        .skip(page * limit)
        .sort(objSort);
      return {
        status: "OK",
        message: "SUCCESS",
        data: allUserSort,
        total: totalUser,
        currentPage: Number(page + 1),
        totalPage: Math.ceil(totalUser / limit),
      };
    }

    if (filter) {
      const label = filter[0];
      const allUserFilter = await User.find({
        [label]: { $regex: filter[1] },
      })
        .limit(limit)
        .skip(page * limit);
      return {
        status: "OK",
        message: "SUCCESS",
        data: allUserFilter,
        total: totalUser,
        currentPage: Number(page + 1),
        totalPage: Math.ceil(totalUser / limit),
      };
    }

    const allUser = await User.find();
    return {
      status: "OK",
      message: "SUCCESS",
      data: allUser,
    };
  } catch (error) {
    throw error;
  }
};

//Get all Student
const getAllStudent = async () => {
  try {
    const allStudent = await Student.find();
    const allUserStudent = await User.find({ role: 3 });
    const studentList = allUserStudent?.map((user) => {
      const student = allStudent?.find(
        (student) => student?.email === user?.email
      );
      if (student) {
        return {
          _id: user?._id,
          email: student?.email,
          password: user?.password,
          role: 3,
          name: user?.name,
          phone: user?.phone,
          address: user?.address,
          date: user?.date,
          avatar: user?.avatar,
          intro: user?.intro,
          coverImage: user?.coverImage,
          createdAt: user?.createdAt,
          updatedAt: user?.updatedAt,
          __v: user?.__v,
          gender: user?.gender,
          klass: student?.klass,
          course: student?.course,
          tuition: student?.tuition,
          tuitionList: student?.tuitionList,
        };
      }
    });
    return {
      status: "OK",
      message: "SUCCESS",
      data: studentList,
    };
  } catch (error) {
    throw error;
  }
};

//get All Teacher
const getAllTeacher = async () => {
  try {
    const allTeacher = await Teacher.find();
    const allUserTeacher = await User.find({ role: 2 });
    const teacherList = allUserTeacher?.map((user) => {
      const teacher = allTeacher?.find(
        (teacher) => teacher?.email === user?.email
      );
      if (teacher) {
        return {
          _id: user?._id,
          email: teacher?.email,
          password: user?.password,
          role: 2,
          name: user?.name,
          phone: user?.phone,
          address: user?.address,
          date: user?.date,
          avatar: user?.avatar,
          coverImage: user?.coverImage,
          intro: user?.intro,
          createdAt: user?.createdAt,
          updatedAt: user?.updatedAt,
          __v: user?.__v,
          gender: user?.gender,
          salary: teacher?.salary,
          facebook: teacher?.facebook,
          instagram: teacher?.instagram,
          google: teacher?.google,
          youtube: teacher?.youtube,
          salaryList: teacher?.salaryList,
        };
      }
    });
    return {
      status: "OK",
      message: "SUCCESS",
      data: teacherList,
    };
  } catch (error) {
    throw error;
  }
};
//get detail
const getDetailUser = async (id) => {
  try {
    const user = await User.findOne({ _id: id });
    if (user === null) {
      return {
        status: "ERROR",
        message: "Người dùng không tồn tại",
      };
    }
    return {
      status: "OK",
      message: "SUCCESS",
      data: user,
    };
  } catch (error) {
    return {
      status: "ERROR",
      message: "Lỗi khi đăng nhập",
      error: error.message,
    };
  }
};
// Dang ky hoc
const registerCourse = async (id, data) => {
  try {
    const user = await User.findOne({ _id: id });
    if (user === null) {
      return {
        status: "ERROR",
        message: "Người dùng không tồn tại",
      };
    }
    if (user?.role !== 3) {
      return {
        status: "ERROR",
        message: "Vui lòng đăng nhập với tài khoản học viên",
      };
    }
    const student = await Student.findOne({ _id: id });
    const checkCourse = data?.some((co) =>
      student?.course?.some((c) =>
        c?.courseId?.toString()?.includes(co?.toString())
      )
    );

    if (checkCourse) {
      return {
        status: "ERROR",
        message: "Bạn đã có khóa học này rồi!",
      };
    } else {
      data?.map((id) =>
        student?.course?.push({
          courseId: id,
          learningIndex: 0,
          percent: 0,
          isStarted: false,
          isSuccess: false,
        })
      );
      await student.save();
      return {
        status: "OK",
        message: "Đăng ký khóa học thành công",
        data: student,
      };
    }
  } catch (error) {
    return {
      status: "ERROR",
      message: "Lỗi khi đăng ký khóa học",
      error: error.message,
    };
  }
};
const updateCourseStudent = async (id, courseId, data) => {
  try {
    const { learningIndex, percent, isStarted, isSuccess } = data;
    const student = await Student.findOne({ _id: id });
    const courseUpdate = student?.course?.find(
      (item) => item?.courseId?.toString() === courseId
    );
    if (!courseUpdate) {
      return {
        status: "ERROR",
        message: "Không tìm thấy khóa học!",
      };
    } else {
      courseUpdate.learningIndex = learningIndex || courseUpdate.learningIndex;
      courseUpdate.percent = percent || courseUpdate.percent;
      courseUpdate.isStarted = isStarted || courseUpdate.isStarted;
      courseUpdate.isSuccess = isSuccess || courseUpdate.isSuccess;
      await student.save();
      return {
        status: "OK",
        message: "Bắt đầu khóa học thành công",
        data: student,
      };
    }
  } catch (error) {
    return {
      status: "ERROR",
      message: "Lỗi khi cập nhật khóa học",
      error: error.message,
    };
  }
};
//tuition
const addTuitionStudent = async (id, data) => {
  try {
    const user = await User.findOne({ _id: id });
    if (user === null) {
      return {
        status: "ERROR",
        message: "Người dùng không tồn tại",
      };
    }
    const student = await Student.findOne({ _id: id });
    if (!student) {
      return {
        status: "ERROR",
        message: "Học viên không tồn tại!",
      };
    } else {
      student?.tuitionList?.push({
        amountDay: data?.amountDay,
        amountFee: data?.amountFee,
        description: data?.description,
        status: false,
      });
      await student.save();
      return {
        status: "OK",
        message: "Thêm học phí thành công",
        data: student,
      };
    }
  } catch (error) {
    return {
      status: "ERROR",
      message: "Lỗi khi thêm học phí",
      error: error.message,
    };
  }
};
const addManyTuitionStudent = async (id, data) => {
  try {
    const user = await User.findOne({ _id: id });
    if (user === null) {
      return {
        status: "ERROR",
        message: "Người dùng không tồn tại",
      };
    }
    const student = await Student.findOne({ _id: id });
    if (!student) {
      return {
        status: "ERROR",
        message: "Học viên không tồn tại!",
      };
    } else {
      data?.map((item) =>
        student?.tuitionList?.push({
          amountDay: item?.amountDay || 0,
          amountFee: item?.amountFee || 0,
          description: item?.description || "",
          status: item?.amountFee || false,
        })
      );
      await student.save();
      return {
        status: "OK",
        message: "Thêm học phí thành công",
        data: student,
      };
    }
  } catch (error) {
    return {
      status: "ERROR",
      message: "Lỗi khi thêm học phí",
      error: error.message,
    };
  }
};
const updateTuitionStudent = async (id, tuitionId, data) => {
  try {
    const { amountFee, amountDay, description, status } = data;
    const student = await Student.findOne({ _id: id });
    const tuitionUpdate = student?.tuitionList?.find(
      (item) => item?._id?.toString() === tuitionId
    );
    if (!tuitionUpdate) {
      return {
        status: "ERROR",
        message: "Không tìm thấy học phí!",
      };
    } else {
      tuitionUpdate.amountFee = amountFee || tuitionUpdate.amountFee;
      tuitionUpdate.amountDay = amountDay || tuitionUpdate.amountDay;
      tuitionUpdate.description = description || tuitionUpdate.description;
      tuitionUpdate.status = status || tuitionUpdate.status;
      await student.save();
      return {
        status: "OK",
        message: "Cập nhật học phí thành công",
        data: student,
      };
    }
  } catch (error) {
    return {
      status: "ERROR",
      message: "Lỗi khi cập nhật học phí",
      error: error.message,
    };
  }
};
const deleteTuitionStudent = async (id, tuitionId) => {
  try {
    const student = await Student.findOne({ _id: id });
    if (!student) {
      return {
        status: "ERROR",
        message: "Không tìm thấy học viên!",
      };
    } else {
      const tuitionDelete = student?.tuitionList?.findIndex(
        (item) => item?._id.toString() === tuitionId
      );
      if (tuitionDelete !== -1) {
        student?.tuitionList?.splice(tuitionDelete, 1);
      }
      await student.save();
      return {
        status: "OK",
        message: "Xóa học phí thành công",
        data: student,
      };
    }
  } catch (error) {
    return {
      status: "ERROR",
      message: "Lỗi khi xóa học phí",
      error: error.message,
    };
  }
};
//salary
const addSalaryTeacher = async (id, data) => {
  try {
    const user = await User.findOne({ _id: id });
    if (user === null) {
      return {
        status: "ERROR",
        message: "Người dùng không tồn tại",
      };
    }
    const teacher = await Teacher.findOne({ _id: id });
    if (!teacher) {
      return {
        status: "ERROR",
        message: "Giáo viên không tồn tại!",
      };
    } else {
      teacher?.salaryList?.push({
        type: data?.type || 1,
        amountSalary: data?.amountSalary,
        description: data?.description,
        status: false,
      });

      await teacher.save();
      return {
        status: "OK",
        message: "Thêm lương thành công",
        data: teacher,
      };
    }
  } catch (error) {
    return {
      status: "ERROR",
      message: "Lỗi khi thêm lương",
      error: error.message,
    };
  }
};
const addManySalaryTeacher = async (id, data) => {
  try {
    const user = await User.findOne({ _id: id });
    if (user === null) {
      return {
        status: "ERROR",
        message: "Người dùng không tồn tại",
      };
    }
    const teacher = await Teacher.findOne({ _id: id });
    if (teacher) {
      return {
        status: "ERROR",
        message: "Giáo viên không tồn tại!",
      };
    } else {
      data?.map((item) =>
        teacher?.salaryList?.push({
          type: item?.type || 1,
          amountSalary: item?.amountSalary || 0,
          description: item?.amountSalary || "",
          status: item?.status || false,
        })
      );
      await teacher.save();
      return {
        status: "OK",
        message: "Đăng ký khóa học thành công",
        data: teacher,
      };
    }
  } catch (error) {
    return {
      status: "ERROR",
      message: "Lỗi khi đăng ký khóa học",
      error: error.message,
    };
  }
};
const updateSalaryTeacher = async (id, salaryId, data) => {
  try {
    const { amountSalary, type, description, status } = data;
    const teacher = await Teacher.findOne({ _id: id });
    const salaryUpdate = teacher?.salaryList?.find(
      (item) => item?._id.toString() === salaryId
    );
    if (!salaryUpdate) {
      return {
        status: "ERROR",
        message: "Không tìm thấy lương!",
      };
    } else {
      salaryUpdate.type = type || salaryUpdate.type;
      salaryUpdate.amountSalary = amountSalary || salaryUpdate.amountSalary;
      salaryUpdate.description = description || salaryUpdate.description;
      salaryUpdate.status = status || salaryUpdate.status;
      await teacher.save();
      return {
        status: "OK",
        message: "Cập nhật lương thành công",
        data: teacher,
      };
    }
  } catch (error) {
    return {
      status: "ERROR",
      message: "Lỗi khi cập nhật lương",
      error: error.message,
    };
  }
};
const deleteSalaryTeacher = async (id, salaryId) => {
  try {
    const teacher = await Teacher.findOne({ _id: id });
    if (!teacher) {
      return {
        status: "ERROR",
        message: "Không tìm thấy giáo viên!",
      };
    } else {
      const salaryDelete = teacher?.salaryList?.findIndex(
        (item) => item?._id.toString() === salaryId
      );
      if (salaryDelete !== -1) {
        teacher?.salaryList?.splice(salaryDelete, 1);
      }
      await teacher.save();
      return {
        status: "OK",
        message: "Xóa lương thành công",
        data: teacher,
      };
    }
  } catch (error) {
    return {
      status: "ERROR",
      message: "Lỗi khi xóa lương",
      error: error.message,
    };
  }
};
module.exports = {
  register,
  loginUser,
  updateUser,
  updateTeacher,
  updateStudent,
  deleteUser,
  getAllUser,
  getDetailUser,
  deleteManyUser,
  getAllStudent,
  getAllTeacher,
  registerCourse,
  updateCourseStudent,
  addTuitionStudent,
  addSalaryTeacher,
  updateTuitionStudent,
  updateSalaryTeacher,
  addManyTuitionStudent,
  addManySalaryTeacher,
  deleteTuitionStudent,
  deleteSalaryTeacher,
};
