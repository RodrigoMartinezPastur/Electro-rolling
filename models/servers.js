const express = require("express");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuarioPath = "/api/usuarios";
    this.authPath = "/api/auth";
    this.productosPath = "/api/productos";

    this.conectarDB();

    this.midlewares();

    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  midlewares() {
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usuarioPath, require("../routes/usuarios"));
    this.app.use(this.authPath, require("../routes/auth"));
    this.app.use(this.productosPath, require("../routes/producto"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server online", this.port);
    });
  }
}

module.exports = Server;
