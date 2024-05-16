const OrderSchema = require('../../Schemas/PedidoSchemas')
const PlaceModel = require('../../Schemas/PlaceSchemas')

const UserSchema = require('../../Schemas/UserSchemas'); // Update the path accordingly


// Assuming you have a UserSchema
export async function updateOrder(req, res) {
  const {statusPedido, orderId} = req.body;
  // Check if userId is provided
  if (!statusPedido) {
    return res.status(400).json({ message: 'status is required' });
  }
  if(!orderId){
    return res.status(400).json({ message: 'orderId is required' });

  }
  try {
    // Check if the user with the given userId exists
    const user = await OrderSchema.findById(orderId);
    if (!user || !statusPedido) {
      return res.status(400).json({ message: 'User not found' });
    }
    
    
    await OrderSchema.findByIdAndUpdate(
      orderId,
      { $set: { statusPedido:statusPedido } },
       { timestamps: false },
      { new: true }
    );
    return res.status(200).json({ msg: 'Ordem atualizada sucesso', orderId });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ msg: 'Erro ao atualizar o pedido', error });
  }
}

