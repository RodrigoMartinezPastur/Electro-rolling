const { request, resolve } = require("express");
const bcrypt = require("bcrypt");

const Usuario = require("../models/usuario");

const usuariosGet = async (req = request, res = resolve) => {
  const { limite = 5, desde = 0 } = req.query;

  /*   const usuarios = await Usuario.find({ estado: true })
    .skip(desde)
    .limit(limite);

  const total = await Usuario.countDocuments({ estado: true });
 */
  const [usuarios, total] = await Promise.all([
    Usuario.find({ estado: true }).skip(desde).limit(limite),
    Usuario.countDocuments({ estado: true }),
  ]);

  res.json({ total, usuarios });
};

const usuariosPost = async (req, res) => {
  const { nombre, email, password, role } = req.body;

  const usuario = new Usuario({ nombre, email, password, role });

  // encriptar contrasena
  const salt = bcrypt.genSaltSync();

  usuario.password = bcrypt.hashSync(password, salt);

  await usuario.save();

  res.status(201).json({ msg: "peticion post - controler", usuario });
};

const usuariosPut = async (req, res) => {
  const { id } = req.params;
  const { _id, password, email, ...resto } = req.body;

  // validar contra la BD

  if (password) {
    //encriptar
    const salt = bcrypt.genSaltSync();

    resto.password = bcrypt.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

  res.json({ msg: "usuario actualizado", usuario });
};

const usuariosDelete = async (req, res) => {
  const { id } = req.params;

  // inactivar usuario

  const query = { estado: false };

  const usuarioBorrado = await Usuario.findByIdAndUpdate(id, query, {
    new: true,
  });

  //const usuarioBorrado = await Usuario.findByIdAndRemove(id);

  const usuarioAutenticado = req.usuario;

  res.json({ msg: "usuario inactivado", usuarioBorrado, usuarioAutenticado });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
};
