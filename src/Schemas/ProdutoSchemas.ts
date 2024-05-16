const mongoose = require('mongoose');

// Define schemas
const produtoSchema = new mongoose.Schema({
  price: Number,
  promotionPrice: {type:Number, require:false},
  descriptions: {type:String, require:false},
  nameProduto: String,
  codigoBarras: { type: String, unique: true ,
  required: false,
  },
  codigoInterno: { type: String, unique: true ,
  required: false,
  },
  estatus: {type:String, require:false},
  estoque: {type:Number, require:false},
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
  categoria: { type: mongoose.Schema.Types.ObjectId, ref: 'Categoria' },
});
const produtoModel = mongoose.model('Produto', produtoSchema);
//pedidos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pedido' }],

module.exports = produtoModel
