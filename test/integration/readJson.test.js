const request = require("supertest");
const getSlsOfflinePort = require("../support/getSlsOfflinePort");

describe("HTTP GET - json/{name}",() => {

  test("invalid file name", async () => {
    const response = await getRequest("/json/FNFE").expect('Content-Type', /json/)
      .expect(404);
    expect(response.body.message).toEqual("Not Found")
  });

  test("test-value", async () => {
    const response = await getRequest("/json/test-value").expect('Content-Type', /json/)
      .expect(200);
    expect(response.text).toEqual("[{\"test\":\"value\"}]");
  });

});

const getRequest = (url) => {
  const PORT = getSlsOfflinePort();
  const httpRequest = request(`http://localhost:${PORT}`).get(url);
  httpRequest.set('Origin', `http://localhost:${PORT}`);
  return httpRequest;
};