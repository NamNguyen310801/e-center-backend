const Lesson = require("../models/LessonModel");
const createLesson = async (newLesson) => {
  const {
    name,
    position = 1,
    url = "",
    thumbnail = "",
    description = "",
    isPublished = false,
  } = newLesson;
  try {
    // Tạo một mới lớp học từ dữ liệu được gửi lên
    const existingLesson = await Lesson.findOne({ name });
    if (existingLesson) {
      return {
        status: "ERROR",
        message: "Bài học đã tồn tại",
      };
    }
    const createLesson = await Lesson.create({
      name,
      url,
      thumbnail,
      description,
      position,
      isPublished,
    });
    if (createLesson) {
      return {
        status: "OK",
        message: "Bài học đã được tạo thành công",
        data: createLesson,
      };
    }
  } catch (error) {
    return {
      status: "ERROR",
      message: "Lỗi khi tạo bài học",
      error: error.message,
    };
  }
};

const updateLesson = async (id, updatedData) => {
  try {
    const lessonToUpdate = await Lesson.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!lessonToUpdate) {
      return {
        status: "ERROR",
        message: "Bài học không tồn tại",
      };
    }
    return {
      status: "OK",
      message: "Cập nhật bài học thành công",
      data: lessonToUpdate,
    };
  } catch (error) {
    throw error;
  }
};
const getAllLesson = async () => {
  try {
    const lessonList = await Lesson.find();
    return {
      status: "OK",
      message: "SUCCESS",
      data: lessonList,
    };
  } catch (error) {
    throw error;
  }
};
const deleteLesson = async (id) => {
  try {
    const checkLesson = await Lesson.findOne({ _id: id });
    if (checkLesson === null) {
      return {
        status: "ERROR",
        message: "Bài học không tồn tại",
      };
    }
    await Lesson.findByIdAndDelete(id);
    return {
      status: "OK",
      message: "Xóa thành công",
    };
  } catch (error) {
    throw error;
  }
};
module.exports = {
  createLesson,
  updateLesson,
  getAllLesson,
  deleteLesson,
};
