import nextConnect from 'next-connect';
import middleware from '../../src/middleware/middleware';
import { extractUser } from '../../utils/api-helpers';

const handler = nextConnect();
handler.use(middleware);
handler.get(async (req, res) => res.json({ user: extractUser(req) }));

export default handler;

