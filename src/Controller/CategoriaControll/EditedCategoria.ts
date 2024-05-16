
const CategoriaModel = require('../../Schemas/CategoriaSchemas')
const PlaceModel = require('../../Schemas/PlaceSchemas')



export async function EditCategoria  (req, res){
    const { nomeCategoria, placeId } = req.body;

    const categoriaExist = await CategoriaModel.findOne({ nomeCategoria });
  
    if (!categoriaExist) {
      try {
        const category = new CategoriaModel({ nomeCategoria, place: placeId });
        await category.save();
  
        // Adiciona o ID da categoria à array de categorias no Place
        await PlaceModel.findByIdAndUpdate(
  
          placeId,
          { $push: { categorias: category._id } },
  
          { new: true }
        );
  
        return res.status(200).json({ msg: 'Categoria cadastrada com sucesso' });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Erro ao cadastrar categoria' });
      }
    } else {
      return res.status(400).json({ msg: 'Categoria já existe' });
    }
  };
  