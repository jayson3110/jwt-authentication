/*
   
   Tất cả các api các bạn khai báo dưới dòng này đều sẽ chạy qua cái isAuth trong AuthMiddleware để kiểm tra xác thực cái token hợp lệ thì mới cho đi xử lý tiếp sang bên controller nhé

*/

const express = require("express");
const router = express.Router();


const AuthMiddleWare = require("../middleware/AuthMiddleware");
const AuthController = require("../controllers/AuthController");
const FriendController = require("../controllers/FriendController");


/**
 * Init all APIs on your application
 * @param {*} app from express
 */


 let initAPIs = (app) => {
 	router.post("/login", AuthController.login);
 	router.post("/refresh-token", AuthController.refreshToken);


 	 // Sử dụng authMiddleware.isAuth trước những api cần xác thực

 	 router.use(AuthMiddleWare.isAuth);

 	 // List Protect APIs:
 	 router.get("/friends", FriendController.friendLists);
  // router.get("/example-protect-api", ExampleController.someAction);

     return app.use("/", router);


 }

module.exports = initAPIs;

 