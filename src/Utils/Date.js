import dayjs from "dayjs";

export const today = (format) => {
  return new dayjs().format(format || "DD MMM YYYY");
};

export const format = (format, time) => {
  return new dayjs(time).format(format || "DD MMM YYYY");
};

export default {
  format,
  today,
};
