

const CategoriaModel = require('../../Schemas/CategoriaSchemas')

const PlaceModel = require('../../Schemas/PlaceSchemas')

export async function FindOneCategoria(req, res) {
  const { placeId,categoriaId } = req.body;
  try {
    // Find the specific place by ID
    const place = await PlaceModel.findOne({_id:placeId});
    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }
    const categoria = await CategoriaModel.find({_id:categoriaId});

    return res.status(200).json(categoria);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
}