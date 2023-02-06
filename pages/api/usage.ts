import { getRequestCount } from '../../lib/firebase/admin';

export default async (req: any, res: any) => {
  const count = await getRequestCount();
  res.status(200).send({ count });
};