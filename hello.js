// hello.js

module.exports.handler = async (event) => {

    console.log(event);

    var message = 'HELLO WORLD';

    const name = event.queryStringParameters && event.queryStringParameters.name;

    if(name) {
        message = 'Hello ' + name;
    }

    const response =  {
        statusCode: 200,
        body: JSON.stringify({
            message: message,
            input: event,
        }, null, 2),
    };

    return response;
};