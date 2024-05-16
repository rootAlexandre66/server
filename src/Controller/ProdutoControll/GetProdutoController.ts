import { query } from "express";

const ProdutoModel = require('../../Schemas/ProdutoSchemas')

export const Produto = async (req, res) => {
  const { idObject } = req.params;

  try {
    console.log(idObject);
    // Adicione lógica de paginação usando skip e limit
    const Produto = await ProdutoModel
      .find({},{"nameProduto":1, "price":1, "estatus":1}).limit(1);
      const _id = Produto[0]._id;
      if (Produto.length <=0) {
      return res.status(200).json({ message: 'Nenhum produto encontrado' });
    }
        res.status(200).json({msg : `${req.url}?=id${_id}`, Produto});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor' }, error.code);
  }
}





