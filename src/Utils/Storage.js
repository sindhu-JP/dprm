export const setItem = async (key, value) => {
  const keyType = typeof key;
  const valueType = typeof value;

  if (keyType !== 'string') {
    throw Error('No or invalid key provided.');
  }

  if (!valueType) {
    throw Error('No or invalid value provided.');
  }

  if (valueType === 'object') {
    await window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  }
  await window.localStorage.setItem(key, value);
};

export const getItem = async (key) => {
  const keyType = typeof key;

  if (keyType !== 'string') {
    throw Error('Invalid or no key provided.');
  }

  try {
    const item = await window.localStorage.getItem(key);
    if (item) {
      return item;
    } else {
      return undefined;
    }
  } catch (err) {
    return undefined;
  }
};
