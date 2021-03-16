import { SES } from "aws-sdk";

const sesClient = new SES();

async function sendEmail(args: {
    toAddress: string;
    fromAddress: string;
    replyToAddress: string;
    subject: string;
    body: string;
}): Promise<void> {
    const params: SES.Types.SendEmailRequest = {
        Destination: {
            ToAddresses: [args.toAddress],
        },
        Message: {
            Body: {
                Text: { Data: args.body },
            },

            Subject: { Data: args.subject },
        },
        Source: args.fromAddress,
        ReplyToAddresses: [args.replyToAddress],
    };

    await sesClient.sendEmail(params).promise();
}

export { sendEmail };
