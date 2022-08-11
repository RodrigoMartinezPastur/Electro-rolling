const { request, response } = require("express");
const Compras = require("../models/compras");

const compraGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;

  const compras = await Compras.find({ estado: true })
    .limit(limite)
    .skip(desde)
    .populate("usuario", "nombre email");

  const total = await Compras.countDocuments({ estado: true });

  res.status(200).json({
    total,
    compras,
  });
};

const compraPost = async (req = request, res = response) => {
  const { id } = req.params;
  const compras = new Compras({
    usuario: req.usuario._id,
    producto: id,
  });

  await compras.save();

  res.json({
    compras,
  });
};

module.exports = {
  compraGet,
  compraPost,
};
