const salaryService = require("../services/salaryService");

//create
const createSalary = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(200).json({
        status: "ERROR",
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }
    const response = await salaryService.createSalary(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: "ERROR",
    });
  }
};
//update
const updateSalary = async (req, res) => {
  try {
    const salaryId = req.params.id;
    const data = req.body;
    if (!salaryId) {
      return res.status(200).json({
        status: "ERROR",
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }
    const response = await salaryService.updateSalary(salaryId, data);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const getAllSalary = async (req, res) => {
  try {
    const { limit, page, sort, filter } = req.query;
    const response = await salaryService.getAllSalary(
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

const deleteSalary = async (req, res) => {
  try {
    const salaryId = req.params.id;
    if (!salaryId) {
      return res.status(200).json({
        status: "ERROR",
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }
    const response = await salaryService.deleteSalary(salaryId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
module.exports = {
  createSalary,
  updateSalary,
  deleteSalary,
  getAllSalary,
};
