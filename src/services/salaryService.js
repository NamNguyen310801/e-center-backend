const SalaryModel = require("../models/SalaryModel");

const createSalary = async (newSalary) => {
  const { name, basicSalary = 0, bonusSalary = 0 } = newSalary;
  try {
    // Tạo một mới mức lương từ dữ liệu được gửi lên
    const existingSalary = await SalaryModel.findOne({ name });
    if (existingSalary) {
      return {
        status: "ERROR",
        message: "Mức lương đã tồn tại",
      };
    }
    const createSalary = await SalaryModel.create({
      name,
      basicSalary,
      bonusSalary,
    });
    if (createSalary) {
      return {
        status: "OK",
        message: "Mức lương đã được tạo thành công",
        data: createSalary,
      };
    }
  } catch (error) {
    return {
      status: "ERROR",
      message: "Lỗi khi tạo mức lương",
      error: error.message,
    };
  }
};

const updateSalary = async (id, updatedData) => {
  try {
    const salaryToUpdate = await SalaryModel.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!salaryToUpdate) {
      return {
        status: "ERROR",
        message: "Mức lương không tồn tại",
      };
    }

    return {
      status: "OK",
      message: "Cập nhật mức lương thành công",
      data: salaryToUpdate,
    };
  } catch (error) {
    throw error;
  }
};
const getAllSalary = async () => {
  try {
    const salaryList = await SalaryModel.find();
    return {
      status: "OK",
      message: "SUCCESS",
      data: salaryList,
    };
  } catch (error) {
    throw error;
  }
};
//delete
const deleteSalary = async (id) => {
  try {
    const checkSalary = await SalaryModel.findOne({ _id: id });
    if (checkSalary === null) {
      return {
        status: "ERROR",
        message: "Mức lương không tồn tại",
      };
    }
    await SalaryModel.findByIdAndDelete(id);
    return {
      status: "OK",
      message: "Xóa thành công",
    };
  } catch (error) {
    throw error;
  }
};
module.exports = {
  createSalary,
  updateSalary,
  getAllSalary,
  deleteSalary,
};
