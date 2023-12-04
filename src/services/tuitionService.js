const Tuition = require("../models/TuitionModel");
const createTuition = async (newTuition) => {
  const { name, fee = 0 } = newTuition;
  try {
    // Tạo một mới lớp học từ dữ liệu được gửi lên
    const existingTuition = await Tuition.findOne({ name });
    if (existingTuition) {
      return {
        status: "ERROR",
        message: "Mức học phí đã tồn tại",
      };
    }
    const createTuition = await Tuition.create({
      name,
      fee,
    });
    if (createTuition) {
      return {
        status: "OK",
        message: "Mức học phí đã được tạo thành công",
        data: createTuition,
      };
    }
  } catch (error) {
    return {
      status: "ERROR",
      message: "Lỗi khi tạo mức học phí",
      error: error.message,
    };
  }
};

const updateTuition = async (id, updatedData) => {
  try {
    const tuitionToUpdate = await Tuition.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!tuitionToUpdate) {
      return {
        status: "ERROR",
        message: "Mức học phí không tồn tại",
      };
    }

    return {
      status: "OK",
      message: "Cập nhật mức học phí thành công",
      data: tuitionToUpdate,
    };
  } catch (error) {
    throw error;
  }
};
const getAllTuition = async () => {
  try {
    const tuitionList = await Tuition.find();
    return {
      status: "OK",
      message: "SUCCESS",
      data: tuitionList,
    };
  } catch (error) {
    return {
      status: "ERROR",
      message: "Đã xay ra lỗi",
      error: error.message,
    };
  }
};
const deleteTuition = async (id) => {
  try {
    const checkTuition = await Tuition.findOne({ _id: id });
    if (checkTuition === null) {
      return {
        status: "ERROR",
        message: "Lớp học không tồn tại",
      };
    }
    await Tuition.findByIdAndDelete(id);
    return {
      status: "OK",
      message: "Xóa thành công",
    };
  } catch (error) {
    throw error;
  }
};
module.exports = {
  createTuition,
  updateTuition,
  getAllTuition,
  deleteTuition,
};
