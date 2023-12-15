const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const speakeasy = require("speakeasy");
const dotenv = require("dotenv");
const User = require("../models/UserModel");
dotenv.config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  auth: {
    user: process.env.EMAIL_NAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});
const forgetPassword = async (email) => {
  try {
    const checkUser = await User.findOne({ email: email });
    if (checkUser === null) {
      return {
        status: "ERROR",
        message: "Người dùng không tồn tại",
      };
    }
    // if (checkUser.tempSecret) {
    //   return {
    //     status: "ERROR",
    //     message: "Yêu cầu reset mật khẩu đã tồn tại",
    //   };
    // }
    // Tạo và lưu mã OTP tạm thời
    const secret = speakeasy.generateSecret({ length: 20 });
    const expirationTime = Date.now() + 60 * 1000;
    checkUser.tempSecret = secret.base32;
    checkUser.tempSecretExpiration = expirationTime;
    await checkUser.save();
    // Gửi mã OTP đến email
    const mailOptions = {
      from: '"Trung tâm tiếng anh Wonderland" <phuognanm2k1a@gmail.com>',
      to: email,
      subject: "Mã OTP để reset mật khẩu",
      text: `Mã OTP để reset mật khẩu của bạn là: ${speakeasy.totp({
        secret: checkUser.tempSecret,
        encoding: "base32",
        step: 60,
      })}`,
    };
    await transporter.sendMail(mailOptions);
    return {
      status: "OK",
      message: "Gửi mã OTP thành công",
    };
  } catch (error) {
    return {
      status: "ERROR",
      message: "Lỗi khi quên mật khẩu",
      error: error.message,
    };
  }
};
const resetPassword = async (email, newPassword) => {
  try {
    const checkUser = await User.findOne({ email: email });
    if (checkUser === null) {
      return {
        status: "ERROR",
        message: "Người dùng không tồn tại",
      };
    }
    const hash = bcrypt.hashSync(newPassword, 10);
    checkUser.password = hash;
    checkUser.tempSecret = null;
    await checkUser.save();
    return {
      status: "OK",
      message: "Cập nhật mật khẩu thành công",
    };
  } catch (error) {
    return {
      status: "ERROR",
      message: "Lỗi khi quên mật khẩu",
      error: error.message,
    };
  }
};
const verifyOTP = async (email, otp) => {
  const user = await User.findOne({ email: email });
  if (!user || !user.tempSecret) {
    return {
      status: "ERROR",
      message: "Người dùng không hợp lệ hoặc mã OTP hết hạn",
    };
  }
  const verified = speakeasy.totp.verify({
    secret: user.tempSecret,
    encoding: "base32",
    token: otp,
    step: 60,
  });
  // Kiểm tra xem khóa bí mật có hết hạn hay không
  if (user.tempSecretExpiration && Date.now() > user.tempSecretExpiration) {
    user.tempSecret = null;
    await user.save();
    return {
      status: "ERROR",
      message: "Mã OTP đã hết hạn",
    };
  }
  if (verified) {
    return {
      status: "OK",
      message: "Mã OTP hợp lệ",
    };
  } else {
    return {
      status: "ERROR",
      message: "Mã OTP không hợp lệ",
    };
  }
};
const sendTuition = async (data) => {
  try {
    const { email } = data;
    const checkUser = await User.findOne({ email: email });
    if (checkUser === null) {
      return {
        status: "ERROR",
        message: "Người dùng không tồn tại",
      };
    }

    // Gửi mã OTP đến email
    const mailOptions = {
      from: '"Trung tâm tiếng anh Wonderland" <phuognanm2k1a@gmail.com>',
      to: email,
      subject: "Thông báo học phí",
      text: `Bạn đã có một khoản học phí mới. Vui lòng truy cập trang web để kiểm tra!`,
    };
    await transporter.sendMail(mailOptions);
    return {
      status: "OK",
      message: "Gửi email thành công",
    };
  } catch (error) {
    return {
      status: "ERROR",
      message: "Lỗi khi gửi email",
      error: error.message,
    };
  }
};
const confirmTuition = async (data) => {
  try {
    const { email } = data;
    const checkUser = await User.findOne({ email: email });
    if (checkUser === null) {
      return {
        status: "ERROR",
        message: "Người dùng không tồn tại",
      };
    }

    // Gửi mã OTP đến email
    const mailOptions = {
      from: '"Trung tâm tiếng anh Wonderland" <phuognanm2k1a@gmail.com>',
      to: email,
      subject: "Thông báo được hoàn thành học phí",
      text: `Bạn đã được hoàn thành một khoản học phí. Vui lòng truy cập trang web để kiểm tra!`,
    };
    await transporter.sendMail(mailOptions);
    return {
      status: "OK",
      message: "Gửi email thành công",
    };
  } catch (error) {
    return {
      status: "ERROR",
      message: "Lỗi khi gửi email",
      error: error.message,
    };
  }
};
const sendSalary = async (data) => {
  try {
    const { email } = data;
    const checkUser = await User.findOne({ email: email });
    if (checkUser === null) {
      return {
        status: "ERROR",
        message: "Người dùng không tồn tại",
      };
    }
    const mailOptions = {
      from: '"Trung tâm tiếng anh Wonderland" <phuognanm2k1a@gmail.com>',
      to: email,
      subject: "Thông báo tiền lương",
      text: `Bạn đã có một khoản tiền lương mới. Vui lòng truy cập trang web để kiểm tra!`,
    };
    await transporter.sendMail(mailOptions);
    return {
      status: "OK",
      message: "Gửi email thành công",
    };
  } catch (error) {
    return {
      status: "ERROR",
      message: "Lỗi khi gửi email",
      error: error.message,
    };
  }
};
const confirmSalary = async (data) => {
  try {
    const { email } = data;
    const checkUser = await User.findOne({ email: email });
    if (checkUser === null) {
      return {
        status: "ERROR",
        message: "Người dùng không tồn tại",
      };
    }
    const mailOptions = {
      from: '"Trung tâm tiếng anh Wonderland" <phuognanm2k1a@gmail.com>',
      to: email,
      subject: "Thông báo thanh toán tiền lương",
      text: `Bạn đã được thanh toán có một khoản tiền lương. Vui lòng truy cập trang web để kiểm tra!`,
    };
    await transporter.sendMail(mailOptions);
    return {
      status: "OK",
      message: "Gửi email thành công",
    };
  } catch (error) {
    return {
      status: "ERROR",
      message: "Lỗi khi gửi email",
      error: error.message,
    };
  }
};
const confirmRegisterCourse = async (data) => {
  try {
    const { email } = data;
    const checkUser = await User.findOne({ email: email });
    if (checkUser === null) {
      return {
        status: "ERROR",
        message: "Người dùng không tồn tại",
      };
    }
    const mailOptions = {
      from: '"Trung tâm tiếng anh Wonderland" <phuognanm2k1a@gmail.com>',
      to: email,
      subject: "Thông báo xác nhận đăng ký khóa học",
      text: `Bạn đã đăng ký khóa học:${data?.course}. Vui lòng truy cập trang web để kiểm tra!`,
    };
    await transporter.sendMail(mailOptions);
    return {
      status: "OK",
      message: "Gửi mã email thành công",
    };
  } catch (error) {
    return {
      status: "ERROR",
      message: "Lỗi khi gửi email",
      error: error.message,
    };
  }
};
module.exports = {
  forgetPassword,
  resetPassword,
  verifyOTP,
  sendTuition,
  confirmTuition,
  sendSalary,
  confirmSalary,
  confirmRegisterCourse,
};
