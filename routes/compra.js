const { Router } = require("express");
const { check } = require("express-validator");
const { validarJWT } = require("../midlewares/validar-jwt");
const { esAdminRol } = require("../midlewares/validar-rol");
const {
  compraGet,
  compraPost,
  compraDelete,
} = require("../controlers/compras");
const { validarCampos } = require("../midlewares/validar-campos");

const router = Router();

router.get("/", [validarJWT, esAdminRol], compraGet);

router.post(
  "/",
  [
    validarJWT,
    check("usuario", "no es un usuario valido ").isMongoId(),
    check("producto", "el producto no es valido").isMongoId(),

    validarCampos,
  ],
  compraPost
);

router.delete("/:id", compraDelete);

module.exports = router;
