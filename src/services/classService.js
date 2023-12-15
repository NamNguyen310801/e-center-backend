const ClassModel = require("../models/ClassModel");

const createClass = async (newClass) => {
  const { name, course = "", dayStart = "", dayEnd = "" } = newClass;
  try {
    // Tạo một mới lớp học từ dữ liệu được gửi lên
    const existingClass = await ClassModel.findOne({ name });
    if (existingClass) {
      return {
        status: "ERROR",
        message: "Lớp học đã tồn tại",
      };
    }
    const createClass = await ClassModel.create({
      name,
      course,
      dayStart,
      dayEnd,
    });
    if (createClass) {
      return {
        status: "OK",
        message: "Lớp học đã được tạo thành công",
        data: createClass,
      };
    }
  } catch (error) {
    return {
      status: "ERROR",
      message: "Lỗi khi tạo lớp học",
      error: error.message,
    };
  }
};

const updateClass = async (id, updatedData) => {
  try {
    const classToUpdate = await ClassModel.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!classToUpdate) {
      return {
        status: "ERROR",
        message: "Lớp học không tồn tại",
      };
    }

    return {
      status: "OK",
      message: "Cập nhật lớp học thành công",
      data: classToUpdate,
    };
  } catch (error) {
    throw error;
  }
};
const getAllClass = async () => {
  try {
    const classList = await ClassModel.find();
    return {
      status: "OK",
      message: "SUCCESS",
      data: classList,
    };
  } catch (error) {
    throw error;
  }
};
//delete
const deleteClass = async (id) => {
  try {
    const checkClass = await ClassModel.findOne({ _id: id });
    if (checkClass === null) {
      return {
        status: "ERROR",
        message: "Lớp học không tồn tại",
      };
    }
    await ClassModel.findByIdAndDelete(id);
    return {
      status: "OK",
      message: "Xóa thành công",
    };
  } catch (error) {
    throw error;
  }
};
module.exports = {
  createClass,
  updateClass,
  getAllClass,
  deleteClass,
};
