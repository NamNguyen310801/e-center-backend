const VideoModel = require("../models/VideoTeacherModel");

const createVideo = async (newVideo) => {
  const { name = "", url, type = "teacher" } = newVideo;
  try {
    // Tạo một mới video từ dữ liệu được gửi lên
    const createVideo = await VideoModel.create({
      name,
      url,
      type,
    });
    if (createVideo) {
      return {
        status: "OK",
        message: "Video đã được tạo thành công",
        data: createVideo,
      };
    }
  } catch (error) {
    return {
      status: "ERROR",
      message: "Lỗi khi tạo video",
      error: error.message,
    };
  }
};

const updateVideo = async (id, updatedData) => {
  try {
    const videoToUpdate = await VideoModel.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!videoToUpdate) {
      return {
        status: "ERROR",
        message: "Video không tồn tại",
      };
    }

    return {
      status: "OK",
      message: "Cập nhật video thành công",
      data: videoToUpdate,
    };
  } catch (error) {
    throw error;
  }
};
const getAllVideo = async () => {
  try {
    const videoList = await VideoModel.find();
    return {
      status: "OK",
      message: "SUCCESS",
      data: videoList,
    };
  } catch (error) {
    throw error;
  }
};
//delete
const deleteVideo = async (id) => {
  try {
    const checkVideo = await VideoModel.findOne({ _id: id });
    if (checkVideo === null) {
      return {
        status: "ERROR",
        message: "Video không tồn tại",
      };
    }
    await VideoModel.findByIdAndDelete(id);
    return {
      status: "OK",
      message: "Xóa thành công",
    };
  } catch (error) {
    throw error;
  }
};
module.exports = {
  createVideo,
  updateVideo,
  getAllVideo,
  deleteVideo,
};
