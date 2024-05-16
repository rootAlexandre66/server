import { FindOneCategoria } from "./FindOneCategoria";

const CategoriaModel = require('../../Schemas/CategoriaSchemas')
const PlaceModel = require('../../Schemas/PlaceSchemas')

export async function FindAllCategorias(req, res) {
  const { placeId } = req.params;
  try {
    // Find the specific place by ID
    const place = await PlaceModel.findOne({_id:placeId});

    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }
    // Find categories associated with the place
    const categoriaId =  await place.categorias
    
    const categoria = await CategoriaModel.find({_id:categoriaId.map((id:any)=>{return id})}).limit(25);;

    if (!categoria || categoria.length === 0) {
      return res.status(200).json({ message: 'No categories found for the place', place });
    }

    return res.status(200).json( categoria );
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
}
