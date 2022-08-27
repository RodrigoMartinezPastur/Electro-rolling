const { Router } = require("express");
const {
  compraGet,
  compraPost,
  compraPut,
  compraDelete,
} = require("../controlers/compras");
const { validarJWT } = require("../midlewares/validar-jwt");

const router = Router();

router.get("/", compraGet);

router.post("/:id", [validarJWT], compraPost);

router.put("/:id", compraPut);
router.delete("/:id", compraDelete);

module.exports = router;
