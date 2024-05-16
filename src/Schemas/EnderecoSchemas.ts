
import mongoose from "mongoose";

const enderecoSchema = new mongoose.Schema({
  cep: String,
  userId: Number,
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  logradouro: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Logradouro' }],
});
const EnderecoModel = mongoose.model('Endereco', enderecoSchema);

module.exports = EnderecoModel