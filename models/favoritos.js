const { Schema, model } = require("mongoose");

const favoritosSchema = Schema({
  producto: {
    type: Schema.Types.ObjectId,
    ref: "Producto",
    required: true,
  },
});

favoritosSchema.methods.toJSON = function () {
  const { __v, ...resto } = this.toObject();

  return resto;
};

module.exports = model("Favoritos", favoritosSchema);
