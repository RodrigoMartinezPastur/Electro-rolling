const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: [true, "el nombre es obligatorio"],
  },

  email: {
    type: String,
    required: [true, "el correo es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "la password es obligatoria"],
  },

  role: {
    type: String,
    //enum: ["ADMIN_ROLE", "USER_ROLE"],
  },
  img: {
    type: String,
  },
  estado: {
    type: Boolean,
    default: true,
  },
});

// quitar datos de la respuesta

UsuarioSchema.methods.toJSON = function () {
  const { __v, password, ...resto } = this.toObject();
  return resto;
};

module.exports = model("Usuario", UsuarioSchema);
