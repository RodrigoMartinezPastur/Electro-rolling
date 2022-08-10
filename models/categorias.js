const { Schema, model } = require("mongoose");

const CategoriaSchema = Schema({
  categoria: {
    type: String,
    required: [true, "la categoria es obligatoria"],
  },
});

module.exports = model("Categoria", CategoriaSchema);
