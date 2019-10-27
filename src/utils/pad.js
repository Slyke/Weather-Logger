function pad(str, totalSize, withChar = "0", atEnd = false) {
  var s = str.toString();
  if (atEnd) {
    while (s.length < totalSize) {
      s = `${s.toString()}${withChar.toString()}`;
    }
  } else {
    while (s.length < totalSize) {
      s = `${withChar.toString()}${s.toString()}`;
    }
  }
  return s;
};

module.exports = {
  pad
};
