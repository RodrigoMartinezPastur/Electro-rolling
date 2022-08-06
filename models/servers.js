const express = require("express");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.routes();
  }

  routes() {
    this.app.get("/", function (req, res) {
      res.json("pet get");
    });

    this.app.post("/", function (req, res) {
      res.json("pet poost");
    });

    this.app.put("/", function (req, res) {
      res.json("pet put");
    });

    this.app.delete("/", function (req, res) {
      res.json("pet delete");
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server online", this.port);
    });
  }
}

module.exports = Server;
