const BannerModel = require("../models/BannerModel");
const ImageModel = require("../models/ImageModel");

const createImage = async (newImage) => {
  const { name = "", url, type = "active" } = newImage;
  try {
    // Tạo một mới hình ảnh từ dữ liệu được gửi lên
    const createImage = await ImageModel.create({
      name,
      url,
      type,
    });
    if (createImage) {
      return {
        status: "OK",
        message: "Hình ảnh đã được tạo thành công",
        data: createImage,
      };
    }
  } catch (error) {
    return {
      status: "ERROR",
      message: "Lỗi khi tạo hình ảnh",
      error: error.message,
    };
  }
};

const updateImage = async (id, updatedData) => {
  try {
    const imageToUpdate = await ImageModel.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!imageToUpdate) {
      return {
        status: "ERROR",
        message: "Hình ảnh không tồn tại",
      };
    }

    return {
      status: "OK",
      message: "Cập nhật hình ảnh thành công",
      data: imageToUpdate,
    };
  } catch (error) {
    throw error;
  }
};
const getAllImage = async () => {
  try {
    const imageList = await ImageModel.find();
    return {
      status: "OK",
      message: "SUCCESS",
      data: imageList,
    };
  } catch (error) {
    throw error;
  }
};
//delete
const deleteImage = async (id) => {
  try {
    const checkImage = await ImageModel.findOne({ _id: id });
    if (checkImage === null) {
      return {
        status: "ERROR",
        message: "Hình ảnh không tồn tại",
      };
    }
    await ImageModel.findByIdAndDelete(id);
    return {
      status: "OK",
      message: "Xóa thành công",
    };
  } catch (error) {
    throw error;
  }
};
const createBanner = async (newBanner) => {
  const { name = "", url } = newBanner;
  try {
    // Tạo một mới hình ảnh từ dữ liệu được gửi lên
    const createBanner = await BannerModel.create({
      name,
      url,
    });
    if (createBanner) {
      return {
        status: "OK",
        message: "Hình ảnh đã được tạo thành công",
        data: createBanner,
      };
    }
  } catch (error) {
    return {
      status: "ERROR",
      message: "Lỗi khi tạo hình ảnh",
      error: error.message,
    };
  }
};
const updateBanner = async (id, updatedData) => {
  try {
    const bannerToUpdate = await BannerModel.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!bannerToUpdate) {
      return {
        status: "ERROR",
        message: "Hình ảnh không tồn tại",
      };
    }

    return {
      status: "OK",
      message: "Cập nhật hình ảnh thành công",
      data: bannerToUpdate,
    };
  } catch (error) {
    throw error;
  }
};
const getAllBanner = async () => {
  try {
    const bannerList = await BannerModel.find();
    return {
      status: "OK",
      message: "SUCCESS",
      data: bannerList,
    };
  } catch (error) {
    throw error;
  }
};
//delete
const deleteBanner = async (id) => {
  try {
    const checkBanner = await BannerModel.findOne({ _id: id });
    if (checkBanner === null) {
      return {
        status: "ERROR",
        message: "Hình ảnh không tồn tại",
      };
    }
    await BannerModel.findByIdAndDelete(id);
    return {
      status: "OK",
      message: "Xóa thành công",
    };
  } catch (error) {
    throw error;
  }
};
module.exports = {
  createImage,
  updateImage,
  getAllImage,
  deleteImage,
  createBanner,
  updateBanner,
  getAllBanner,
  deleteBanner,
};
