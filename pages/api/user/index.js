import nextConnect from 'next-connect';
import middleware from '../../../src/middleware/middleware';
import { extractUser } from '../../../utils/api-helpers';
import WineRack from '../../../src/models/WineRack'

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => res.json({ user: extractUser(req) }));

handler.patch(async (req, res) => {
  if (!req.user) {
    req.status(401).end();
    return;
  }

  let rowArray = []
  let columnArray = []
  for (let i = 1; i <= req.body.rows; i++) {
    rowArray.push(i)
  }
  for (let i = 1; i <= req.body.columns; i++) {
    columnArray.push(i)
  }
  console.log(req.user)
  console.log(req.body)

  const newRack = await WineRack.create({
    label: req.body.label,
    rows: rowArray,
    columns: columnArray
  });

  const { name, bottles, wineracks } = req.body;
  await req.db.collection('users').updateOne(
    { _id: req.user._id },
      { $push: { wineracks: newRack } },
      { new: true, useFindAndModify: false },
  );
  res.json({ user: { name, bottles, wineracks } });
});

export default handler;

