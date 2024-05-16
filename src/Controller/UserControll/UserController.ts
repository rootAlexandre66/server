import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { DADOS_NAO_FORNECIDO, ERRO, SAUDACAO, SUCESSO } from '../contants';
import { Nodemailer } from '../../utils/nodemailerSend';
import { User } from './User';
import { IUser } from '../../interfaces/db.interface';
const UserModel = require('../../Schemas/UserSchemas');

export const getAllUsers = async (req, res) => {
  try {
    const allUsers: IUser[]= await UserModel.find();

    if (!allUsers) {
      return res.status(404).json({ message: 'Nenhum usuário encontrado.' });
    }

    return res.status(200).json(allUsers);
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

export const BuscarUsuario = async (req, res) => {
  const { id } = req.query;
  if (typeof id !== 'string' || id.length <=0){
    return res.status(404).json({ message: 'No user found' });

  }
  try {
    let user = await UserModel.findOne({ _id: id });
    if (!user) {
      return res.status(200).json({ message: 'No user found' });
    }
    res.status(200).json({ user, url: req.originalUrl, path: req.path });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
export const AtualizarNomeUsuario = async (req, res) => {
  const { id } = req.query;
  const { nome } = req.body;
  try {
    let UsuarioAtualizado = await UserModel.findOneAndUpdate(
      { _id: id },
      { nome },
      { new: true }
    );
    if (!UsuarioAtualizado) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ UsuarioAtualizado });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const registerUser = async (req, res) => {
  const { name, email, senha, cpf } = req.body;
  if (!senha || !email|| !name|| !cpf) {
    return res.status(422).json({ msg: ERRO.VALOR_NECESSARIO });
  }
  const userExist = await UserModel.findOne({ email: email });
  console.log(userExist);
  if (!userExist) {
    const salt = await bcrypt.genSalt(10);
    const has = jwt.sign(senha, salt);
    try {
      const data = new User( name, senha, email, cpf );
      data.setSenha(has);
      console.log(data)
      const user = new UserModel({ name, senha: has, email, cpf });
      user.save();
      Nodemailer.sendEmail(SAUDACAO[0].toString(), SAUDACAO[1].toString());
      return res.status(200).json({ msg: SUCESSO.USUARIO_CADASTRADO_COM_SUCESSO });
    } catch (error) {
      throw new Error(`ocorreu um error ${error}`);
    }
  } else {
    return res.status(403).json({ msg: SUCESSO.USUARIO_JA_CADASTRADO });
  }
};
export const login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) {
      return res.status(422).json({ msg: 'Email e senha são necessários' });
    }
    const userExist = await UserModel.findOne({ email: email });

    if (userExist) {
      const senhaDecode = jwt.decode(userExist.senha);
      if (senha === senhaDecode) {
        return res.status(200).json({ msg: 'acesso autorizado', userExist });
      } else {
        return res.status(401).json({ msg: 'Usuario ou  senha invalidos' });
      }
    } else {
      return res.status(500).json({ msg: 'Usuario nåo encontrado' });
    }
  } catch (error) {
    throw new Error(`Error 500 ${error}`);

    //return res.status(500).json({ msg: 'Erro interno do servidor' });
  }
};
