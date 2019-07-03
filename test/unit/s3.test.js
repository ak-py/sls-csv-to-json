const {s3CreateFile, s3ReadFile} = require("../../libs/s3-lib");

const BUCKET = "intuit.akgupta.tech";
const BUCKET_URL_PREFIX = "https://s3.us-west-1.amazonaws.com"

const getFileName = (fileType, name) => {
  return `${fileType}/${name}.${fileType}`;
};

describe('Unit Tests - s3ReadFile - CSV', () => {

  test("reading file /csv/test-value.csv", async ()=>{
    const fileName = getFileName("csv", "test-value");
    const actual = await s3ReadFile(fileName, BUCKET);
    expect(actual).toEqual("test\nvalue")
  });

  test("reading file /json/test-value.json", async () => {
    const fileName = getFileName("json", "test-value");
    const actual = await s3ReadFile(fileName, BUCKET);
    expect(actual).toEqual("[{\"test\":\"value\"}]")
  });

  test("reading invalid fileName", async ()=>{
    try{
      const actual = await s3ReadFile("fileName", BUCKET);
      expect(actual).toEqual("test\nvalue")
    } catch (err) {
      expect(err.code).toEqual("NoSuchKey");
      expect(err.statusCode).toEqual(404);
    }
  });
});



describe('Unit Tests - s3CreateFile - CSV', ()=> {

  test("writing file /csv/test-value.csv", async ()=>{
    const fileName = getFileName("csv", "test-value");
    const actual = await s3CreateFile("csv", fileName, "test\nvalue",BUCKET);
    const expected = (`Success. File uploaded to S3 at ${BUCKET} bucket. File location: ${BUCKET_URL_PREFIX}/${BUCKET}/${fileName}`);
    expect(actual).toEqual(expected)
  });

  test("writing file /json/test-value.json", async ()=>{
    const fileName = getFileName("json", "test-value");
    const actual = await s3CreateFile("json", fileName, "[{\"test\":\"value\"}]",BUCKET);
    const expected = (`Success. File uploaded to S3 at ${BUCKET} bucket. File location: ${BUCKET_URL_PREFIX}/${BUCKET}/${fileName}`);
    expect(actual).toEqual(expected)
  });

});
