const videoService = require("../services/videoService");

//create
const createVideo = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(200).json({
        status: "ERROR",
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }
    const response = await videoService.createVideo(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: "ERROR",
    });
  }
};
//update
const updateVideo = async (req, res) => {
  try {
    const videoId = req.params.id;
    const data = req.body;
    if (!videoId) {
      return res.status(200).json({
        status: "ERROR",
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }
    const response = await videoService.updateVideo(videoId, data);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const getAllVideo = async (req, res) => {
  try {
    const { limit, page, sort, filter } = req.query;
    const response = await videoService.getAllVideo(
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
const deleteVideo = async (req, res) => {
  try {
    const videoId = req.params.id;
    if (!videoId) {
      return res.status(200).json({
        status: "ERROR",
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }
    const response = await videoService.deleteVideo(videoId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
module.exports = {
  createVideo,
  updateVideo,
  getAllVideo,
  deleteVideo,
};
