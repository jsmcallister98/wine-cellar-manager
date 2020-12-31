import nextConnect from 'next-connect';
import middleware from '../../../src/middleware/middleware';
import { extractUser } from '../../../utils/api-helpers';
import WineRack from '../../../src/models/WineRack';
import Bottle from '../../../src/models/Bottle';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => res.json({ user: extractUser(req) }));

handler.post( async (req, res) => {
  console.log(req.user)
  console.log(req.body)
  const bottles = await req.db.collection('bottles').find(
    { user: req.user._id, name : req.body.param }
  ).toArray();
  res.send(JSON.stringify(bottles));
});

export default handler;