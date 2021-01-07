import nextConnect from 'next-connect';
import middleware from '../../../src/middleware/middleware';
import { extractUser } from '../../../utils/api-helpers';
import WineRack from '../../../src/models/WineRack';
import Bottle from '../../../src/models/Bottle';
const ObjectId = require('mongodb').ObjectId;

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
  
    const newRack = {
      label: req.body.label,
      rows: rowArray,
      columns: columnArray,
      bottles: []
    };
    
    await req.db.collection('wineracks').insertOne(newRack);
  
    await req.db.collection('users').updateOne(
      { _id: req.user._id },
        { $push: { wineracks: newRack } },
        { new: true, useFindAndModify: false },
    );
    res.json(req.user);

  } else if (req.body.isBottle) {
    console.log(req.body)

    const newBottle = {
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
    };

    await req.db.collection("bottles").insertOne(newBottle);
  
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

  } else {
    console.log(req.body)
    const bottles = await req.db.collection('users').find(
      { _id: req.user._id, "bottles.name" : req.body.param }
    );
    console.log(bottles)
    res.send(bottles);
  }
});

handler.delete( async (req, res) => {
  if (!req.user) {
    req.status(401).end();
    return;
  }

  if (req.body.label) {
    console.log(req.body)
    
    await req.db.collection('wineracks').deleteOne(
      { _id: new ObjectId(req.body._id) }
   )
  
    await req.db.collection('users').updateOne(
      { _id: req.user._id },
      { $pull: { wineracks: { _id: new ObjectId(req.body._id) } } }
    );
    res.send("Winerack deleted from user.")

  } else if (req.body.isBottle) {
    console.log(req.body)

    await req.db.collection("bottles").deleteOne(
      { _id: new ObjectId(req.body._id) }
    );
  
    await req.db.collection('users').updateOne(
      { _id: req.user._id },
      { $pull: { bottles: { _id: new ObjectId(req.body._id) } } }    
      );

    await req.db.collection('users').updateOne(
      { _id: req.user._id, "wineracks.label": req.body.rack },
      { $pull: { "wineracks.$.bottles" : { _id: new ObjectId(req.body._id) } } }
    );
    res.json(req.user);

  } 
});

export default handler;

