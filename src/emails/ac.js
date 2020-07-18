const sgMail = require('@sendgrid/mail')

const sendGridAPIKey = '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'



sgMail.setApiKey(sendGridAPIKey)

const msg = {
  to: 'shishirsingh48@yahoo.com',
  from: 'shishirsingh48@yahoo.com',
  subject: 'welcome email',
  text: 'welcome to our platform',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>'
}
sgMail.send(msg).then((e)=>{
  console.log(e)
}).catch((e)=>{
  console.log(e)
})


