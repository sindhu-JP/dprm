import update from 'update-immutable';
import statuses from 'lib/constants/statuses';
import config from 'config';

const getFetchdetails = (obj, location) => {
  let State = _.pick(
    location?.state?.selfcarePartnerObj.PartnerProfileCreation,
    ['SettlementRuleCreation']
  );
  let updateObj = update(obj.Search, {
    settlementPeriod: {
      $set: State?.SettlementRuleCreation?.Preferred_Settlement_Period
    }
  });
  return updateObj;
};
const _makeMaplist = (res) => {
  let fetchlist = [];
  if (res) {
    res[0].rowList.map((item) => {
      if (item) {
        res[0][item].map((list) => {
          fetchlist.push(list);
        });
      }
    });
  }

  return fetchlist;
};
const Opcochanges = () => {
  let opco = false;
  if (_.includes(statuses.OpcoStatus.Opco, config.appTheme)) {
    opco = true;
  }
  return opco;
};

const dateFormat = (FilterObj) => {
  if (FilterObj?.fromDate || FilterObj?.toDate) {
    if (FilterObj?.fromDate && FilterObj?.toDate) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
};

function getUpdatedURL(newQueryParams, AppendUrl) {
  let str = '';
  str = Object.entries(_.pickBy(newQueryParams, _.identity))
    .map(([key, val]) => `${AppendUrl}.${key}=${val}`)
    .join('&');
  return str;
}

const Opco = {
  Telco: ['FormFields'],
  moments: ['FormFields'],
  mtn: ['AgentCreation']
};
const opcoEnable = (code) => {
  let temp = [];
  let opco = ['Telco', 'moments', 'mtn'];
  if (_.includes(opco, config.dev.server?.isPermission)) {
    temp.push(...Opco[config.dev.server?.isPermission]);
  }

  if (_.includes(temp, code)) {
    return true;
  } else {
    return false;
  }
};

export default {
  getFetchdetails,
  _makeMaplist,
  Opcochanges,
  dateFormat,
  getUpdatedURL,
  opcoEnable
};
