import { ERRO } from "../Controller/contants"
export const ValidarInfoProdutos = async (req, res, next) => {
  const { nameProduto, price, categoria, estoque, estatus, codigoBarras, codigoInterno, descriptions, placeId, promotionPrice } = req.body;
  if (!nameProduto || !price || !categoria) {
    return res.status(400).json({ message: ERRO.INFO_PLACE_NECESSARIA });
  }
  next()
}

export const MiddlewareValidarTokenAcess = async (req, res, next) => {
  const accessToken:string = req.headers.authorization; 
  const placeId:string = req.headers.placeid

  const type = accessToken.split(' ')[0]
  const token = accessToken.split(' ')[1]
  console.log(placeId)
  if (!token || type !== 'Basic') {
    return res.status(400).json({ message: ERRO.ACESS_TOKEN_NECESSARIO });
  }
    // Decodifica o token Base64
    //const decodedToken = JSON.parse(Buffer.from(accessToken, 'base64').toString('utf-8'));
    next()
    //return res.status(401).json({ message: ERRO.ACESS_TOKEN_INVALIDO });
}