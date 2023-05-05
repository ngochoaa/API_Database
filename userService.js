var userModel = require("./models/user");
var key = "123456789trytryrtyr";
var encryptor = require("simple-encryptor")(key);

module.exports.createUserDBService = (userDetails) => {
  return new Promise(function myFn(resolve, reject) {
    var userModelData = new userModel();

    userModelData.TenKH = userDetails.TenKH;
    userModelData.SDT = userDetails.SDT;
    userModelData.Matkhau = userDetails.Matkhau;
    var encrypted = encryptor.encrypt(userDetails.Matkhau);
    userModelData.Matkhau = encrypted;

    userModelData.save(function resultHandle(error, result) {
      if (error) {
        reject(false);
      } else {
        resolve(true);
      }
    });
  });
};
module.exports.loginuserDBService = (employeeDetails) => {
  return new Promise(function myFn(resolve, reject) {
    userModel.findOne(
      { SDT: employeeDetails.SDT },
      function getresult(errorvalue, result) {
        if (errorvalue) {
          reject({ status: false, msg: "Invaild Data" });
        } else {
          if (result != undefined && result != null) {
            var decrypted = encryptor.decrypt(result.Matkhau);

            if (decrypted == employeeDetails.Matkhau) {
              resolve({  msg: result._id });
            } else {
              reject({ msg: "Đăng nhập thất bại" });
            }
          } else {
            reject({
              msg: "Tài khoản mật khẩu không có trong hệ thống",
            });
          }
        }
      }
    );
  });
};
