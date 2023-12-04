const classService = require("../services/classService");

//create
const createClass = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(200).json({
        status: "ERROR",
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }
    const response = await classService.createClass(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: "ERROR",
    });
  }
};
//update
const updateClass = async (req, res) => {
  try {
    const classId = req.params.id;
    const data = req.body;
    if (!classId) {
      return res.status(200).json({
        status: "ERROR",
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }
    const response = await classService.updateClass(classId, data);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const getAllClass = async (req, res) => {
  try {
    const { limit, page, sort, filter } = req.query;
    const response = await classService.getAllClass(
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
const deleteClass = async (req, res) => {
  try {
    const classId = req.params.id;
    if (!classId) {
      return res.status(200).json({
        status: "ERROR",
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }
    const response = await classService.deleteClass(classId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
module.exports = {
  createClass,
  updateClass,
  getAllClass,
  deleteClass,
};
