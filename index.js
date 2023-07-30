const nodeMailer = require("nodemailer");

exports.execute = async (event, fcontext) => {
    if (!(event && event.data)) {
      throw new Error('Invalid payload: event, event.data');
    }
    const payload = JSON.parse(Buffer.from(event.data, 'base64').toString());

    console.log(payload);

    let transporter = nodeMailer.createTransport({
      host: 'smtp.sendgrid.net',
      port: 587,
      auth: {
          user: "apikey",
          pass: process.env.SENDGRID_API_KEY
      },
      tls: {
        rejectUnauthorized: false
      }
   })

    const mailOptions = {
      from: process.env.GMAIL_ADDRESS,
      to: payload.to,
      subject: payload.subject,
      html: payload.html
    };

    transporter
    .sendMail(mailOptions)
    .then(() => {
      console.log('sadf')
    })
    .catch(e => {
      console.log(e)
    });
}