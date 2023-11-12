const cf = require("./index");

const json = {
  recipients: [
    {
      params: {
        password: "123456",
      },
      recipient: "jorge.barrantes@gcdcr.com,jorgemb15@hotmail.es, jorgemb15@gmail.com",
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
