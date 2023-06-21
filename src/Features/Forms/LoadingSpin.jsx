import { message } from 'antd';

message.config({
  duration: 0,
  maxCount: 1 

});

export const LoadingSpin = (isLoading, content, type) => {
  if (content && isLoading === false) {
    setTimeout(() => {
      if (type === 'error') {
        message.error(content, 2);
      } else {
        message.success(content, 2);
      }
    }, 100);
  }
  if (isLoading) {
    return message.loading(content ? content : 'Please wait loading...', 0);
  } else {
    return message.destroy();
  }
};
