import dbConnect from '../../../utils/dbConnect';
import WineRack from '../../../src/models/WineRack';

dbConnect()

export default async (req, res) => {
  const { 
    query: { id }, 
    method 
  } = req;

  switch(method) {
    case 'GET':
      try {
        const rack = await WineRack.findById({});

        if (!rack) {
        return res.status(400).json({ success: false })
        }

        res.status(200).json({ success: true, data: rack})
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break;

    case 'PUT':
      try {
        const updatedRack = await WineRack.findByIdandUpdate(id, req.body, {
          new: true,
          runValidators: true
        });

        if (!updatedRack) {
          return res.status(400).json({ success: false })
          }

        res.status(200).json({ success: true, data: updatedRack })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break;

    case 'DELETE': 
      try {
        const deletedRack = await WineRack.deleteOne({ _id: id })

        if (!deletedRack) {
          return res.status(400).json({ success: false})
        }

        res.status(200).json({ success: true, data: deletedRack })
      } catch (error) {
        res.status(400).json({ success: false})
      }

    default:
      res.status(400).json({ success: false })
      break;
  }

}