const emailService = require("../services/emailService");
const sendTuition = async (req, res) => {
  try {
    const data = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(data?.email);
    if (!data?.email) {
      return res.status(200).json({
        status: "ERROR",
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERROR",
        message: "Vui lòng kiểm tra lại email",
      });
    }
    const response = await emailService.sendTuition(data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      status: "ERROR",
      message: "Lỗi khi gửi email",
    });
  }
};
const sendSalary = async (req, res) => {
  try {
    const data = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(data?.email);
    if (!data?.email) {
      return res.status(200).json({
        status: "ERROR",
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERROR",
        message: "Vui lòng kiểm tra lại email",
      });
    }
    const response = await emailService.sendSalary(data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      status: "ERROR",
      message: "Lỗi khi gửi email",
    });
  }
};
const confirmRegisterCourse = async (req, res) => {
  try {
    const data = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(data?.email);
    if (!data?.email) {
      return res.status(200).json({
        status: "ERROR",
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERROR",
        message: "Vui lòng kiểm tra lại email",
      });
    }
    const response = await emailService.confirmRegisterCourse(data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      status: "ERROR",
      message: "Lỗi khi gửi email",
    });
  }
};
module.exports = { sendTuition, sendSalary, confirmRegisterCourse };
