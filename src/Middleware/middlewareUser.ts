import { ERRO } from "../Controller/contants";
const validarCpf = require('validar-cpf');
export async function ValidarParametrosEmailUser(req, res,next) {
    const { email} = req.body;
    if (!email) {
      return res.status(400).json({ message: ERRO.EMAIL_NECESSARIO });
    }
    next();
}
export async function ValidarParametrosNomeUser(req, res,next) {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: ERRO.ID_USUARIO_NECESSARIO });
  }
  else if(name.length <=2){
    return res.status(400).json({ message: 'nome muito curto' });
  }
  next();
}
export async function ValidarParametrosSenhaUser(req, res,next) {
  const { senha} = req.body;
  if (!senha) {
    return res.status(400).json({ message: ERRO.ID_USUARIO_NECESSARIO });
  }
  else if(senha.length <=5){
    return res.status(400).json({ message: 'senha muito curta' });
  }
  next();
}
export async function ValidarParametrosCpfUser(req, res,next) {
  const { cpf} = req.body;
  if (!cpf) {
    return res.status(400).json({ message: ERRO.ID_USUARIO_NECESSARIO });
  }else if(!validarCpf(cpf)){
    return res.status(400).json({ message: ERRO.CPF_INVALIDO });

  }
  next();
}


export async function ValidarEntradoUsuario(req,res,next){
const {name,email,cpf,senha} = req.body
if (!email || !senha) {
  return res.status(422).json({ msg: 'Email e senha são necessários' });
}
const regexJavaScript = /(function|var|let|const)\s+[a-zA-Z_][a-zA-Z0-9_]*\s*=/g;

const regexHTML = /<[^>]*>/g;

const resultadoregexJavaScript = await Promise.all([  regexJavaScript.test(name),regexJavaScript.test(email),regexJavaScript.test(cpf),regexJavaScript.test(senha)]);
const resultadoregexregexHTML = await Promise.all([  regexHTML.test(name),regexHTML.test(email),regexHTML.test(cpf),regexHTML.test(senha)]);
console.log(resultadoregexJavaScript, resultadoregexregexHTML);

//if(resultadoregexJavaScript || resultadoregexregexHTML){
//return res.status(400).json({ message: ' informaçøes invalidas' });

//}
  next();
}