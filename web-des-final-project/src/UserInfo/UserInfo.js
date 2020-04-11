var UserInfo = (function () {
  var userInfoObj = null;

  var getUserInfoObj = function () {
    return userInfoObj; // Or pull this from cookie/localStorage
  };

  var setUserInfoObj = function (name) {
    userInfoObj = name;
    // Also set this in cookie/localStorage
  };

  return {
    getUserInfoObj: getUserInfoObj,
    setUserInfoObj: setUserInfoObj,
  };
})();

export default UserInfo;
