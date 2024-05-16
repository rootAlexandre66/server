const PlaceModel = require('../../Schemas/PlaceSchemas');

export async function deletedplace(req, res) {
  const { placeId } = req.body;
  try {
    const result = await PlaceModel.deleteOne({ _id: placeId });

    if (result.deletedCount > 0) {
      return res.status(202).json({ message: 'Place removed' });
    } else {
      return res.status(404).json({ message: 'Place not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
}
