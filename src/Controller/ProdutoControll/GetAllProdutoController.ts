const ProdutoModel = require('../../Schemas/ProdutoSchemas')

const CategoriaModel = require('../../Schemas/CategoriaSchemas')

export const allProdutosForData = async (req, res) => {
  const { dataInicial,dataFinal, offset, limit } = req.query;
  // Verifique se offset e limit são inteiros
  const parsedOffset = parseInt(offset, 10);
  const parsedLimit = parseInt(limit, 10);

  if (isNaN(parsedOffset) || isNaN(parsedLimit)) {
    return res.status(400).json({ message: 'offset e limit devem ser números inteiros' });
  }
  try {
    const dataInicialDate = new Date(dataInicial);
    const dataFinalDate = new Date(dataFinal);


    // Adicione lógica de paginação usando skip e limit
    const allProdutos = await ProdutoModel
      .find({
        update_at: {
          $gte: dataInicialDate,
          $lt: dataFinalDate
        }
      })
      .skip(parsedOffset)
      .limit(parsedLimit);

    if (allProdutos.length === 0) {
      return res.status(200).json({ message: 'Nenhum produto encontrado' });
    }

    res.status(200).json(allProdutos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor' }, error.code);
  }
};

export const allProduto = async (req, res) => {
  try {


    let allProdutos = await ProdutoModel.find();

    if (!allProdutos) {
      return res.status(200).json({ message: 'No allProdutos found' });
    }
    res.status(200).json(allProdutos);

  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}
export const allProdutos = async (req, res) => {
  const { offset, limit ,startDate,endDate} = req.query;
  try {
    // Verifique se offset e limit são inteiros
    const parsedOffset = parseInt(offset, 10);
    const parsedLimit = parseInt(limit, 10);

    if (isNaN(parsedOffset) || isNaN(parsedLimit)) {
      return res.status(402).json({ message: 'offset e limit devem ser números inteiros' });
    }
    if (!startDate || !endDate) {
      return res.status(402).json({ message: 'data inicial ou endDate obrigatorio' });
    }
    // Assumindo que você tem um campo "update_at" no seu modelo
    //const data = new Date('2023-10-07')
    // Use o método find() do Mongoose para buscar documentos
    const allProdutos = await ProdutoModel.find({
      update_at: { $gte: startDate }
    })
      .limit(parsedLimit)
      .skip(parsedOffset)
      .exec();
    
      if (!allProdutos || allProdutos.length === 0) {
        return res.status(200).json({ message: 'Nenhum produto encontrado' });
      }
      

      return res.status(200).json(allProdutos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};


