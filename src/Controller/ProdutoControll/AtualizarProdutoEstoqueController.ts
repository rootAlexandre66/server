const ProdutoModel = require('../../Schemas/ProdutoSchemas');
const CategoriaModel = require('../../Schemas/CategoriaSchemas');
import mongoose from "mongoose";

export const AtualizarProdutoEstoque = async (req, res) => {
  const { estoque, codigoBarras, categoriaId, produtoId } = req.body;

  const produtoEntidade = {
    estoque,
    codigoBarras,
  };

  try {
    // Update the product
    const updatedProduto = await ProdutoModel.findByIdAndUpdate(
      produtoId,
      produtoEntidade,
      { new: true }
    );

    if (!updatedProduto) {
      return res.status(404).json({ msg: 'Produto não encontrado' });
    }

    // Update the product within the categoria's produtos array
    const updatedCategoria = await CategoriaModel.findOneAndUpdate(
      { 
        
        _id: categoriaId, 'produtos._id': produtoId },
      {
        $set: {
          'produtos.$.estoque': estoque,
          'produtos.$.codigoBarras': codigoBarras,
        },
      },
      { new: true }
    );

    if (!updatedCategoria) {
      return res.status(404).json({ msg: 'Categoria não encontrada ou produto não pertence à categoria' });
    }

    mongoose.connection.close();

    return res.status(200).json({ msg: 'Produto e categoria atualizados', produto: updatedProduto, categoria: updatedCategoria });
  } catch (error) {
    return res.status(400).json({ msg: 'Erro ao atualizar produto e categoria', error });
  }
};

