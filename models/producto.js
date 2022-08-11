const { Schema, model } = require("mongoose");

const ProductoSchema = Schema({
  nombre: {
    type: String,
    required: [true, "el nombre es obligatorio"],
  },
  estado: {
    type: Boolean,
    default: true,
  },
  precio: {
    type: String,
    required: [true, "el precio es obligatorio"],
  },
  detalle: {
    type: String,
    required: [true, "los datalles son obligatorios"],
  },
  categoria: {
    type: String,
    //enum: ["HELADERAS", "MICRONDAS"],
  },
});

ProductoSchema.methods.toJSON = function () {
  const { __v, _id, ...resto } = this.toObject();
  resto.uid = _id;
  return resto;
};

module.exports = model("Producto", ProductoSchema);
