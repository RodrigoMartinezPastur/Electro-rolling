const { request, response } = require("express");

const { ObjectId } = require("mongoose").Types;

const Producto = require("../models/producto");

const buscarProducto = async (req = request, res = response) => {
  const { search } = req.query;
  const { limite = 15, desde = 0 } = req.query;

  const isMongoID = ObjectId.isValid(search);

  if (isMongoID) {
    const producto = await Producto.findById(search);

    return res.json({ results: producto ? [producto] : [] });
  }

  const regex = new RegExp(search, "i");

  const [producto, total] = await Promise.all([
    Producto.find({
      nombre: regex,
      estado: true,
    })
      .skip(desde)
      .limit(limite)
      .populate("detalle", "nombre"),
    Producto.find({ nombre: regex }).countDocuments([]),
  ]);

  return res.json({ total: total, results: producto });
};

module.exports = { buscarProducto };
