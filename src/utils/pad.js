function pad(str, totalSize, withChar = "0", atEnd = false) {
  var s = str + "";
  if (atEnd) {
    while (s.length < totalSize) {
      s += withChar;
    }
  } else {
    while (s.length < totalSize) {
      s =+ withChar;
    }
  }
  return s;
};

module.exports = {
  pad
};
