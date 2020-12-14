import dbConnect from '../../../utils/dbConnect';
import WineRack from '../../../src/models/WineRack';

dbConnect()

export default async (req, res) => {
  const { method } = req;

  let rowArray = []
  let columnArray = []
  for (let i = 0; i < req.body.rows; i++) {
    rowArray.push(0)
  }
  for (let i = 0; i < req.body.columns; i++) {
    columnArray.push(0)
  }

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

        const newRack = await WineRack.create({
          label: req.body.label,
          rows: rowArray,
          columns: columnArray
        })

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