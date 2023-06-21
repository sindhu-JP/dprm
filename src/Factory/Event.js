import _ from 'lodash';

const makeEventPayload = (event) => {
  const payload = {
    date: '',
    subject: '',
    content: '',
    organizer: '',
    descriptions: '',
    displayName: 'Meeting',
    slotId: {
      startTime: '',
      endTime: ''
    },
    email: [],
    cust: [],
    attendee: []
  };

  payload.subject = event.name;
  payload.content = event.subtitle;
  payload.descriptions = event.description;
  payload.eventType = event.type;
  payload.date = new Date(event.date).toISOString();

  const date = payload.date.split('T')[0];
  const start = new Date(event.start).toISOString().split('T')[1];
  const end = new Date(event.end).toISOString().split('T')[1];

  payload.slotId = {
    startTime: `${date}T${start}`,
    endTime: `${date}T${end}`
  };
  payload.leadId = event.attendies.id;
  payload.organizer = event.organizer;
  payload.attendee = [
    _.get(event.attendies, 'primaryContactDetails.email', '')
  ];
  payload.companyDetails = {
    companyName: _.get(event.attendies, 'companyDetails.companyName', ''),
    registrationNumber: _.get(
      event.attendies,
      'companyDetails.registrationNumber',
      ''
    ),
    customerCategory: _.get(
      event.attendies,
      'companyDetails.customerCategory',
      ''
    ),
    customerSubCategory: _.get(
      event.attendies,
      'companyDetails.customerSubCategory',
      ''
    ),
    leadClassification: _.get(
      event.attendies,
      'companyDetails.leadClassification',
      ''
    )
  };
  payload.companyAddress = {
    addressLine1: _.get(event.attendies, 'companyAddress.addressLine1', ''),
    city: _.get(event.attendies, 'companyAddress.city', ''),
    postcode: _.get(event.attendies, 'companyAddress.postcode', ''),
    stateOrProvince: _.get(
      event.attendies,
      'companyAddress.stateOrProvince',
      ''
    ),
    country: _.get(event.attendies, 'companyAddress.country', ''),
    landmark: _.get(event.attendies, 'companyAddress.landmark', '')
  };

  payload.cust = [
    {
      name: _.get(event.attendies, 'primaryContactDetails.name', ''),
      email: _.get(event.attendies, 'primaryContactDetails.email', ''),
      mobile: _.get(event.attendies, 'primaryContactDetails.mobileNumber', ''),
      Membertype: 'required'
    }
  ];

  return payload;
};

export default {
  makeEventPayload
};
