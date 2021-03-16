import { APIGatewayProxyEvent } from "aws-lambda";
import * as querystring from "querystring";

type ContactFormData = {
    name: string;
    email: string;
    message: string;
};

function parseRequest(event: APIGatewayProxyEvent): ContactFormData {
    const body = event.body;
    if (!body) {
        throw new Error("Missing body of request");
    }

    const response = querystring.parse(body) as ContactFormData;

    if (!(response.name && response.email && response.message)) {
        throw new Error("A required field was missing from the request");
    }

    return response;
}

export { ContactFormData, parseRequest };
