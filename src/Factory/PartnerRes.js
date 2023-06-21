import _ from 'lodash';
import config from 'config';

const makeInstallationAdress = (data) => {
  let temp = [];
  if (data) {
    _.map(data.contactMedium, (item) => {
      if (item.type === 'Address') {
        temp.push(item);
      }
    });
  }

  const fullAddress = {
    country: _.get(temp, '[0].medium.country', ''),
    state: _.get(temp, '[0].medium.stateOrProvince', ''),
    city: _.get(temp, '[0].medium.city', ''),
    addressLine: _.get(temp, '[0].medium.country', ''),
    streetName: _.get(temp, '[0].medium.streetName', ''),
    postcode: _.get(temp, '[0].medium.postcode', ''),
    type: _.get(temp, '[0].medium.type', ''),
    landmark: _.get(temp, '[0].medium.landmark', '')
  };

  return {
    address: fullAddress,
    formattedAddress: `${fullAddress.streetName}, ${fullAddress.country}, ${fullAddress.state}, ${fullAddress.city}, ${fullAddress.type} - ${fullAddress.postcode}, ${fullAddress.landmark}`
  };
};

const OwnerDetails = (data) => {
  let obj = {};

  _.map(data, (item) => {
    if (item.role === 'ProfileOwner') {
      const mobileobj = item.engagedParty?.contactMedium.find(
        (list) => list.medium.type === 'mobile'
      );
      const emailobj = item.engagedParty?.contactMedium.find(
        (list) => list.medium.type === 'emailAddress'
      );
      const whatsAppobj = item.engagedParty?.contactMedium.find(
        (list) => list.medium.type === 'whatsapp'
      );

      obj.name = item.name;
      obj.email = _.get(emailobj, 'medium.emailAddress', '');
      obj.whatsapp = _.get(whatsAppobj, 'medium.number', '');
      obj.mobile = _.get(mobileobj, 'medium.number', '');
      //  obj.mobile=mo
    }
  });
  return obj;
};

const DynamicMenulist = (menu, type) => {
  console.log(menu, 'meuxxxx', type);

  const validMenus = [];
  for (const [key, value] of Object.entries(menu)) {
    if (
      _.includes(value.valid, config.appTheme) &&
      _.includes(value.validator, type)
    ) {
      validMenus.push(value);
    }
  }

  return validMenus;
};

export default { makeInstallationAdress, OwnerDetails, DynamicMenulist };
