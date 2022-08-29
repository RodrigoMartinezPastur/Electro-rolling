const { Router } = require("express");

const { buscarProductoCategoria } = require("../controlers/productoSearchCategoria");

const { validarJWT } = require("../midlewares/validar-jwt");

const router = Router();

router.get("/", buscarProductoCategoria);

module.exports = router;
