const { Router } = require("express");
const { compraGet, compraPost } = require("../controlers/compras");
const { validarJWT } = require("../midlewares/validar-jwt");

const router = Router();

router.get("/", compraGet);

router.post("/:id", [validarJWT], compraPost);

router.put("/:id");
router.delete("/:id");

module.exports = router;
