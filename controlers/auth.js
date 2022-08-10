const bcrypt = require("bcrypt");
const { generarJWT } = require("../helpers/generar-jwt");

const Usuario = require("../models/usuario");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // verificar email si existe
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ msg: "el email | password incorrectos" });
    }

    // verificar si email activo

    if (!usuario.estado) {
      return res
        .status(400)
        .json({ msg: "usuario suspendido, Cominiquese con un administrador" });
    }

    //verificas password

    const validPassword = bcrypt.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(200).json({ msg: "el email | password incorrectos" });
    }

    //generar token
    const token = await generarJWT(usuario.id);

    res.status(200).json({ usuario, token });
  } catch (error) {
    console.log(error);

    res.status(500).json({ msg: "comoniquese con el administrador" });
  }
};

module.exports = {
  login,
};
