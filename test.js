const cf = require("./index");

const json = {
  recipients: [
    {
      params: {
        password: "123456",
      },
      recipient: "jorgemb15@hotmail.es",
    },
    {
      params: {
        password: "321654",
      },
      recipient: "jorgemb15@hotmail.es",
    },
  ],
  subject: "prueba",
  template: "new-password.html",
};

const data = JSON.stringify(json);

const dataBuffer = Buffer.from(data);

const event = { data: dataBuffer };

console.log(JSON.stringify(event.data));

cf.execute(event);
