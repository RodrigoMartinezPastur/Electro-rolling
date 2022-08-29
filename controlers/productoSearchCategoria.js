const { request, response } = require("express");

const { ObjectId } = require("mongoose").Types;

const Producto = require("../models/producto");

const buscarProductoCategoria = async (req = request, res = response) => {
  const { search } = req.query;
  const { limite = 15, desde = 0 } = req.query;

  const isMongoID = ObjectId.isValid(search);

  if (isMongoID) {
    const producto = await Producto.findById(search);

    return res.json({ results: producto ? [producto] : [] });
  }

  const regex = new RegExp(search, "i");

  const productos = await Producto.find({
    categoria: regex,
    estado: true,
  }).skip(desde).limit(limite).populate("detalle", "nombre");

  return res.json({ results: productos });
};

module.exports = { buscarProductoCategoria };
