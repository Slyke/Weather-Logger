const getRemoteIp = (req) => {
  return req.connection.remoteAddress || req.socket.remoteAddress || req.headers['x-forwarded-for'];
};

const ipAllowed = (remoteIp, ipList) => {
  for (let i = 0; i < ipList.length; i++) {
    if (remoteIp.indexOf(ipList[i]) > -1) {
      return true;
    }
  }
  
  return false;
};

module.exports = {
  getRemoteIp,
  ipAllowed
};
