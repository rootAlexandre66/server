
import { ERRO } from '../contants';
import Jwt from 'jsonwebtoken';
const PlaceModel = require('../../Schemas/PlaceSchemas')

export const loginPlace = async (req, res) => {
  try {
    const { conta, senha, nomePlace } = req.body;
    if (!conta || !senha || !nomePlace) {
      return res.status(422).json({ msg: 'Conta e senha são necessários' });
    }
    const placeExist = await PlaceModel.findOne({ conta: conta });

    if (placeExist) {
      const nomeContaCorresponde = placeExist.nomePlace
      const senhaconfere = Jwt.decode(placeExist.senhaAcesso);
      console.log(senhaconfere)
      if (nomePlace == nomeContaCorresponde) {
        if (senhaconfere == senha) {
          return res.status(200).json({ place: placeExist });

        } else {
          return res.status(500).json({ msg: 'Nome ou senha incorreta' });

        }
      } else {
        return res.status(500).json({ msg: 'Nome ou senha incorreta' });

      }
    }
    return res.status(500).json({ msg: 'Place nåo encontrado' });

  } catch (error) {
    return res.status(500).json({ msg: 'Erro interno do servidor' });
  }
} 