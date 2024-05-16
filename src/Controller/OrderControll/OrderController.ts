const OrderSchema = require('../../Schemas/PedidoSchemas')
const PlaceModel = require('../../Schemas/PlaceSchemas')

import { ERRO } from "../contants";
const UserSchema = require('../../Schemas/UserSchemas'); // Update the path accordingly

export async function allOrders(req, res) {

  const { placeId } = req.params

  const { dataInicial, offset, limit } = req.query

  if (!placeId) {
    return res.status(400).json({ message: ERRO.PLACEID_NECESSARIO })
  }
  if (!offset) {
    return res.status(400).json({ message: 'offset e necessario' })
  }
  if (!limit) {
    return res.status(400).json({ message: 'limit e necessario' })
  }
  if (!dataInicial) {
    return res.status(400).json({ message: 'dataInicial e necessario' })
  }
  // Verifique se offset e limit são inteiros
  const parsedOffset = parseInt(offset, 10);
  const parsedLimit = parseInt(limit, 10);

  if (isNaN(parsedOffset) || isNaN(parsedLimit)) {
    return res.status(400).json({ message: 'offset e limit devem ser números inteiros' });
  }
  try {
    let allOrders = await OrderSchema.findAll()
    if (!allOrders) {
      return res.status(200).json({ message: 'No allProdutos found' });
    }
    res.status(200).json(allOrders);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }

}
export async function allOrdersStatusWaitngAcepted(req, res) {
  const { placeId } = req.params
  const {EventType} = req.query
  if (!placeId) {
    return res.status(400).json({ message: ERRO.PLACEID_NECESSARIO })
  }
  if (!EventType || !['PENDING', 'WAITING', 'APROVED'].includes(EventType)) {
    return res.status(400).json({ message: ERRO.STATUS_PEDIDO });
  }
  try {
    let allOrders = await OrderSchema.find({ statusPedido: EventType})
    console.log(allOrders);
    if (!allOrders) {
      return res.status(200).json({ message: 'No allProdutos found' });
    }
    res.status(200).json(allOrders);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }

}
// Assuming you have a UserSchema
export async function insertPedido(req, res) {
  const { userId, produtos=[], statusPedido, placeId} = req.body;
  // Check if userId is provided
  if (!userId) {
    return res.status(400).json({ message: 'userId is required' });
  }
  if(!placeId){
    return res.status(400).json({ message: 'placeId is required' });

  }
  try {
    // Check if the user with the given userId exists
    const user = await UserSchema.findById(userId);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    const soma = await produtos.map((valor) => { return valor.price })
    const initialValue = 0;
    const sumWithInitial = soma.reduce((accumulator, currentValue) => accumulator + currentValue,
      initialValue,
    );
    
    const orderEntidade = {
      user: userId,
      pcr_final: sumWithInitial,
      produtos: produtos,
      statusPedido: statusPedido,
    };
    const order = new OrderSchema(orderEntidade);
    await order.save();
    // Update the user document to associate the order
    await UserSchema.findByIdAndUpdate(
      userId,
      { $push: { pedidos: order.id } },
      { new: true }
    );
 await PlaceModel.findByIdAndUpdate(
  
      placeId,
      { $push: { pedidos: order._id } },

      { new: true }
    );
    await OrderSchema.findByIdAndUpdate(
      placeId,
      { $push: { p: order._id } },

      { new: true }
    );
    return res.status(200).json({ msg: 'Pedido lançado com sucesso', order });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ msg: 'Erro ao lançar o pedido', error });
  }
}
//TODO refatorar o codigo para fazer oepraçøes com mais funcoes 
export async function insertPedidoIntegration(req, res) {
  const { userId, produtos=[], statusPedido, placeId,valorOrdem} = req.body;
  // Check if userId is provided
  if (!userId || !valorOrdem) {
    return res.status(400).json({ message: 'userId is required ou value of Order' });
  }
  if(!placeId){
    return res.status(400).json({ message: 'placeId is required' });

  }
  try {
    // Check if the user with the given userId exists
    const user = await UserSchema.findById(userId);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    const orderEntidade = {
      user: userId,
      pcr_final: valorOrdem,
      produtos: produtos,
      statusPedido: statusPedido,
    };
    const order = new OrderSchema(orderEntidade);
    await order.save();
    // Update the user document to associate the order  
    await UserSchema.findByIdAndUpdate(
      userId,
      { $push: { pedidos: order.id } },
      { new: true }
    );
    await PlaceModel.findByIdAndUpdate(
  
      placeId,
      { $push: { pedidos: order._id } },

      { new: true }
    );


    await OrderSchema.findByIdAndUpdate(
      placeId,
      { $push: { p: order._id } },

      { new: true }
    );
    return res.status(200).json({ msg: 'Pedido lançado com sucesso', order });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ msg: 'Erro ao lançar o pedido', error });
  }
}