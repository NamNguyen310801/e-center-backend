const scheduleService = require("../services/scheduleService");

//create
const createSchedule = async (req, res) => {
  try {
    const { nameClass, dayOfWeek, caHoc, time, teacher } = req.body;
    if (!nameClass || !dayOfWeek || !caHoc || !time || !teacher) {
      return res.status(200).json({
        status: "ERROR",
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }
    const response = await scheduleService.createSchedule(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: "ERROR",
    });
  }
};
//update
const updateSchedule = async (req, res) => {
  try {
    const scheduleId = req.params.id;
    const data = req.body;
    if (!scheduleId) {
      return res.status(200).json({
        status: "ERROR",
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }
    const response = await scheduleService.updateSchedule(scheduleId, data);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const getAllSchedule = async (req, res) => {
  try {
    const { limit, page, sort, filter } = req.query;
    const response = await scheduleService.getAllSchedule(
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
const deleteSchedule = async (req, res) => {
  try {
    const scheduleId = req.params.id;
    if (!scheduleId) {
      return res.status(200).json({
        status: "ERROR",
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }
    const response = await scheduleService.deleteSchedule(scheduleId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
module.exports = {
  createSchedule,
  updateSchedule,
  getAllSchedule,
  deleteSchedule,
};
