const imageService = require("../services/imageService");

//create
const createImage = async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) {
      return res.status(200).json({
        status: "ERROR",
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }
    const response = await imageService.createImage(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: "ERROR",
    });
  }
};
//update
const updateImage = async (req, res) => {
  try {
    const imageId = req.params.id;
    const data = req.body;
    if (!imageId) {
      return res.status(200).json({
        status: "ERROR",
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }
    const response = await imageService.updateImage(imageId, data);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const getAllImage = async (req, res) => {
  try {
    const response = await imageService.getAllImage();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const deleteImage = async (req, res) => {
  try {
    const imageId = req.params.id;
    if (!imageId) {
      return res.status(200).json({
        status: "ERROR",
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }
    const response = await imageService.deleteImage(imageId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const createBanner = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(200).json({
        status: "ERROR",
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }
    const response = await imageService.createBanner(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: "ERROR",
    });
  }
};
const updateBanner = async (req, res) => {
  try {
    const bannerId = req.params.id;
    const data = req.body;
    if (!bannerId) {
      return res.status(200).json({
        status: "ERROR",
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }
    const response = await imageService.updateBanner(bannerId, data);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const getAllBanner = async (req, res) => {
  try {
    const response = await imageService.getAllBanner();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const deleteBanner = async (req, res) => {
  try {
    const bannerId = req.params.id;
    if (!bannerId) {
      return res.status(200).json({
        status: "ERROR",
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }
    const response = await imageService.deleteBanner(bannerId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
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
