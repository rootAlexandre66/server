import { ERRO } from "../Controller/contants";
const PlaceModel = require('../Schemas/PlaceSchemas')

  export async function MiddlewareCheckedPlaceId(req, res, next) {
    const { placeId } = req.query;
    try {
      // Verificar se placeId é uma string válida ObjectId
      if (!/^[0-9a-fA-F]{24}$/.test(placeId)) {
        return res.status(400).json({ message: 'ID do place inválido' });
      }
      // Consultar o local no banco de dados
      const placeExiste = await PlaceModel.findOne({ _id: placeId });
      // Verificar se o local existe
      if (!placeExiste) {
        return res.status(404).json({ message: 'place não encontrado' });
      }
      // Se o local existir, continue para a próxima middleware ou rota
      next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
    export async function  MiddlewareCheckedCategoriaId(req,res,next){
      const {categoriaId} = req.query
        if(!categoriaId ){
          return res.status(400).json({ message: ERRO.CATEGORIAID_NECESSARIO })
        }
        next()
      } 