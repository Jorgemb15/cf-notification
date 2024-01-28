const cf = require("./index");

const json = {
  customerId: "2c812f4a5af659e3a8536e1798ce9e8e",
  applicationId: "9b55ccd603ab5cee81e900347cae1bf3",
  recipients: [
    {
      params: {
        password: "123456",
      },
      recipient: "jorgemb15@gmail.com",
    },
    {
      params: {
        password: "123456",
      },
      recipient: "jorgemb15@hotmail.es",
    },
  ],
  subject: "testtesttest",
  template: "new-password.html",
};

const data = JSON.stringify(json);

const dataBuffer = Buffer.from(data);

const event = { data: dataBuffer };

console.log(JSON.stringify(event.data));

cf.execute(event);
