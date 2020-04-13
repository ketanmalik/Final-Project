var UserInfo = (function () {
  var userInfoObj = null;

  var getUserInfoObj = function () {
    return userInfoObj;
  };

  var setUserInfoObj = function (name) {
    userInfoObj = name;
  };

  return {
    getUserInfoObj: getUserInfoObj,
    setUserInfoObj: setUserInfoObj,
  };
})();

export default UserInfo;
