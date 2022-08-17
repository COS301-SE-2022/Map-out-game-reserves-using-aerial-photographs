const aws = require('aws-sdk')
const ses = new aws.SES()

exports.handler = async (event) => {
  for (const streamedItem of event.Records) {
    if (streamedItem.eventName === 'INSERT') {
      //pull off items from stream
      const candidateEmail = streamedItem.dynamodb.NewImage.email.S

      await ses
          .sendEmail({
            Destination: {
              ToAddresses: [process.env.SES_EMAIL],
            },
            Source: process.env.SES_EMAIL,
            Message: {
              Subject: { Data: 'Aerial Mapper: Invite to Register' },
              Body: {
                Text: { Data: `You've been invited to register on the Aerial Mapper ${candidateEmail}!` },
              },
            },
          })
          .promise()
    }
  }
  return { status: 'done' }
}
