const CategoriaModel = require('../Schemas/CategoriaSchemas')
const produtoModel = require('../Schemas/ProdutoSchemas');
import mongoose from "mongoose";
import { cretedEntidatyProduct, readFileSistem } from "../utils/utils";


export async function pesquisarProduto(codigoBarras: String) {
    try {
        const produto = await produtoModel.findOne({ codigoBarras });
        return produto == null ? false : true;
    } catch (error) {
        console.log("produto já cadastrado");
    }
}

export async function insertManyItems(filename: string) {
    try {
        const dataRows = await readFileSistem(filename);
        const createdProducts = [];
        let executions = 0;
        for (const rowData of dataRows) {
            executions++
            const [codigoBarras, codigoInterno, nameProduto, price, estoque, estatus] = rowData;
            const produtoEntidade = {
                nameProduto,
                price,
                promotionPrice: price ? 0 : 0,
                categoria: '65674464367e3aaa77437086',
                estoque,
                estatus: estoque > 0 ? 'ATIVO' : 'OCULTO',
                codigoBarras,
                codigoInterno,
            };
            const existeproduto = await produtoModel.findOne({ codigoBarras });
            if (existeproduto) { console.log('Produto já cadastrado') }
            else {
                const produto = new produtoModel(produtoEntidade);
                await produto.save();
                // Adiciona o ID dos produtos à array de produtos na Categoria
                await CategoriaModel.findByIdAndUpdate(
                    produtoEntidade.categoria,
                    { $push: { produtos: produto._id } }, // Assumindo que a array se chama 'produtos'
                    { new: true }
                );
                console.log(`UNIDADE ${executions} PROCESSADA \n `)
                console.log(`${produtoEntidade.nameProduto}`)
                createdProducts.push(produto);
            }
        }
        mongoose.connection.close();

    } catch (error) {
        console.log('error', error)
    }
}
export async function insertManyItemsTest(filename: string) {
    try {
        
        const createdProducts = [];
        const resolveDataRows = await cretedEntidatyProduct(filename);
        let count = 0 ;
        for (const rowData of resolveDataRows) {
        const {codigoBarras}  = rowData
        const existeproduto = await produtoModel.findOne({ codigoBarras});
        if (existeproduto) { console.log('Produto já cadastrado ' +  count, existeproduto) }
        else {
            const produto = new produtoModel(rowData);
            await produto.save();
            // Adiciona o ID dos produtos à array de produtos na Categoria
            await CategoriaModel.findByIdAndUpdate(
                resolveDataRows.categoria,
                { $push: { produtos: produto._id } }, // Assumindo que a array se chama 'produtos'
                { new: true }
            );
            console.log(`UNIDADE ${rowData} PROCESSADA \n `)
            console.log(`${rowData.nameProduto}`)
            createdProducts.push(produto);
            insertManyItemsTest(filename)

            
        }
        count++

    }
    mongoose.connection.close();

    } catch (error) {
        console.log('error', error)
    }

}