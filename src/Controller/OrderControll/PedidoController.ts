import { ERRO } from "../contants";
const OrderSchema = require('../../Schemas/PedidoSchemas')

const PlaceModel = require('../../Schemas/PlaceSchemas')

export async function OrderDatails(req, res) {
  const { placeId } = req.params;
  try {
    // Find the specific place by ID
    const place = await PlaceModel.findOne({_id:placeId});
    if (!place) {
      return res.status(404).json({ message: ERRO.PLACEID_NAO_EXISTE});
    }
    // Find categories associated with the place
    const pedidos =  await place
    
   // const ordem = await PlaceModel.find({_id:placeId.map((id:any)=>{return id})}).limit(25);;

    return res.status(200).json( pedidos.pedidos );
    
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
}


export async function OrderDatailsByorderId(req, res) {
  const { placeId, orderId } = req.params;
  try {
    console.log(placeId, orderId);
    const place = await PlaceModel.findOne({_id:placeId});
    if (!place) {
      return res.status(404).json({ message: ERRO.PLACEID_NAO_EXISTE});
    }
    const pedido =  await  OrderSchema.findOne({_id:orderId});
    return res.status(200).json( pedido );
    
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
}