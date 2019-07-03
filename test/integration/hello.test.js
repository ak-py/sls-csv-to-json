const request = require("supertest");
const getSlsOfflinePort = require("../support/getSlsOfflinePort");

describe("HTTP Route - hello",() => {

  test("no query and no path parameters", async () => {
    const response = await get("/hello").expect(200);
    expect(response.body.message).toEqual("HELLO WORLD")
  });

  test("query name is AK and no path parameters", async () => {
    const response = await get("/hello?name=AK").expect(200);
    expect(response.body.message).toEqual("Hello AK")
  });

  test("query search is google and no path parameters", async () => {
    const response = await get("/hello?search=google").expect(200);
    expect(response.body.message).toEqual("HELLO WORLD")
  });
});

const get = (url) => {
  const PORT = getSlsOfflinePort();
  const httpRequest = request(`http://localhost:${PORT}`).get(url);
  httpRequest.set('Accept', 'application/json');
  httpRequest.set('Origin', `http://localhost:${PORT}`);
  return httpRequest;
};