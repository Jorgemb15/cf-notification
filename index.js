const nodeMailer = require("nodemailer");
const { SecretManagerServiceClient } =
  require("@google-cloud/secret-manager").v1;
const fs = require("fs");

exports.execute = async (event, fcontext) => {
  if (!(event && event.data)) {
    throw new Error("Invalid payload: event, event.data");
  }
  const payload = JSON.parse(Buffer.from(event.data, "base64").toString());

  console.log(payload);

  const secretmanagerClient = new SecretManagerServiceClient();

  const request = {
    name: "projects/977716192399/secrets/test/versions/latest",
  };

  const [response] = await secretmanagerClient.accessSecretVersion(request);
  const credentials = JSON.parse(response?.payload?.data.toString());

  let transporter = nodeMailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 587,
    auth: {
      user: "apikey",
      pass: credentials.SENDGRID_API_KEY,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const template = fs.readFileSync(`./templates/${payload?.template}`);

  for (const element of payload.recipients) {
    let content = template.toString();
    for (const [key, val] of Object.entries(element.params)) {
      const regex = new RegExp(`@@${key}`, "g");
      content = content.replace(regex, "" + val);
    }

    console.log('Hacia');
    console.log(element.recipient);

    const mailOptions = {
      from: credentials.GMAIL_ADDRESS,
      to: element.recipient,
      subject: payload.subject,
      html: content,
    };

    transporter
      .sendMail(mailOptions)
      .then(() => {
        console.log("Enviado");
      })
      .catch((e) => {
        console.log(e);
      });
  }
};
