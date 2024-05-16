


const PlaceModel = require('../../Schemas/PlaceSchemas')

export async function Places(req, res) {
    try {
      const place = await PlaceModel.find();
  
      if (!place) {
        return res.status(404).json({ message: 'Place not found' });
      }
  
      return res.status(200).json( place );
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  }