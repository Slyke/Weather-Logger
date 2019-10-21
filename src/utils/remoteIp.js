const getRemoteIp = (req) => {
  return req.connection.remoteAddress || req.socket.remoteAddress || req.headers['x-forwarded-for'];
};

const ipAllowed = (remoteIp, ipList) => {
  for (let i = 0; i < ipList.length; i++) {
    if (ipList[i].indexOf(remoteIp) > -1) {
      return true;
    }
  }
  
  return false;
};

module.exports = {
  getRemoteIp,
  ipAllowed
};
