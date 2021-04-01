import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import { sendEmail } from "./email";
import { parseRequest } from "./request";

interface EventResult {
    statusCode: number;
    reason: string;
}

async function processEvent(event: APIGatewayProxyEvent): Promise<EventResult> {
    let formData;
    try {
        formData = await parseRequest(event);
    } catch (e) {
        console.warn("Unable to parse request", e);
        return {
            statusCode: 400,
            reason: (e as Error).message,
        };
    }

    try {
        await sendEmail({
            toAddress: "liztoff@gmail.com",
            fromAddress: "api+contact@liztoff.com",
            replyToAddress: formData.email,
            subject: "Contact Form Submission - liztoff.com",
            body: `
            From: ${formData.name} <${formData.email}>
            Message >>>
            ${formData.message}
            <<<<<<<<<<<
        `,
        });
    } catch (e) {
        console.error("Unable to send email", e);

        return {
            statusCode: 500,
            reason: "Server Error. Try again later.",
        };
    }

    return {
        statusCode: 200,
        reason: "Submitted Successfully.",
    };
}

const handler: APIGatewayProxyHandler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    console.log("Request Event", event);

    let result = await processEvent(event);

    const response: APIGatewayProxyResult = {
        body: JSON.stringify({ result: result.reason }),
        headers: {
            "Content-Type": "text/plain",
            "Access-Control-Allow-Origin": "*",
        },
        isBase64Encoded: false,
        statusCode: result.statusCode,
    };

    console.log("Response", response);

    return response;
};

export { handler };
