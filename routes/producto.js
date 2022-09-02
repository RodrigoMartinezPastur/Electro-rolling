const { Router } = require("express");
const { validarJWT } = require("../midlewares/validar-jwt");
const { check } = require("express-validator");
const { validarCampos } = require("../midlewares/validar-campos");
const {
  existeProductoById,
  esCategoriaValida,
} = require("../helpers/db-validator");
const { esAdminRol } = require("../midlewares/validar-rol");

const {
  productoGet,
  productoPost,
  productoPorId,
  produtosPut,
  productoDelete,
} = require("../controlers/productos");

const router = Router();

//GET
router.get("/", productoGet);

router.get(
  "/:id",
  [
    check("id", "no es un id de mongo valido").isMongoId(),
    check("id").custom(existeProductoById),
    validarCampos,
  ],
  productoPorId
);

// post

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "el nombre es obligatorio").notEmpty(),
    check("img", "la imagen es obligatoria").notEmpty(),
    check("precio", "el precio es obligatorio $$").notEmpty(),
    check("detalle", "los detalles son obligatorios").notEmpty(),
    check("categoria").custom(esCategoriaValida),
    validarCampos,
  ],
  productoPost
);

// PUT

router.put(
  "/:id",
  [
    validarJWT,
    check("id", "no es un id de mongo valido").isMongoId(),
    check("id").custom(existeProductoById),
    check("nombre", "el nombre es obligatorio").notEmpty(),
    check("img", "la imagen es obligatoria").notEmpty(),
    check("precio", "el precio es obligatorio $$").notEmpty(),
    check("detalle", "los detalles son obligatorios").notEmpty(),
    check("categoria").custom(esCategoriaValida),
    validarCampos,
  ],
  produtosPut
);

// DELETE

router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRol,
    check("id", "no es un id de mongo valido").isMongoId(),
    check("id").custom(existeProductoById),
    validarCampos,
  ],
  productoDelete
);
// intento de reinicio de heroku
module.exports = router;
