import { APIGatewayProxyEvent } from "aws-lambda";
import * as querystring from "querystring";
import { checkRecaptchaResponse } from "./recaptcha";

type ContactFormData = {
    name: string;
    email: string;
    message: string;
    "g-recaptcha-response"?: string;
};

async function parseRequest(event: APIGatewayProxyEvent): Promise<ContactFormData> {
    const body = event.body;
    if (!body) {
        throw new Error("Missing body of request");
    }

    const response = querystring.parse(body) as ContactFormData;

    if (!(response.name && response.email && response.message)) {
        throw new Error("A required field was missing from the request");
    }

    await checkRecaptchaResponse(event, response["g-recaptcha-response"]);

    return response;
}

export { ContactFormData, parseRequest };
