


const PlaceModel = require('../../Schemas/PlaceSchemas')

export async function AbrirPlace(req, res) {

  const { placeId } = req.body

  try {

    const placenewinfo = await PlaceModel.findByIdAndUpdate(
      placeId,
      {
        $set: {
          isAberto: true,
          isFechado: false,
        }
      },
      { new: true }
    );

    if (!placenewinfo) {

      return res.status(404).json({ message: 'Place not found' });
    }

    return res.status(200).json({ placenewinfo });

  } catch (error) {

    res.status(500).json({ message: 'Internal server error', error });

  }
}
export async function FecharPlace(req, res) {

  const { placeId } = req.body

  try {

    const placenewinfo = await PlaceModel.findByIdAndUpdate(
      placeId,
      {
        $set: {
          isAberto: false,
          isFechado:true
        }
      },
      { new: true }
    );

    if (!placenewinfo) {

      return res.status(404).json({ message: 'Place not found' });
    }

    return res.status(200).json({ placenewinfo });

  } catch (error) {

    res.status(500).json({ message: 'Internal server error', error });

  }
}
export async function AtivarPlace(req, res) {

  const { placeId } = req.body

  try {

    const placenewinfo = await PlaceModel.findByIdAndUpdate(
      placeId,
      {
        $set: {
          isAtivo: true,
        }
      },
      { new: true }
    );

    if (!placenewinfo) {

      return res.status(404).json({ message: 'Place not found' });
    }

    return res.status(200).json({ placenewinfo });

  } catch (error) {

    res.status(500).json({ message: 'Internal server error', error });

  }
}
export async function InativarPlace(req, res) {

  const { placeId } = req.body

  try {

    const placenewinfo = await PlaceModel.findByIdAndUpdate(
      placeId,
      {
        $set: {
          isAtivo: false
        }
      },
      { new: true }
    );

    if (!placenewinfo) {

      return res.status(404).json({ message: 'Place not found' });
    }

    return res.status(200).json({ placenewinfo });

  } catch (error) {

    res.status(500).json({ message: 'Internal server error', error });

  }
}
export async function ConfigurarHorarioPlace(id:string) {
  try {
    const horario = {
      "domingo": {
        "abertura01": "00:00",
        "fechamento01": "00:00",
        "abertura02": "00:00",
        "fechamento02": "00:00"
      },
      "segunda": {
        "abertura01": "00:00",
        "fechamento01": "00:00",
        "abertura02": "00:00",
        "fechamento02": "00:00"
      },
      "terca": {
        "abertura01": "00:00",
        "fechamento01": "00:00",
        "abertura02": "00:00",
        "fechamento02": "00:00"
      },
      "quarta": {
        "abertura01": "00:00",
        "fechamento01": "00:00",
        "abertura02": "00:00",
        "fechamento02": "00:00"
      },
      "quinta": {
        "abertura01": "00:00",
        "fechamento01": "00:00",
        "abertura02": "00:00",
        "fechamento02": "00:00"
      },
      "sexta": {
        "abertura01": "00:00",
        "fechamento01": "00:00",
        "abertura02": "00:00",
        "fechamento02": "00:00"
      },
      "sabado": {
        "abertura01": "00:00",
        "fechamento01": "00:00",
        "abertura02": "00:00",
        "fechamento02": "00:00"
      }
    }
    const placenewinfo = await PlaceModel.findByIdAndUpdate(
      id,
      {
        $set: {
          horarioFuncionamento: horario
        }
      },
      { new: true }
    );

    if (!placenewinfo) {

      return placenewinfo
    }

    return placenewinfo

  } catch (error) {

    console.log('error', error)

  }
}