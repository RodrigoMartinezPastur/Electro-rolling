const { Router } = require("express");

const { buscarProducto } = require("../controlers/productoSearch");

const { validarJWT } = require("../midlewares/validar-jwt");

const router = Router();

router.get("/", [validarJWT], buscarProducto);

module.exports = router;
