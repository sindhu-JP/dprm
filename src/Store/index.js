import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';

import { Lob } from './Lob';
import { Auth } from './Auth';
import { Form } from './Form';
import { Alert } from './Alert';
import { Users } from './Users';
import { Leads } from './Leads';
import { Events } from './Events';
import { Master } from './Master';
import { Modals } from './Modals';
import { NewLead } from './NewLead';
import { Products } from './Products';
import { FieldData } from './FieldData';
import { dashboardData } from './Dashboard';
import { Contracts } from './contract';

import { persistAuth } from './subscriptions';
import { Hierarchy } from './Hierarchy';

import { Partners } from 'Store/Partners';
import { Reports } from './Reports';
import { Groups } from './Groups';
import { setWorkflowReducer } from './setWorkflowReducer';
import { TroubleTicket } from './TroubleTicket';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {Language} from './Language';
import {Appearance} from './Appearance';
import { PopupTable } from './PopupTable';

const history = createBrowserHistory();

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [
    'dashboardData',
    'Modals',
    'Contracts',
    'hierarchy',
    'leads',
    'Contracts',
    'Alert',
    'Users',
    'partners',
    'popupTable'
  ],

  whitelist: ['auth', 'master']
};

// const store = configureStore({
//   reducer: {
//     lobs: Lob.reducer,
//     auth: Auth.reducer,
//     form: Form.reducer,
//     alert: Alert.reducer,
//     users: Users.reducer,
//     leads: Leads.reducer,
//     events: Events.reducer,
//     master: Master.reducer,
//     modals: Modals.reducer,
//     newLead: NewLead.reducer,
//     products: Products.reducer,
//     partners:Partners.reducer,
//     fieldData: FieldData.reducer,
//     hierarchy:Hierarchy.reducer,
//     dashboardData:dashboardData.reducer,
//     contracts:Contracts.reducer,
//     Reports:Reports.reducer,
//     Groups:Groups.reducer,
//     setWorkflowReducer:setWorkflowReducer.reducer,
//     TroubleTicket:TroubleTicket.reducer

//   },
// });

const rootReducer = {
  lobs: Lob.reducer,
  auth: Auth.reducer,
  form: Form.reducer,
  alert: Alert.reducer,
  users: Users.reducer,
  leads: Leads.reducer,
  events: Events.reducer,
  master: Master.reducer,
  modals: Modals.reducer,
  newLead: NewLead.reducer,
  products: Products.reducer,
  partners: Partners.reducer,
  fieldData: FieldData.reducer,
  hierarchy: Hierarchy.reducer,
  dashboardData: dashboardData.reducer,
  contracts: Contracts.reducer,
  Reports: Reports.reducer,
  Groups: Groups.reducer,
  setWorkflowReducer: setWorkflowReducer.reducer,
  TroubleTicket: TroubleTicket.reducer,
  Language:Language.reducer,
  Appearance:Appearance.reducer,
  popupTable: PopupTable.reducer
};

const reducers = combineReducers(rootReducer);

const allReducers = (state, action) => {
  // if (action.type === 'dashboard/setLogout') {
  //   storage.removeItem('persist:root');
  //   return reducers(undefined, action);
  // }

  return reducers(state, action);
};

const persistedReducer = persistReducer(persistConfig, allReducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

let persistor = persistStore(store);

store.subscribe(() => {
  persistAuth({
    token: store.getState().auth.token,
    user: store.getState().auth.user,
    userGroups: store.getState().auth.userGroups
  });
});

export { history, persistor };
export default store;
