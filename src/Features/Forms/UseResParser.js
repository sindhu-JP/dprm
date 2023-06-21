import moment from 'moment';

const Removedynamicformsection = (data, formidentity) => {
  if (formidentity === 'Add_Contract') {
    let sectionIdentity = {
      ...data,
      sectionlist: {
        [data?.column[0]]: {
          ...data.sectionlist[data.column[0]],
          // sectionName: 'RenewalContractInformation',
          // sectiontitle: 'Renewal Contract Information',
          // arr: _.reject(data.sectionlist[data.column[0]].arr, (item) => {
          //   if (
          //     _.includes(['CONTRACT_TYPE', 'AGREEMENT_DESCRIPTION'], item.name)
          //   ) {
          //     return item;
          //   }
          // })
        }
      }
    };

    //debugger;
    return [sectionIdentity];
  } else {
    return [data];
  }
};

const AddcontractPayload = (newContract, oldcontract, formidentity) => {
  //debugger;
  if (formidentity === 'Add_Contract') {
    return {
      ...oldcontract,
      createdDate: new Date(),
      formIdentity: 'Add_Contract',
      formName: 'Add_Contract',
      lastModifiedDate: new Date(),
      AddContractFor: {
        ...oldcontract?.AddContractFor,
        RenewalContractInformation: {
          ...newContract.AddContractFor?.RenewalContractInformation,
          CONTRACT_TYPE:
            oldcontract?.AddContractFor?.ContractInformation?.CONTRACT_TYPE,
          AGREEMENT_DESCRIPTION:
            oldcontract?.AddContractFor?.ContractInformation
              ?.AGREEMENT_DESCRIPTION
        },

        sections: [
          ...oldcontract?.AddContractFor?.sections,
          'RenewalContractInformation'
        ]
      }
    };
  } else {
    return newContract;
  }
};

const dateModification = (data) => {
  var new_date = moment('2022-06-02T07:35:19.457Z').local().toDate();

  let d = moment(new_date).add(1, 'days').format('YYYY-MM-DD');

  const period = data?.AddContractFor?.ContractInformation?.CONTRACT_PERIOD;
  const stDate = moment(
    moment(data?.AddContractFor?.ContractInformation?.END_DATE).local().toDate()
  )
    .add(1, 'days')
    .format('YYYY-MM-DD');
  // const endDate = getEndDate(stDate, period);
  const endDate = moment(moment(stDate).local().toDate())
    .add(+period.split(' ')[0], 'months')
    .format('YYYY-MM-DD');

  let payload = {
    ...data,
    AddContractFor: {
      ...data?.AddContractFor,
      ContractInformation: {
        ...data?.AddContractFor?.ContractInformation,
        // END_DATE:moment(moment(data?.AddContractFor?.ContractInformation?.END_DATE).local().toDate()).add(1, "days").format("YYYY-MM-DD"),
        // START_DATE:moment(moment(data?.AddContractFor?.ContractInformation?.START_DATE).local().toDate()).add(1, "days").format("YYYY-MM-DD")
        END_DATE: endDate,
        START_DATE: stDate
      }
    }
  };

  //debugger
  return payload;
};

const getEndDate = (contractStartDate, contractDuration) => {
  let payload = {
    date: contractStartDate,
    duration: contractDuration
  };

  return TecnotreSeflcare.post('/date/dateconversion', payload).then((resp) => {
    const date = resp.data.contractEndDate;
    return moment(date);
  });
};

export default {
  Removedynamicformsection,
  AddcontractPayload,
  dateModification
};
