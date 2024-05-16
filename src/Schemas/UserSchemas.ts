
import mongoose ,{ Schema }from "mongoose";
import { IUserModel } from "../interfaces/db.interface";

const userSchema = new Schema<IUserModel>({
  email: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  cpf: { type: String, unique: true, required: true },
  senha: { type: String, required: true },
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
  pedidos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pedido' }],
  adress: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Endereco' }],
  secretKey: { type: String, required: false },
  token: { type: String, required: false },
});


  const UserModel = mongoose.model<IUserModel>('User', userSchema);

  // Exporte o modelo para ser utilizado em outras partes do seu código
  module.exports = UserModel;

