const cf = require("./index");

const json = {
  to: "jorgemb15@hotmail.es",
  subject: "prueba",
  html: "<h1>GCDCR</h1> <br/> <h3>Esto es una prueba<h3/>",
};

const data = JSON.stringify(json);

const dataBuffer = Buffer.from(data);

const event = { data: dataBuffer };

console.log(event.data);

console.log(JSON.stringify(event.data));

cf.execute(event);
