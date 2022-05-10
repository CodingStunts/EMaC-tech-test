const server = require("express")();
const bodyParser = require("body-parser");
server.use(bodyParser.json());
server.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
const apiRouter = require("./routes/api");
const { handleCustomErrors, handleServerErrors } = require("./errors/errors");

server.use("/api", apiRouter);
server.use(handleCustomErrors);
server.use(handleServerErrors);

module.exports = server;
