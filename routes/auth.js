const { Router } = require("express");
const { check } = require("express-validator");

const { login } = require("../controlers/auth");
const { validarCampos } = require("../midlewares/validar-campos");

const router = Router();

router.post(
  "/login",
  [
    check("email", "el email es obligatorio").isEmail(),
    check("password", "la password es obligatoria").notEmpty(),
    validarCampos,
  ],
  login
);

module.exports = router;
