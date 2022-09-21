const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../midlewares/validar-campos");
const { validarJWT } = require("../midlewares/validar-jwt");
const { esAdminRol } = require("../midlewares/validar-rol");
const {
  esRolValido,
  existeEmail,
  existeUsuarioPorId,
} = require("../helpers/db-validator");

const {
  usuariosGet,
  obtenerIdUsuario,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
} = require("../controlers/usuario");

const router = Router();

router.get("/", [validarJWT, esAdminRol], usuariosGet);

router.get("/validar", [validarJWT], obtenerIdUsuario);

router.post(
  "/",
  [
    check("nombre", "el nombre es obligatorio").notEmpty(),
    check("password", "el password debe tener minimo 6 caracteres").isLength({
      min: 6,
    }),
    check("email", "el correo no es valido").isEmail(),
    check("email").custom(existeEmail),
    check("role").custom(esRolValido),
    validarCampos,
  ],
  usuariosPost
);

router.put(
  "/:id",
  [
    validarJWT,
    check("id", "no es un id valido ").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("role").custom(esRolValido),
    validarCampos,
  ],
  usuariosPut
);

router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRol,
    check("id", "no es un id valido ").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  usuariosDelete
);

module.exports = router;
