
import mongoose from "mongoose";


const categoriaSchema = new mongoose.Schema({
  nomeCategoria: { type: String, unique: true },
  status: String,
  produtos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Produto' }],
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
  place: { type: mongoose.Schema.Types.ObjectId, ref: 'Place' },
});
const CategoriaeModel = mongoose.model('Categoria', categoriaSchema);

module.exports = CategoriaeModel