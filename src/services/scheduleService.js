const Schedule = require("../models/ScheduleModel");
const createSchedule = async (newSchedule) => {
  const {
    nameClass,
    dayOfWeek,
    caHoc,
    time,
    teacher,
    monHoc = "",
  } = newSchedule;
  try {
    // Kiểm tra xem đã tồn tại lịch học với cùng nameClass, dayOfWeek và caHoc
    const existingScheduleSameClass = await Schedule.findOne({
      nameClass,
      dayOfWeek,
      caHoc,
    });
    // Kiểm tra xem đã tồn tại lịch học với cùng dayOfWeek, caHoc và cùng một giáo viên
    const existingLichHoc = await Schedule.findOne({
      dayOfWeek,
      caHoc,
      teacher,
    });
    if (existingScheduleSameClass) {
      return {
        status: "ERROR",
        message: "Lịch học của lớp đã bị trùng",
      };
    }
    if (existingLichHoc) {
      return {
        status: "ERROR",
        message: "Lịch học đã bị trùng ngày học, ca học hoặc giáo viên",
      };
    }
    const createSchedule = await Schedule.create({
      nameClass,
      dayOfWeek,
      caHoc,
      time,
      teacher,
      monHoc,
    });
    if (createSchedule) {
      return {
        status: "OK",
        message: "Lịch học đã được tạo thành công",
        data: createSchedule,
      };
    }
  } catch (error) {
    throw error;
  }
};

const updateSchedule = async (id, updatedData) => {
  try {
    // // Kiểm tra xem đã tồn tại lịch học với cùng nameClass, dayOfWeek và caHoc
    const existingScheduleSameClass = await Schedule.findOne({
      _id: { $ne: id }, // Loại trừ phần tử bạn đang cập nhật
      nameClass: updatedData.nameClass,
      dayOfWeek: updatedData.dayOfWeek,
      caHoc: updatedData.caHoc,
    });
    // Kiểm tra xem đã tồn tại lịch học với cùng dayOfWeek, caHoc và cùng một giáo viên
    const existingLichHoc = await Schedule.findOne({
      _id: { $ne: id },
      dayOfWeek: updatedData.dayOfWeek,
      caHoc: updatedData.caHoc,
      teacher: updatedData.teacher,
    });
    if (existingScheduleSameClass) {
      return {
        status: "ERROR",
        message: "Lịch học của lớp đã bị trùng",
      };
    }
    if (existingLichHoc) {
      return {
        status: "ERROR",
        message: "Lịch học đã bị trùng ngày học, ca học hoặc giáo viên",
      };
    }
    const scheduleToUpdate = await Schedule.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!scheduleToUpdate) {
      return {
        status: "ERROR",
        message: "Lịch học không tồn tại",
      };
    }
    return {
      status: "OK",
      message: "Cập nhật Lịch học thành công",
      data: scheduleToUpdate,
    };
  } catch (error) {
    throw error;
  }
};
const getAllSchedule = async () => {
  try {
    const scheduleList = await Schedule.find();
    return {
      status: "OK",
      message: "SUCCESS",
      data: scheduleList,
    };
  } catch (error) {
    throw error;
  }
};
const deleteSchedule = async (id) => {
  try {
    const checkSchedule = await Schedule.findOne({ _id: id });
    if (checkSchedule === null) {
      return {
        status: "ERROR",
        message: "Lớp học không tồn tại",
      };
    }
    await Schedule.findByIdAndDelete(id);
    return {
      status: "OK",
      message: "Xóa thành công",
    };
  } catch (error) {
    throw error;
  }
};
module.exports = {
  createSchedule,
  updateSchedule,
  getAllSchedule,
  deleteSchedule,
};
