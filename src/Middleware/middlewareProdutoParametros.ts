import { ERRO } from "../Controller/contants";
export async function ValidarParametrosOffsetLimit(req, res,next) {
    const {  offset, limit } = req.query
    if (!offset || limit) {
      return res.status(400).json({ message: ERRO.VALOR_NECESSARIO });
    }
    next();
}