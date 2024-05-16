import mongoose from "mongoose";

import { uuid } from "uuidv4";

const pedidoSchema = new mongoose.Schema({
    codigoPedido: { type: String, default: uuid } || String,
    userId: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    pcr_final: Number,
    produtos: [{}],
    statusPedido: {
      type: String,
      enum: ['CREATED','PENDING', 'APPROVED','CANCELADE', 'UNATHORIZED','PREPARANDO','ENTREGUE', 'READFORPICKUP']
  },
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
    place: { type: mongoose.Schema.Types.ObjectId, ref: 'Place' },
  });
  
 
const PedidoModel = mongoose.model('Pedido', pedidoSchema);

module.exports = PedidoModel