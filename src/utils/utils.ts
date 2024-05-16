import { IUser } from "../interfaces/IUser";
const log4js = require('log4js')
const xlsxFile = require('read-excel-file/node');

const XLSX = require('xlsx')
const { exec } = require('child_process'); // Importa o módulo 'child_process' para executar comandos do sistema

export const validarObjetoNameAndSenha = async (obj: IUser): Promise<boolean> => {
  const { Username, senha, email, cpfUser } = obj
  if (!Username || !senha || !email || !cpfUser) {
    throw new Error("insira todos as informações por favor");
  }
  return false;
}


export const HandlerError = async () => {
  log4js.configure({
    appenders: {
      console: { type: 'console' },
      file: { type: 'file', filename: 'app.log' },
    },
    categories: {
      default: { appenders: ['console', 'file'], level: 'error' },
    },
  });

}

export const readFileSistem = async (filename: string): Promise<[] | any> => {
  try {
    const workbook = XLSX.readFile(filename);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    const nonEmptyRows = rows.filter(row => row.some(cell => cell !== null && cell !== ''));
    const dataRows = nonEmptyRows.slice(1);

    return dataRows;
  } catch (error) {
    console.log('error', error)
  }
}
export const cretedEntidatyProduct = async (filename: string): Promise<[] | any> => {
  try {
    const dataRows = await readFileSistem(filename);
    const itensResolved = []
    let executions = 0;
    for (const rowData of dataRows) {
      executions++
      const [codigoBarras, codigoInterno, nameProduto, price, estoque, estatus] = rowData;
      const produtoEntidade = {
        nameProduto,
        price,
        promotionPrice: price ? 0 : 0,
        categoria: process.env.CATEGORIAID,
        estoque,
        estatus: estoque > 0 ? 'ATIVO' : 'OCULTO',
        codigoBarras,
        codigoInterno,
      };
      itensResolved.push(produtoEntidade)
    }
    return itensResolved;

  } catch (error) {
    console.log('error', error)
  }

}


export async function calcularValorPedido(pedidos:any):Promise<Number> {
  // Check if userId is provided
    const soma = await pedidos.map((valor) => { return valor.price })
    const initialValue = 0;
    const sumWithInitial = soma.reduce((accumulator, currentValue) => accumulator + currentValue,
      initialValue,
    );
  return sumWithInitial ;
  }
  