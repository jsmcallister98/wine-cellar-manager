import nextConnect from 'next-connect';
import middleware from '../../../src/middleware/middleware';
import { extractUser } from '../../../utils/api-helpers';
import WineRack from '../../../src/models/WineRack';
import Bottle from '../../../src/models/Bottle';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const bottles = await req.db.collection("bottles").find().toArray();
  console.log(bottles)
  res.send(JSON.stringify(bottles));
});

export default handler;

// import dbConnect from '../../../utils/dbConnect';
// import Bottle from '../../../src/models/Bottle';
// import WineRack from '../../../src/models/WineRack';

// dbConnect();

// export default async (req, res) => {
//   const { method } = req;

//   switch(method) {

//     // case 'GET': 
//     //   try {
//     //     const bottles = await Bottle.find(
//     //       { _id: req.user._id }
//     //     );

//     //     res.status(200).json({ success: true, data: bottles })
//     //   } catch (error) {
//     //     res.status(400).json({ success: false });
//     //   }
//     //   break;
      
//     case 'POST':
//       try {
//         const newBottle = await Bottle.create(req.body);
//         console.log(req.body)
//         const updatedRack = WineRack.findOneAndUpdate(
//           { label: req.body.rack },
//           { $push: { bottles: newBottle } },
//           { new: true, useFindAndModify: false }
//         ).then()

//         res.status(201).json({ success: true, data: newBottle })
//       } catch (error) {
//         res.status(400).json({ success: false });
//       }
//       break;

//     default:
//       res.status(400).json({ success: false });
//       break;
//   }
// }
