const validateEmailPhone = (value) => {
  const emailRegex =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  const phoneRegex = /^(\+91-|\+91|0)?\d{10}$/;
  const isValidEmail = emailRegex.test(value);
  const isValidPhone = phoneRegex.test(value);
  if (!isValidEmail && !isValidPhone) {
    return false;
  }
  if (isValidEmail) {
    return 'emailAddress';
  }
  if (isValidPhone) return 'number';
  return '';
};

const decimalService = (number, noofDecimal) => {
  const numbers = +number;
  return numbers.toFixed(noofDecimal);
};

const bytesToMbs = (bytes) => {
  return bytes / (1024 * 1000);
};

const capitalizeFirst = (string) => {
  let capitalized = '';

  if (string) {
    let parts = string.toLowerCase()?.split('');
    capitalized = parts[0].toUpperCase() + parts.splice(1).join('');
  }

  return capitalized;
};

export default {
  capitalizeFirst,
  validateEmailPhone,
  decimalService,
  bytesToMbs
};
