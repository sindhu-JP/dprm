import * as Yup from 'yup';

import config from 'config';
const validationSchema = Yup.object().shape({
  partnerName: Yup.string('Invalid Company Name')
    .required('Partner Name is Required')
    .min(3, 'Parnter Name should be minimum of 3 digits long'),

  partnerRegNo: Yup.string('Invalid Company Registration Number')
    .min(10, 'Parnter Registration Number should be minimum of 10 digits long')
    .max(10, 'Parnter Registration Number should be maximum of 10 digits long')
    .matches(
      /^[a-zA-Z0-9]*$/,
      'Parnter Registration Number should contains only alphaNumeric'
    ),
  primaryContactName: Yup.string().required('Required'),
  phoneNumber: Yup.string()
    .required('Required')
    .min(
      `${config.dev.server.MOBILE_MIN_LENGTH}`,
      `Mobile Number should be minimum of ${config.dev.server.MOBILE_MIN_LENGTH} digits long`
    )
    .max(
      `${config.dev.server.MOBILE_LENGTH}`,
      `Mobile Number should be maximum of ${config.dev.server.MOBILE_LENGTH} digits long`
    )
    .matches(/^[0-9]+$/, 'Must be only digits'),

  email: Yup.string()
    .required('Required')
    .matches(
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})$/,
      'Email should be in valid format'
    )

  // companyName: Yup.string("Invalid Company Name").required(
  //     "Company Name is Required"
  //   ),
  // companyRegNo : Yup.string("Invalid Company Registration Number")
  // .min(3, "Company Registration Number should be minimum of 3 digits long..").max(20),
  // name: Yup.string().required("Required"),
  // email: Yup.string().required("Required"),
  // lob: Yup.string().required("Required"),
});

const agentValidationSchema = Yup.object().shape({
  agentName: Yup.string('Invalid Agent Name')
    .required('Agent Name is Required')
    .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field '),
  agentLastName: Yup.string('Invalid Last Name')
    .required('Agent last name is Required')
    .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field '),
  agentMSISDN: Yup.string()
    .required('Required')
    .matches(/^\d+$/, { message: 'Only numeric value allowed' })
    // .min(0, 'Min value 0.')
    // .max(30, 'Max value 30.')
    .max(
      _.get(config, 'dev.uiConfig.fieldLengths.Msisdn', 10),
      'msisdn can be of 10 digits'
    )
    .min(
      _.get(config, 'dev.uiConfig.fieldLengths.Msisdn', 9),
      'msisdn should include 9 digits'
    ),
  agentCategory: Yup.string(),
  // .required('Required'),
  agentSubCategory: Yup.string(),
  // .required('Required'),



  email: Yup.string('Invalid email address.')
    .email('Invalid email address.')
    .required('Email address is required.')
});

export default validationSchema;
export { validationSchema, agentValidationSchema };
