import nextConnect from 'next-connect';
import middleware from '../../../src/middleware/middleware';
import { extractUser } from '../../../utils/api-helpers';
const ObjectId = require('mongodb').ObjectId;

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => res.json({ user: extractUser(req) }));

handler.post( async (req, res) => {
  const bottles = await req.db.collection('bottles').find(
    { user: req.user._id, name : req.body.param }
  ).toArray();
  res.send(JSON.stringify(bottles));
});

handler.patch( async (req, res) => {
  console.log(req.body)

  const updatedBottle = {
    _id: new ObjectId(req.body._id),
    name: req.body.name,
    type: req.body.type,
    price: Number(req.body.price),
    year: req.body.year,
    location: req.body.location,
    rack: req.body.rack,
    yPosition: Number(req.body.yPosition),
    xPosition: Number(req.body.xPosition),
    isBottle: true,
    user: req.user._id
  }

  await req.db.collection('bottles').updateOne(
    { _id: new ObjectId(req.body._id) }, 
    { $set: {
      yPosition: Number(req.body.yPosition),
      xPosition: Number(req.body.xPosition),
    }}
  );
  
  await req.db.collection('users').updateOne(
    { _id: req.user._id, "bottles._id": new ObjectId(req.body._id) },
    { $set: { "bottles.$": {
      _id: new ObjectId(req.body._id),
      name: req.body.name,
      type: req.body.type,
      price: Number(req.body.price),
      year: req.body.year,
      location: req.body.location,
      rack: req.body.rack,
      yPosition: Number(req.body.yPosition),
      xPosition: Number(req.body.xPosition),
      isBottle: true,
      user: req.user._id
    }
    }}  
    );

    res.json(req.user);
  });
  
  // await req.db.collection('users').updateOne(
  //   { _id: req.user._id, "wineracks.label": req.body.rack, "wineracks.$.bottles._id": req.body._id },
  //   { $set: {
  //     yPosition: Number(req.body.yPosition),
  //     xPosition: Number(req.body.xPosition),
  //   }}  
  //   );
export default handler;