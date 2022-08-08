const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../midlewares/validar-campos");
const Role = require("../models/role");
const {
  esRolValido,
  existeEmail,
  existeUsuarioPorId,
} = require("../helpers/db-validator");

const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
} = require("../controlers/usuario");

const router = Router();

router.get("/", usuariosGet);

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
    check("id", "no es un id valido ").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  usuariosDelete
);

module.exports = router;
