import nextConnect from 'next-connect';
import middleware from '../../../src/middleware/middleware';
import { extractUser } from '../../../utils/api-helpers';
import WineRack from '../../../src/models/WineRack';
import Bottle from '../../../src/models/Bottle';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => res.json({ user: extractUser(req) }));

handler.patch(async (req, res) => {
  if (!req.user) {
    req.status(401).end();
    return;
  }

  if (req.body.isWinerack) {
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
      columns: columnArray,
      bottles: []
    });
  
    await req.db.collection('users').updateOne(
      { _id: req.user._id },
        { $push: { wineracks: newRack } },
        { new: true, useFindAndModify: false },
    );
    res.json(req.user);

  } else if (req.body.isBottle) {
    console.log(req.user)
    console.log(req.body)
  
    const newBottle = await Bottle.create(req.body);
    console.log(newBottle)
  
    await req.db.collection('users').updateOne(
      { _id: req.user._id, "wineracks.label": req.body.rack },
        { $push: { "wineracks.$.bottles" : newBottle } },
        { new: true, useFindAndModify: false },
    );

    await req.db.collection('users').updateOne(
      { _id: req.user._id },
      { $push: { "bottles" : newBottle } },
      { new: true, useFindAndModify: false },
    );

    res.json(req.user);
  }
});

export default handler;

