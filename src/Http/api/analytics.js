import { Tecnotree, TecnotreeProduct } from './../axios';

const getKpi = async ({ duration }) => {
  return await Tecnotree.get(`/lead/getKpi/${duration}`)
    .then((res) => (res ? res.data : {}))
    .catch(() => {});

  // try {
  //   const response = await Tecnotree.get(`/lead/getKpi/${duration}`);
  //   return {
  //     data: response.data,
  //   };
  // } catch (err) {
  //   console.log(err);
  // }
};

const getRequestCountByStatus = async () => {
  let URL1 = '/partyInteractionManagement/v1/partyInteraction?status=pending';
  let URL2 =
    '/partyInteractionManagement/v1/partyInteraction?status=inProgress';
  let URL3 = '/partyInteractionManagement/v1/partyInteraction?status=draft';
  let URL4 = '/partyInteractionManagement/v1/partyInteraction?status=completed';

  const promise1 = TecnotreeProduct.get(URL1);
  const promise2 = TecnotreeProduct.get(URL2);
  const promise3 = TecnotreeProduct.get(URL3);
  const promise4 = TecnotreeProduct.get(URL4);

  return Promise.all([promise1, promise2, promise3, promise4]).then(
    (values) => {
      return values;
    }
  );
};

export default {
  getKpi,
  getRequestCountByStatus
};
