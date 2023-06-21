// import React from 'react';
// import { Provider, useSelector } from 'react-redux';
// import DateFnsUtils from '@date-io/date-fns';

// import { ThemeProvider, CssBaseline } from '@material-ui/core';
// import { MuiPickersUtilsProvider } from '@material-ui/pickers';
// import 'antd/dist/antd.css';
// import store from 'Store';
// import Router from 'Router';
// import theme from '../public/theme/muiTheme';
// import I18nLanguege from 'Utils/I18n/Language';
// import { I18nProvider } from '@lingui/react';
// import { i18n } from '@lingui/core';
// const LanguageComp = () => {
//   const { language } = useSelector((state) => state.Language);
// console.log(language,'langg')
//   function getSelectedLanguage(language) {
//     console.log(language, 'heyoo');
//     // return 'ar' || 'en';
//     return language ||'ar';
//   }

//   /////////////
//   React.useEffect(() => {
//     I18nLanguege.dynamicActivate(getSelectedLanguage(language));
//   }, [language]);
//   const directions = language === 'ar' ? 'rtl' : 'ltr';
//   return (
//     <ThemeProvider theme={theme(directions, 'default')}>
//       <CssBaseline />
//       <MuiPickersUtilsProvider utils={DateFnsUtils}>
//         <I18nProvider i18n={i18n}>
//           {' '}
//           <Router />
//         </I18nProvider>
//       </MuiPickersUtilsProvider>
//     </ThemeProvider>
//   );
// };

// const App = () => {
//   return (
//     <React.Fragment>
//       <Provider store={store}>
//         {/* <PersistGate loading={null} persistor={persistor}> */}
//         <LanguageComp />
//         {/* </PersistGate> */}
//       </Provider>
//     </React.Fragment>
//   );
// };
// export default App;

import React from 'react';
import { Provider, useSelector } from 'react-redux';
import DateFnsUtils from '@date-io/date-fns';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
// import config from 'config';
// import store from '../src/redux/store';
import store from 'Store';
import 'antd/dist/antd.css';
// import { persistor } from '../src/redux/store';
import Router from './Router';
// import { theme } from '@tt-dcpq/dcpq-common-libs';
// import theme from '../public/theme/muiTheme';
// import theme from '../public/theme/muiTheme';
import { I18nProvider } from '@lingui/react';
import { i18n } from '@lingui/core';
import config from 'config';
// import theme from '../public/theme/muiTheme';
//  import store from 'Store'
// import catalogs from 'locale/en/messages.js';
// import { PersistGate } from 'redux-persist/integration/react';
// import 'antd/dist/antd.css';
import I18nLanguege from 'Utils/I18n/Language';
import { theme } from '@tt-dcpq/dcpq-common-libs';
const LanguageComp = () => {

  const [state, setState] = React.useState({
    show: false,
    showRightPane: true,
    language: null,
    catalogs: {},
    is360Loaded: false,
    customerCode: null
  });

  const { language } = useSelector((state) => state.Language);

  const { ThemeType } = useSelector((state) => state.Appearance);
  function getSelectedLanguage() {
    return language || 'en';
  }

  React.useEffect(() => {
    I18nLanguege.dynamicActivate(getSelectedLanguage(language));
  }, [language]);
  const directions = language === 'fa' ? 'rtl' : 'ltr';
  const varType = ThemeType !== 'dark' ? 'default' : ThemeType;
  return (
    <ThemeProvider  theme={theme(directions, varType, config.appTheme, ThemeType)}>
      <CssBaseline />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <I18nProvider i18n={i18n}>
          <Router />
        </I18nProvider>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};
const App = () => {
  React.useEffect(() => {
    const logo = {
      mtn: {
        name: 'mtn-logo-yellow',
        w: 110
      },
      stc: {
        name: 'stc-logo',
        w: 110
      },
      tecnotree: {
        name: 'tt-logo',
        favicon: 'tt-favicon',
        w: 110
      },
      zbahrain: {
        name: 'zbahrain-logo',
        w: 110
      },
      moments: {
        name: 'TT-Moments_Green',
        favicon: 'TT-Moments_Green',
        w: 110
      }
    };
    const {
      name,
      w = 51,
      h = 51,
      favicon = name
    } = logo[config.appTheme] || logo['tecnotree'];
    document.getElementById(
      'favicon'
    ).href = `${config.basePath}/assets/icons/${favicon}.svg`;
  }, []);
  return (
    <React.Fragment>
      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
        <LanguageComp />
        {/* </PersistGate> */}
      </Provider>
    </React.Fragment>
  );
};
export default App;
