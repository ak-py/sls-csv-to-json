const getSlsOfflinePort = () => {
  return process.env.PORT || "3000";
};

module.exports = getSlsOfflinePort;