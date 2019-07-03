generateResponse = (code, payload, headers = {}) => {
  // console.log(payload);
  return {
    statusCode: code,
    headers: headers,
    body: JSON.stringify(payload)
  }
};

generateError = (code, err) => {
  // console.log(err);
  return generateResponse(code, {
    message: err.message
  })
};

module.exports.generateResponse = generateResponse;
module.exports.generateError = generateError;
