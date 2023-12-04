const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authMiddleware = (role) => {
  return (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(401).json({ message: "Access Denied" });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
      if (err) {
        return res
          .status(403)
          .json({ status: "ERROR", message: "Invalid Token" });
      }
      // Kiểm tra quyền truy cập
      if (+user.role !== role) {
        return res
          .status(403)
          .json({ status: "ERROR", message: "Permission Denied" });
      }
      // Lưu thông tin người dùng vào request để sử dụng trong các route tiếp theo nếu cần
      req.user = user;
      next();
    });
  };
};

const authUserMiddleWare = (req, res, next) => {
  const token = req.header("Authorization");
  const userId = req.params.id;
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(404).json({
        message: "The authentication",
        status: "ERROR",
      });
    }
    if (+user?.role === 1 || user?.id === userId) {
      next();
    } else {
      return res.status(404).json({
        message: "The authentication",
        status: "ERROR",
      });
    }
  });
};
// Middleware để xác thực mã OTP

module.exports = {
  authMiddleware,
  authUserMiddleWare,
};
