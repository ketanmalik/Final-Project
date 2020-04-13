var CartInfo = (function () {
  var cartObjs = null;

  var getCartObjs = function () {
    return cartObjs;
  };

  var setCartObjs = function (obj) {
    cartObjs = obj;
  };

  return {
    getCartObjs: getCartObjs,
    setCartObjs: setCartObjs,
  };
})();

export default CartInfo;
