import { Tecnotree } from './../axios';

const create = async (payload) => {
  return await Tecnotree.post('/event', payload).then((res) => res.data);
};

const get = async () => {
  return await Tecnotree.get('/event?limit=100&sort=-createdDate').then(
    (res) => res.data
  );
};

export default {
  get,
  create
};
