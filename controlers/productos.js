const { request, response } = require("express");

const Producto = require("../models/producto");

// traer todos los productos
const productoGet = async (req = request, res = response) => {
  const { limite = 15, desde = 0 } = req.query;

  const [producto, total] = await Promise.all([
    Producto.find({ estado: true }).skip(desde).limit(limite),
    Producto.countDocuments({ estado: true }),
  ]);

  res.status(200).json({ total, producto });
};

// traer producto por id

const productoPorId = async (req = request, res = response) => {
  const { id } = req.params;

  const producto = await Producto.findById(id);

  if (producto.estado !== true) {
    return res
      .status(400)
      .json({ msg: "este Producto no se encuentra disponible" });
  }

  res.status(200).json({ producto });
};

//TENGO QUE GENERAR OTRO TOKEN MAS PARA GUARDAR LOS DATOS?   PARA GUARDAS LOS DATOS DE NOMBRE, PRECIO,DETALLE,CATEGORIA PARA QUE PUEDAN TERMINAR EN EL COMPRAR
const productoPost = async (req = request, res = response) => {
  const { nombre, img, precio, detalle, categoria } = req.body;

  const producto = new Producto({ nombre, img, precio, detalle, categoria });

  await producto.save();

  res.json({ producto });
};

// acutalizar
const produtosPut = async (req = request, res = response) => {
  const { id } = req.params;
  const { nombre, img, precio, detalle, categoria } = req.body;

  const datos = {
    nombre,
    img,
    precio,
    detalle,
    categoria,
  };

  const productos = await Producto.findByIdAndUpdate(id, datos, { new: true });

  res.json({ msg: "producto actualizado", productos });
};

// incactivar
const productoDelete = async (req = request, res = response) => {
  const { id } = req.params;

  const productoInactivado = await Producto.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json({ msg: "Producto Inactivado", productoInactivado });
};

module.exports = {
  productoGet,
  productoPost,
  productoPorId,
  produtosPut,
  productoDelete,
};
