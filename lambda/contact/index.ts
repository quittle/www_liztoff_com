import { APIGatewayProxyEvent } from "aws-lambda";

async function handler(event: APIGatewayProxyEvent) {
    console.log("Incoming request", event);
    return {
        body: "",
        headers: {
            "Content-Type": "text/plain",
        },
        statusCode: 200,
    };
}

export { handler };
