const clean = (object) => {
  let data = { ...object };

  // Object.entries(data).forEach(([key, value]) => {
  //   if (value && typeof value === 'object') {
  //     if (Object.keys(value).length === 0) {
  //       delete data[key];
  //     } else {
  //       data[key] = clean(value);
  //     }
  //   } else {
  //     if (!value) {
  //       delete data[key];
  //     } else {
  //       if (Array.isArray(value)) {
  //         data[key] = value.filter((d) => d);
  //       }
  //     }
  //   }
  // });

  return data;
};

export default {
  clean
};
