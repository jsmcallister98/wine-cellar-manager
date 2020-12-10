import dbConnect from '../../../utils/dbConnect';
import Bottle from '../../../src/models/Bottle';

dbConnect();

export default async (req, res) => {
  const { 
    query: { id },
    method
  } = req;

  switch(method) {
    case 'GET':
      try {
        const bottle = await Bottle.findById(id);

        if (!bottle) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({success: true, data: bottle });
      } catch (error) {
        return res.status(400).json({ success: false });
      }
      break;
    
    case 'PUT':
      try {
        const bottle = await Bottle.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        });

        if (!bottle) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({success: true, data: bottle });
      } catch (error) {
        return res.status(400).json({ success: false });
      }
      break;

    case 'DELETE': 
      try {
        const deletedBottle = await Bottle.deleteOne({ _id: id });

        if (!deletedBottle) {
          return res.status(400).json({ success: false})
        }

        res.status(200).json({success: true, data: {} });
      } catch (error) {
        return res.status(400).json({ success: false });
      }
      break;
      
    default:
      return res.status(400).json({ success: false });
      break;
  }
}