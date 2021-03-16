import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import { sendEmail } from "./email";
import { parseRequest } from "./request";

async function processEvent(event: APIGatewayProxyEvent): Promise<number> {
    let formData;
    try {
        formData = parseRequest(event);
    } catch (e) {
        console.warn("Unable to parse request", e);
        return 400;
    }

    try {
        await sendEmail({
            toAddress: "liztoff@gmail.com",
            fromAddress: "api+contact@liztoff.com",
            replyToAddress: formData.email,
            subject: "Test email",
            body: `
            From: ${formData.name} <${formData.email}>
            Message >>>
            ${formData.message}
            <<<<<<<<<<<
        `,
        });
    } catch (e) {
        console.error("Unable to send email", e);
        return 500;
    }

    return 200;
}

const handler: APIGatewayProxyHandler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    console.log("Request Event", event);

    let statusCode = await processEvent(event);

    const response: APIGatewayProxyResult = {
        body: "{}",
        headers: {
            "Content-Type": "text/plain",
        },
        isBase64Encoded: false,
        statusCode: statusCode,
    };

    console.log("Response", response);

    return response;
};

export { handler };
