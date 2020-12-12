import dbConnect from '../../../utils/dbConnect';
import WineRack from '../../../src/models/WineRack';

dbConnect()

export default async (req, res) => {
  const { method } = req;

  switch(method) {
    case 'GET':
      try {
        const racks = await WineRack.find({});

        res.status(200).json({ success: true, data: racks})
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break;

    case 'POST':
      try {
        const newRack = await WineRack.create(req.body)

        res.status(200).json({ success: true, data: newRack })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break;

    default:
      res.status(400).json({ success: false })
      break;
  }

}