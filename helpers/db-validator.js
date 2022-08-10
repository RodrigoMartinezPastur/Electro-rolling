const Role = require("../models/role");
const Usuario = require("../models/usuario");
const Producto = require("../models/producto");

const esRolValido = async (role = "") => {
  const existeRole = await Role.findOne({ role });

  if (!existeRole) {
    throw new Error(`El rol ${role} no existe en la BD`);
  }
};

const existeEmail = async (email) => {
  const emailExiste = await Usuario.findOne({ email });

  if (emailExiste) {
    throw new Error(`El email ${email} ya existe en la BD`);
  }
};

const existeUsuarioPorId = async (id) => {
  const existeUsuario = await Usuario.findOne({ _id: id });

  if (!existeUsuario) {
    throw new Error(`el id ${id} no existe `);
  }
};

const existeProductoById = async (id) => {
  const existeProducto = await Producto.findById(id);

  if (!existeProducto) {
    throw new Error(`el id ${id} no existe `);
  }
};

module.exports = {
  esRolValido,
  existeEmail,
  existeUsuarioPorId,
  existeProductoById,
};
