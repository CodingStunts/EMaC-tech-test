const server = require("express")();
const bodyParser = require("body-parser");
server.use(bodyParser.json());
server.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
const apiRouter = require("./routes/api");

server.use("/api", apiRouter);

module.exports = server;
