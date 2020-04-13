var CartInfo = (function () {
  var cartObjs = null;
  var orderPlaced = false;

  var getCartObjs = function () {
    return cartObjs;
  };

  var setCartObjs = function (obj) {
    cartObjs = obj;
  };

  var getOrderPlaced = function () {
    return orderPlaced;
  };

  var setOrderPlaced = function (bool) {
    orderPlaced = bool;
  };

  return {
    getCartObjs: getCartObjs,
    setCartObjs: setCartObjs,
    getOrderPlaced: getOrderPlaced,
    setOrderPlaced: setOrderPlaced,
  };
})();

export default CartInfo;
