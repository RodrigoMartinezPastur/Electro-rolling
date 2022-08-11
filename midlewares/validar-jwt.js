const { request } = require("express");
const Usuario = require("../models/usuario");
const jwt = require("jsonwebtoken");

const validarJWT = async (req = request, res, next) => {
  const token = req.header("x-token");
  //verificar que venga
  if (!token) {
    return res.status(401).json({ msg: "no se reconoce el token" });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    //leer usuario
    const usuario = await Usuario.findById(uid);

    //verificar si existe

    if (!usuario) {
      return res
        .status(401)
        .json({ msg: "el token no  valido - usuario no existe" });
    }

    //verificar actividad

    if (!usuario.estado) {
      return res
        .status(401)
        .json({ msg: "el token no  valido - usuario suspendido" });
    }

    req.usuario = usuario;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ msg: "token no valido " });
  }
};

module.exports = {
  validarJWT,
};
