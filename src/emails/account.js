const sgMail = require('@sendgrid/mail')

const sendGridAPIKey = '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'


sgMail.setApiKey(sendGridAPIKey)


const sendWelcomeEmail = (email,name) => {
  sgMail.send({
    to: email,
    from: 'shishirsingh48@yahoo.com',
    subject: 'welcome email',
    text: `welcome to our platform, ${name}.`
  })
}

const sendExitEmail = (email,name) => {
  sgMail.send({
    to: email,
    from: 'shishirsingh48@yahoo.com',
    subject: 'exit email',
    text: `goodbye, ${name}.`
  })
}
module.exports = {
  sendWelcomeEmail,
  sendExitEmail
}