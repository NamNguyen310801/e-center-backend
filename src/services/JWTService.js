const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const generalAccessToken = async (payload) => {
  const access_token = jwt.sign(
    {
      ...payload,
    },
    process.env.ACCESS_TOKEN,
    { expiresIn: "10h" }
  );
  return access_token;
};
const generalRefreshToken = async (payload) => {
  const refresh_token = jwt.sign(
    {
      ...payload,
    },
    process.env.REFRESH_TOKEN,
    { expiresIn: "365d" }
  );
  return refresh_token;
};
const refreshTokenService = async (token) => {
  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
        if (err) {
          resolve({
            status: "ERROR",
            message: "The authentication",
          });
        }
        const new_access_token = await generalAccessToken({
          id: user?._id,
          role: user?.role,
        });
        // const new_refresh_token = await generalRefreshToken({
        //   id: user?._id,
        //   role: user?.role,
        // });
        // res.cookie("refresh_token", new_refresh_token, {
        //   httpOnly: true,
        //   secure: false,
        //   sameSite: "strict",
        // });
        resolve({
          status: "OK",
          message: "SUCCESS",
          access_token: new_access_token,
        });
      });
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  generalAccessToken,
  generalRefreshToken,
  refreshTokenService,
};
