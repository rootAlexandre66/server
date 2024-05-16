import { ERRO } from "../Controller/contants";

export async function ValidarParametrosInserPedidos(req, res,next) {
    const { idusuario, infoProducts = [] ,valor, statusPedido,placeid} = req.body;
    if (!placeid) {
      return res.status(400).json({ message: ERRO.PLACEID_NECESSARIO });
    }
    if (!idusuario) {
      return res.status(400).json({ message: ERRO.ID_NECESSARIO});
    }
    if (!infoProducts) {
      return res.status(400).json({ message: 'infoProdutos é necessário' });
    }
    if (!valor) {
      return res.status(400).json({ message: ERRO.VALOR_NECESSARIO });
    }
    if (!statusPedido) {
      return res.status(400).json({ message: ERRO.STATUS_PEDIDO});
    }
    next();
}