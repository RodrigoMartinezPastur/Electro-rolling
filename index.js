const { addListener } = require("nodemon");
const Server = require("./models/servers");
require("dotenv").config();

const server = new Server();

server.listen();
