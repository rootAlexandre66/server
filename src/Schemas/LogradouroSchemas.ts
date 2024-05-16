import mongoose from "mongoose";
// Define schemas
const logradouroSchema = new mongoose.Schema({
  enderecoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Endereco' },
  rua: String,
  bairro: String,
  numero: Number,
});
const LogradouroModel = mongoose.model('Logradouro', logradouroSchema);


module.exports = LogradouroModel