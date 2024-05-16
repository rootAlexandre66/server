
const CategoriaModel = require('../../Schemas/CategoriaSchemas')
const PlaceModel = require('../../Schemas/PlaceSchemas')


export async function removeCategoria(req, res) {
  try {
    const { nomeCategoria, placeId } = req.body;

    // Check if the category exists
    const categoriaExist = await CategoriaModel.deleteOne({ nomeCategoria });

    if (!categoriaExist) {
      return res.status(400).json({ msg: 'Categoria não existe' });
    }
    // Remove the category ID from the categorias array in the Place model
    const place = await PlaceModel.findByIdAndUpdate(
      placeId,
      { $pull: { categorias: categoriaExist._id } }, // Use $pull to remove specific item from array
      { new: true }
    );
    return res.status(200).json({ msg: 'Categoria removida com sucesso', place });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
}

  