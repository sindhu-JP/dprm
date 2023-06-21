import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  contractNumner: Yup.string().required('Required'),
  contractType: Yup.string().required('Required'),
  contractPeriod: Yup.string().required('Required'),
  noticePeriod: Yup.string().required('Required'),
  billingType: Yup.string().required('Required')
  // contractValidity: Yup.string().required("Required")
});

export default validationSchema;
export { validationSchema };
