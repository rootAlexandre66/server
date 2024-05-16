
import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
    nomePlace: String,
    isAtivo: Boolean,
    conta: String,
    senhaAcesso:String,
    isAberto: Boolean,
    isFechado: Boolean,
    ramoAtuacao: String,
    QilIsAtivo:{require: true, type: Boolean},
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
    cidade: String,
    accessToken: String,
    horarioFuncionamento:Object
    ,
    pedidos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pedido' }],
    categorias: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Categoria' }],
  });
  const PlaceModel = mongoose.model('Place', placeSchema);

  module.exports = PlaceModel