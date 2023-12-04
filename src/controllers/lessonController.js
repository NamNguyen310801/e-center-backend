const lessonService = require("../services/lessonService");
//create
const createLesson = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(200).json({
        status: "ERROR",
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }
    const response = await lessonService.createLesson(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: "ERROR",
    });
  }
};
//update
const updateLesson = async (req, res) => {
  try {
    const lessonId = req.params.id;
    const data = req.body;
    if (!lessonId) {
      return res.status(200).json({
        status: "ERROR",
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }
    const response = await lessonService.updateLesson(lessonId, data);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const getAllLesson = async (req, res) => {
  try {
    const { limit, page, sort, filter } = req.query;
    const response = await lessonService.getAllLesson(
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
const deleteLesson = async (req, res) => {
  try {
    const lessonId = req.params.id;
    if (!lessonId) {
      return res.status(200).json({
        status: "ERROR",
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }
    const response = await lessonService.deleteLesson(lessonId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
module.exports = {
  createLesson,
  updateLesson,
  getAllLesson,
  deleteLesson,
};
