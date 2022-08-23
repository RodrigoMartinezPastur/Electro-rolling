const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuarioPath = "/api/usuarios";
    this.authPath = "/api/auth";
    this.productosPath = "/api/productos";
    this.comprarPath = "/api/compras";
    this.searchPath = "/api/search";
    this.favoritoPath = "/api/favorito";

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
    this.app.use(cors());
  }

  routes() {
    this.app.use(this.usuarioPath, require("../routes/usuarios"));
    this.app.use(this.authPath, require("../routes/auth"));
    this.app.use(this.productosPath, require("../routes/producto"));
    this.app.use(this.comprarPath, require("../routes/compra"));
    this.app.use(this.searchPath, require("../routes/productoSearch"));
    this.app.use(this.favoritoPath, require("../routes/favorito"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server online", this.port);
    });
  }
}

module.exports = Server;
