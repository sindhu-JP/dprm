import { i18n } from '@lingui/core';
const dynamicActivate = async (locale) => {
  const { messages } = await import(`../../locale/${locale}/messages`);
  i18n.load(locale, messages);
  i18n.activate(locale);
  let body = window.document.querySelector('body');
  body.setAttribute('dir', locale === 'ar' ? 'rtl' : 'ltr');
};

export default { dynamicActivate };