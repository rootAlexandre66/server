const PlaceModel = require('../../Schemas/PlaceSchemas');

export async function GeneratePlaceTokenAcess(req, res) {
  const { placeId,nomeSistema } = req.body;
    const dados = {
      placeId,
      nomeSistema
    }
    const stringBase64 = Buffer.from(JSON.stringify(dados)).toString('base64');
    try {
      const place = await PlaceModel.findByIdAndUpdate(
        placeId,
        { $set: { accessToken: stringBase64,QilIsAtivo:true } },
        { new: true }
      );

    if (place) {
      return res.status(200).json({ local: place, mensagem: 'Registro atualizado com sucesso' });
    }
    return res.status(404).json({ mensagem: 'place não encontrado' });
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
}