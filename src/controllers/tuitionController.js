const tuitionService = require("../services/tuitionService");
//create
const createTuition = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(200).json({
        status: "ERROR",
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }
    const response = await tuitionService.createTuition(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: "ERROR",
    });
  }
};
//update
const updateTuition = async (req, res) => {
  try {
    const tuitionId = req.params.id;
    const data = req.body;
    if (!tuitionId) {
      return res.status(200).json({
        status: "ERROR",
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }
    const response = await tuitionService.updateTuition(tuitionId, data);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const getAllTuition = async (req, res) => {
  try {
    const { limit, page, sort, filter } = req.query;
    const response = await tuitionService.getAllTuition(
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

const deleteTuition = async (req, res) => {
  try {
    const tuitionId = req.params.id;
    if (!tuitionId) {
      return res.status(200).json({
        status: "ERROR",
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }
    const response = await tuitionService.deleteTuition(tuitionId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
module.exports = {
  createTuition,
  updateTuition,
  getAllTuition,
  deleteTuition,
};
