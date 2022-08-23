const { Router } = require("express");
const { favoritosPost } = require("../controlers/favoritos");
const { exsiteOtroIdIgualFavorito } = require("../helpers/db-validator");
const { validarCampos } = require("../midlewares/validar-campos");

const { validarJWT } = require("../midlewares/validar-jwt");

const router = Router();

router.post("/:id", [validarJWT], favoritosPost);

module.exports = router;
