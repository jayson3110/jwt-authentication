/*
  
  Kế tiếp, ở cái AuthMiddleware mình sẽ viết một middleware 
  isAuth có chức năng bảo vệ những api cần bảo mật, một chút 
  nữa ở file routes/api.js chúng ta sẽ dùng tới


*/

const jwtHelper = require("../helpers/jwt.helper");
const debug = console.log.bind(console);

// Mã secretKey này phải được bảo mật tuyệt đối các bạn lưu nó vào biến môi trường hoặc file


const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret-example-trungquandev.com-green-cat-a@";

/**
 * Middleware: Authorization user by Token
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
*/

let isAuth = async (req, res, next) => {
  // Lấy token được gửi lên phía client, thông thường tốt nhất là các bạn nên truyền token vào header

  const tokenFromClient = req.body.token || req.query.token || req.headers["x-access-token"];

  if (tokenFromClient) {
    // Nếu tồn tại token
    try {
      // Thực hiện giải mã token xem có hợp lệ hay không 

      const decoded = await jwtHelper.verify(tokenFromClient, accessTokenSecret);

      // Nếu token hợp lện, lưu thông tin giải mã được vào đối tượng req, dùng cho các xử lý phia sau

      req.jwtDecded = decoded;

      // cho phép req đi tiếp sang controller.

      next();
    }catch(eror) {
      // Nếu giải mã gặp lỗi: Không đúng, hết hạn...etc:
      // Lưu ý trong dự án thực tế hãy bỏ dòng debug bên dưới

      debug("Error while verify token:", error);
      return res.status(401).json({
        message: 'Unauthorized.',

      });

    }
  }
  else {
      // Không tìm thấy token trong request
      return res.status(403).send({
        message: 'No token provided.',
      });
    }

}

module.exports = {
  isAuth: isAuth,
};

