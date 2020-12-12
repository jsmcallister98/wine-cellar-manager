import dbConnect from '../../../utils/dbConnect';
import Bottle from '../../../src/models/Bottle';

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch(method) {
    case 'GET': 
      try {
        const bottles = await Bottle.find({});

        res.status(200).json({ success: true, data: bottles })
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
      
    case 'POST':
      try {
        console.log(req.body)
        const bottle = await Bottle.create(req.body.newBottle);

        res.status(201).json({ success: true, data: bottle })
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
