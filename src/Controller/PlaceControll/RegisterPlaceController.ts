const PlaceSchema = require('../../Schemas/PlaceSchemas')
import { ERRO, HORARIO } from '../contants';
import Jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const CategoriaModel = require('../../Schemas/CategoriaSchemas')
const PlaceModel = require('../../Schemas/PlaceSchemas')


export const registePlace = async (req, res) => {

  const { nomePlace, ramoAtuacao, cidade, senha } = req.body;

  if (!nomePlace) {
    return res.status(422).json({ msg: ERRO.VALOR_NOME_PLACE_NECESSÁRIO });
  }
  if (!ramoAtuacao) {
    return res.status(422).json({ msg: ERRO.VALOR_RAMO_ATUACAO_PLACE_NECESSÁRIO });
  }
  if (!cidade) {
    return res.status(422).json({ msg: ERRO.VALOR_CIDADE_PLACE_NECESSÁRIO });
  }
  const PlaceExist = await PlaceModel.findOne({ nomePlace: nomePlace });

  if (!PlaceExist) {
    try {
      let contaAtualizada = `${cidade} ${nomePlace}`;

      const salt = await bcrypt.genSalt(10);
      const has = Jwt.sign(nomePlace, salt);
      
      const user = new PlaceModel(
        { nomePlace,
          ramoAtuacao,
          cidade: cidade,
          conta: contaAtualizada,
          accessToken: null,
          senhaAcesso: has,
          QilIsAtivo: false,
          isAtivo: false,
          horarioFuncionamento:HORARIO
         });
      user.save();
      return res.status(200).json({ msg: 'Place cadastrado com sucesso', user });
    } catch (error) {
      console.log(error)
    }
  }
  else {
    return res.status(400).json({ msg: 'Verifique as informaçøes por favor' })
  }

};