const userService = require("../services/userService");
const emailService = require("../services/emailService");
const jwtService = require("../services/JWTService");

//Register
const register = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(email);
    if (!email || !password || !confirmPassword) {
      return res.status(200).json({
        status: "ERROR",
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERROR",
        message: "Email không hợp lệ",
      });
    } else if (password !== confirmPassword) {
      return res.status(200).json({
        status: "ERROR",
        message: "Mật khẩu không trùng khớp",
      });
    }
    const response = await userService.register(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: "ERROR",
    });
  }
};

//Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(email);
    if (!email || !password) {
      return res.status(200).json({
        status: "ERROR",
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERROR",
        message: "Vui lòng kiểm tra lại email",
      });
    }
    const response = await userService.loginUser(req.body);
    const { refresh_token, ...newResponse } = response;
    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });
    return res.status(200).json(newResponse);
  } catch (e) {
    return res.status(404).json({
      status: "ERROR",
      message: "ERROR",
    });
  }
};
const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    if (refreshToken) {
      const response = await jwtService.refreshTokenService(refreshToken);
      return res.json(response);
    } else {
      return res.json({
        message: "The refreshToken is not valid",
      });
    }
  } catch (err) {
    return res.json({
      status: "err",
      message: err,
    });
  }
};
const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(email);
    if (!email) {
      return res.status(200).json({
        status: "ERROR",
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERROR",
        message: "Vui lòng kiểm tra lại email",
      });
    }
    const response = await emailService.forgetPassword(email);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      status: "ERROR",
      message: "Lỗi khi quên mật khẩu",
    });
  }
};
const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(email);
    if (!email || !otp) {
      return res.status(200).json({
        status: "ERROR",
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }
    if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERROR",
        message: "Vui lòng kiểm tra lại email",
      });
    }
    const response = await emailService.verifyOTP(email, otp);
    return res.status(200).json(response);
  } catch (e) {
    return {
      status: "ERROR",
      message: "Lỗi khi xác nhận OTP",
    };
  }
};
const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(email);
    if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERROR",
        message: "Vui lòng kiểm tra lại email",
      });
    }
    const response = await emailService.resetPassword(email, newPassword);
    return res.status(200).json(response);
  } catch (e) {
    return {
      status: "ERROR",
      message: "Lỗi khi quên mật khẩu",
    };
  }
};
// const refreshToken = async (req, res) => {
//   try {
//     const refreshToken = req.header("Authorization");
//     if (refreshToken) {
//       const response = await jwtService.refreshTokenService(refreshToken);
//       return res.json(response);
//     } else {
//       return res.json({
//         message: "The refreshToken is not valid",
//       });
//     }
//   } catch (err) {
//     return res.json({
//       status: "err",
//       message: err,
//     });
//   }
// };

//Logout
const logoutUser = async (req, res) => {
  try {
    res.clearCookie("refresh_token");
    return res.status(200).json({
      status: "OK",
      message: "Đăng xuất thành công",
    });
  } catch (e) {
    return res.status(404).json({
      message: "ERROR",
    });
  }
};
//Update
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;
    if (!userId) {
      return res.status(200).json({
        status: "ERROR",
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }
    const response = await userService.updateUser(userId, data);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const updateTeacher = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;
    if (!userId) {
      return res.status(200).json({
        status: "ERROR",
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }
    const response = await userService.updateTeacher(userId, data);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const updateStudent = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;
    if (!userId) {
      return res.status(200).json({
        status: "ERROR",
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }
    const response = await userService.updateStudent(userId, data);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

// Delete
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(200).json({
        status: "ERROR",
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }
    const response = await userService.deleteUser(userId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const deleteManyUser = async (req, res) => {
  try {
    const ids = req.body;
    if (!ids) {
      return res.status(200).json({
        status: "ERROR",
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }
    const response = await userService.deleteManyUser(ids);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const { limit, page, sort, filter } = req.query;
    const response = await userService.getAllUser(
      Number(limit),
      Number(page) || 0,
      sort,
      filter
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const getAllStudent = async (req, res) => {
  try {
    const response = await userService.getAllStudent();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const getAllTeacher = async (req, res) => {
  try {
    const response = await userService.getAllTeacher();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const getDetailUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(200).json({
        status: "ERROR",
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }
    const response = await userService.getDetailUser(userId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const registerCourse = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;
    if (!userId || data?.length === 0) {
      return res.status(200).json({
        status: "ERROR",
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }
    const response = await userService.registerCourse(userId, data);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const updateCourseStudent = async (req, res) => {
  try {
    const userId = req.params.id;
    const courseId = req.params.courseId;
    const data = req.body;
    if (!userId || data?.length === 0) {
      return res.status(200).json({
        status: "ERROR",
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }
    const response = await userService.updateCourseStudent(
      userId,
      courseId,
      data
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const addTuitionStudent = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;

    if (!userId || !data?.description || !data?.amountFee) {
      return res.status(200).json({
        status: "ERROR",
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }
    const response = await userService.addTuitionStudent(userId, data);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const updateTuitionStudent = async (req, res) => {
  try {
    const userId = req.params.id;
    const tuitionId = req.params.tuitionId;
    const data = req.body;
    if (!userId || !data?.description || !data?.amountFee) {
      return res.status(200).json({
        status: "ERROR",
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }
    const response = await userService.updateTuitionStudent(
      userId,
      tuitionId,
      data
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const deleteTuitionStudent = async (req, res) => {
  try {
    const userId = req.params.id;
    const tuitionId = req.params.tuitionId;
    if (!userId || !tuitionId) {
      return res.status(200).json({
        status: "ERROR",
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }
    const response = await userService.deleteTuitionStudent(userId, tuitionId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const addSalaryTeacher = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;
    if (!userId || !data?.description || !data?.amountSalary) {
      return res.status(200).json({
        status: "ERROR",
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }
    const response = await userService.addSalaryTeacher(userId, data);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const updateSalaryTeacher = async (req, res) => {
  try {
    const userId = req.params.id;
    const salaryId = req.params.salaryId;
    const data = req.body;
    if (!userId || !data?.description || !data?.amountSalary) {
      return res.status(200).json({
        status: "ERROR",
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }
    const response = await userService.updateSalaryTeacher(
      userId,
      salaryId,
      data
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const deleteSalaryTeacher = async (req, res) => {
  try {
    const userId = req.params.id;
    const salaryId = req.params.salaryId;
    if (!userId || !salaryId) {
      return res.status(200).json({
        status: "ERROR",
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }
    const response = await userService.deleteSalaryTeacher(userId, salaryId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
module.exports = {
  register,
  loginUser,
  logoutUser,
  forgetPassword,
  verifyOTP,
  resetPassword,
  updateUser,
  updateTeacher,
  updateStudent,
  deleteUser,
  getAllUser,
  getDetailUser,
  refreshToken,
  deleteManyUser,
  getAllStudent,
  getAllTeacher,
  registerCourse,
  updateCourseStudent,
  addTuitionStudent,
  addSalaryTeacher,
  updateTuitionStudent,
  updateSalaryTeacher,
  deleteTuitionStudent,
  deleteSalaryTeacher,
};
