import config from 'config';

import _ from 'lodash';
const VerifyOpco = (body, StepIdentity) => {

  console.log(body, StepIdentity, "testfunka")
  const data = { ...body };
  if (_.includes(['stc', 'mtn'], config.appTheme)) {
    return data;
  } else {
    let Payload = {
      // ...data,
      formIdentity: 'Partner_Profile',
      formName: 'Partner_Profile',

      mid: '',
      pid: '',
      steps: ['PartnerProfileCreation'],
      ['PartnerProfileCreation']: {
        ...body[StepIdentity.stepId],

        PartnerDetails: {
          ...body[StepIdentity.stepId][body[StepIdentity.stepId]?.sections[0]]
        },
        sections: ['PartnerDetails'].concat(
          _.without(
            body[StepIdentity.stepId].sections,
            body[StepIdentity.stepId].sections[0]
          )
        )
      }
    };
    delete data[StepIdentity.stepId][data[StepIdentity.stepId].sections[0]];
    delete Payload?.PartnerProfileCreation?.HospitalDetails;


    return Payload;
  }
};

export default { VerifyOpco };
