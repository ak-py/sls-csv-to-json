const request = require("supertest");
const getSlsOfflinePort = require("../support/getSlsOfflinePort");

describe("HTTP POST - csv/{name}",() => {

  test("invalid file name", async () => {
    await postRequest("/csv/").expect('Content-Type', /json/).expect(404);
  });

  test("test-value", async () => {
    const response = await postRequest("/csv/test-value", "test\nvalue").expect(200);
    expect(response.body.data).toEqual("test\nvalue")
  });

});

const postRequest = (url, body) => {
  const PORT = getSlsOfflinePort();
  const httpRequest = request(`http://localhost:${PORT}`).post(url);
  httpRequest.send(body);
  httpRequest.set('Accept', 'application/json')
  httpRequest.set('Origin', `http://localhost:${PORT}`);
  return httpRequest;
};