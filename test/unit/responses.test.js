const {generateResponse, generateError} = require("../../libs/response-lib");

describe('Unit Tests - generateError', () => {

  test("Bad Request - 400", () => {
    const code = 400;
    const err = new Error('Bad Request');
    const expectedResponse = generateError(code, err);

    expect({"body": "{\"message\":\"Bad Request\"}", "headers": {}, "statusCode": 400}).toEqual(expectedResponse);
  });

  test("Not Found Error - 404", () => {
    const code = 404;
    const err = new Error('Not Found Error');
    const expectedResponse = generateError(code, err);

    expect({"body": "{\"message\":\"Not Found Error\"}", "headers": {}, "statusCode": 404}).toEqual(expectedResponse);
  });

  test("Internal Server Error - 500", () => {
    const code = 404;
    const err = new Error('Internal Server Error');
    const expectedResponse = generateError(code, err);

    expect({"body": "{\"message\":\"Internal Server Error\"}", "headers": {}, "statusCode": 404}).toEqual(expectedResponse);
  });
});

describe('Unit Tests - generateResponse', ()=> {

  test("OK - 200 w/o headers", () => {
    const code = 200;
    const payload = {message: "Test Value"};
    const expectedResponse = generateResponse(code, payload);

    expect({"body": "{\"message\":\"Test Value\"}", "headers": {}, "statusCode": 200}).toEqual(expectedResponse);
  });

  test("OK - 200 w/ headers and csv", () => {
    const code = 200;
    const payload = {message: "Test Value"};
    const fileType = "csv";
    const headers = { "Content-Type": `text/${fileType}` };
    const expectedResponse = generateResponse(code, payload, headers);

    expect({"body": "{\"message\":\"Test Value\"}", "headers": {"Content-Type": "text/csv" }, "statusCode": 200}).toEqual(expectedResponse);
  });

  test("OK - 200 w/ headers and json", () => {
    const code = 200;
    const payload = {message: "Test Value"};
    const fileType = "json";
    const headers = { "Content-Type": `text/${fileType}` };
    const expectedResponse = generateResponse(code, payload, headers);

    expect({"body": "{\"message\":\"Test Value\"}", "headers": {"Content-Type": "text/json" }, "statusCode": 200}).toEqual(expectedResponse);
  });
});
