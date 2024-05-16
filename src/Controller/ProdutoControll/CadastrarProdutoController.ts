const ProdutoModel = require('../../Schemas/ProdutoSchemas');
const CategoriaModel = require('../../Schemas/CategoriaSchemas');
import mongoose from "mongoose";

export const CadastrarProduto = async (req, res) => {
  const { nameProduto, price, categoria, estoque, estatus, codigoBarras, codigoInterno, descriptions, promotionPrice } = req.body;
 const produtoEntidade = {
    nameProduto,
    price,
    promotionPrice: promotionPrice ? 0 : 0, 
    categoria,
    estoque,
    estatus,
    codigoBarras,
    codigoInterno,
    descriptions: descriptions ? 'descriptions teste' : descriptions,
  };
  try {
    const produto = new ProdutoModel(produtoEntidade);
    await produto.save();

    // Adiciona o ID dos produtos à array de produtos na Categoria
    await CategoriaModel.findByIdAndUpdate(
      categoria,
      { $push: { produtos: produto._id } }, // Assumindo que a array se chama 'produtos'
      { new: true }
    );
      mongoose.connection.close();
      return res.status(200).json({ msg: 'Produto cadastrado', produto });
  } catch (error) {
    return res.status(400).json({ msg: 'Erro ao cadastrar produto', error });
  }
};
