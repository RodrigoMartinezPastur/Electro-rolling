const { request, response } = require("express");
const Favoritos = require("../models/favoritos");

const favoritosPost = async (req = request, res = response) => {
  const { id } = req.params;
  const favorito = new Favoritos({
    producto: id,
  });

  await favorito.save();

  res.json({
    favorito,
  });
};

module.exports = { favoritosPost };
