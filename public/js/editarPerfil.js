document.getElementById("username").onkeypress = function (e) {
  var chr = String.fromCharCode(e.which);
  if ("1234567890qwertyuioplkjhgfdsazxcvbnm".indexOf(chr) < 0)
      return false;
};