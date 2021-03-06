import WineRack from '../../../src/models/WineRack';
import nextConnect from 'next-connect';
import middleware from '../../../src/middleware/middleware';
import { extractUser } from '../../../utils/api-helpers';

const handler = nextConnect();

handler.use(middleware);

export default async (req, res) => {
  const { method } = req;

  let rowArray = []
  let columnArray = []
  for (let i = 1; i <= req.body.rows; i++) {
    rowArray.push(i)
  }
  for (let i = 1; i <= req.body.columns; i++) {
    columnArray.push(i)
  }

  switch(method) {
    case 'GET':
      try {
        const racks = await WineRack.find({}).populate("bottles");

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
        });

        console.log(req.body)
        console.log(req)
        const updateUser = await req.db.collection('users').UpdateOne(
          { email: req.body.user },
          { $push: { wineracks: newRack } },
          { new: true, useFindAndModify: false }
        ).then();

        res.status(200).json({ success: true, data: newRack });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false })
      break;
  }

}