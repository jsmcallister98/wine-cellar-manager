import nextConnect from 'next-connect';
import middleware from '../../../src/middleware/middleware';
import { extractUser } from '../../../utils/api-helpers';
import WineRack from '../../../src/models/WineRack';
import Bottle from '../../../src/models/Bottle';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  try {
    const user = await req.db.collection("users").findOne(
      { _id: req.user._id }
    );
    if (!user) {
      res.send([]);
    }
    res.send(JSON.stringify(user.bottles));
  } catch (error) {
    console.log(error);
    return error;
  }
});

export default handler;