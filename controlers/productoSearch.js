const { request, response } = require("express");

const { ObjectId } = require("mongoose").Types;

const Producto = require("../models/producto");

const buscarProducto = async (req = request, res = response) => {
  const { search } = req.query;

  const isMongoID = ObjectId.isValid(search);

  if (isMongoID) {
    const producto = await Producto.findById(search);

    return res.json({ results: producto ? [producto] : [] });
  }

  const regex = new RegExp(search, "i");

  const productos = await Producto.find({
    nombre: regex,
    estado: true,
  }).populate("detalle", "nombre");

  return res.json({ results: productos });
};

module.exports = { buscarProducto };
