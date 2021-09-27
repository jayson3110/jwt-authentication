/*
    Trong file FriendController.js này mình viết một controller đơn giản friendLists – lấy ra danh sách bạn bè của người dùng.
“Đây cũng sẽ là controller mà sau khi chúng ta xác thực người dùng thành công thì mới cho phép lấy thông tin bạn bè của người dùng rồi trả kết quả về.“

*/



let friendLists = (req,res) => {
	debug(`Xác thực token hợp lệ, thực hiện giả lập lấy danh sách bạn bè của user và trả về cho người dùng...`);

	// Lưu ý khi làm thực tế thì việc lấy danh sách này là query tới DB để lấy nhé. Ở đây mình chỉ mock thôi.

	const friends = [
	   {
	   	name: "Spencer Edward",
	   },
	   {
	   	name : "Jay park righthere"
	   },
	   {
	   	name : "Porter Robinson"
	   },
	];
	return res.status(200).json(friends);

}


module.exports = {
  friendLists: friendLists,
};