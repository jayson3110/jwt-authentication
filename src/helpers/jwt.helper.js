/* 
   Trong file helper này mình sẽ sử dụng module jsonwebtoken để viết 2 chức năng
   là generateToken-tạo token và verifyToken-xác minh token có hợp lệ hay không.


 */

 const jwt = require("jsonwebtoken");


/**
 * private function generateToken
 * @param user 
 * @param secretSignature 
 * @param tokenLife 
*/

let generateToken = (user, secretSignature, tokenLife) => {
	//  Định nghĩa những thông tin của user mà bạn muốn lưu vào token ở đây

	return new Promise((resolve, reject) => {
		const userData = {
		_id: user._id,
		name: user.name,
		email: user.email,
	}

	// Thực hiện ký và tạo token

	jwt.sign(
		{data: userData},
		secretSignature,

		{
			algorithm: "HS256",
			expiresIn: tokenLife,
		},

		(error, token) => {
			if (error){
				return reject(error);
			}
			resolve(token);


		});
	});
	
}

/**
 * This module used for verify jwt token
 * @param {*} token 
 * @param {*} secretKey 
 */

let verifyToken = (token, secretKey) => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, secreteKey, (error, decoded) => {
			if(error) {
				return reject(error);
			}
			resolve(decoded);
		})
	})
}


module.exports = {
  generateToken: generateToken,
  verifyToken: verifyToken,
};