import dbConnect from '../../../utils/dbConnect';
import Bottle from '../../../src/models/Bottle';
import WineRack from '../../../src/models/WineRack';

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
        const newBottle = await Bottle.create(req.body.newBottle);

        const updatedRack = WineRack.findOneAndUpdate(
          { label: req.body.newBottle.rack },
          { $push: { bottles: newBottle } },
          { new: true, useFindAndModify: false }
        ).then()

        res.status(201).json({ success: true, data: newBottle })
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
