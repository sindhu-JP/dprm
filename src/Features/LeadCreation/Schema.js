import * as Yup from 'yup';
import config from 'config';
import _ from 'lodash';

const validationSchema = Yup.object().shape({
  companyDetails: Yup.object().shape({
    companyName: Yup.string('Invalid Company Name').required(
      'Company Name is Required'
    ),
    companyRegistrationNumber: Yup.string('Invalid Company Registration Number')
      .min(
        3,
        'Company Registration Number should be minimum of 3 digits long..'
      )
      .max(20)
      // .length(
      //   10,

      // )
      .required('Company Registration Number is required.'),
    customerCategory: Yup.object().required('Customer Category is required.'),
    // subCategory: Yup.object().required("Customer Sub Category is required."),
    industryType: Yup.object().required('Industry type is required.'),
    leadClassification: Yup.object().required(
      'Lead classification is required.'
    ),
    optional: Yup.object().shape({
      //   source: Yup.string("Invalid source.").length(2, "Invalid source."),
      //   websiteUrl: Yup.string()  .matches(
      //     /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      //     'Enter correct url!'
      // ).url("Should be valid url"),
      // numberOfEmployee:Yup.string().length(1, "please select ")
    })
  }),

  companyAddress: Yup.object().shape({
    addressLine1: Yup.string().required('Address is required.'),
    country: Yup.object().required('Country is required.'),
    stateOfOrigin: Yup.object().required('State Of Origin is required.'),
    city: Yup.object().required('City is required.'),
    poBox: Yup.string()
      .required('PO BOX is required.')
      // .matches(/[0-9]/, "Invalid PO BOX Number")
      .matches(
        '^(\\+91-|\\+91|0)?\\d{' +
          _.get(config, 'dev.uiConfig.fieldLengths.pobox', 6) +
          '}$',
        'Invalid PO BOX number.'
      )
    // .length(6, "Invalid PO BOX number."),
    // .length(_.get(config, 'dev.uiConfig.fieldLengths.pobox', 6), "Invalid PO BOX number.")
    // landmark: Yup.string().required("Landmark is required."),
  }),

  primaryContactDetails: Yup.object().shape({
    name: Yup.string().required('Name is required.'),
    extensionNumber: Yup.string('extensionNumber  is required'),
    Department: Yup.string('Department  is required'),
    lastName: Yup.string().required('Last Name is required.'),
    designation: Yup.string().required('Designation is required.'),
    mobileNumber: Yup.string()
      // .matches(/^(\+91-|\+91|0)?\d{10}$/, "Invalid mobile number.")
      // .required("Mobile number is required.").min(10, "Invalid mobile number")
      // .max(10, "Invalid mobile number"),
      .matches(
        '^(\\+91-|\\+91|0)?\\d{' +
          _.get(config, 'dev.uiConfig.fieldLengths.mobile', 10) +
          '}$',
        'Invalid mobile number.'
      )
      .required('Mobile number is required.')
      .min(
        _.get(config, 'dev.uiConfig.fieldLengths.mobile', 10),
        'Invalid mobile number'
      )
      .max(
        _.get(config, 'dev.uiConfig.fieldLengths.mobile', 10),
        'Invalid mobile number'
      ),
    // .min(10, "Invalid mobile number").max(10, "Invalid mobile number"),

    // .matches(/^(\+91-|\+91|0)?\d{10}$/, "Invalid mobile number.")
    // .required("Mobile number is required.").min(10, "Invalid mobile number")
    // .max(10, "Invalid mobile number"),.required("Mobile number is required.")
    // .min(_.get(config, 'dev.uiConfig.fieldLengths.mobile', 10), "Invalid mobile number")
    // .max(_.get(config, 'dev.uiConfig.fieldLengths.mobile', 10), "Invalid mobile number"),
    email: Yup.string('Invalid email address.')
      .email('Invalid email address.')
      .required('Email address is required.'),

    // extensionNumber:Yup.string().required("extensionNumber is required."),

    //  contactMedium:Yup.array().yup.boolean().oneOf([true], 'Must Accept Terms of Service').nullable()

    // whatsapp: Yup.string().notRequired().
    //   matches(/^(\+91-|\+91|0)?\d{10}$/, "Invalid whatsapp number."),

    //   phoneNumber:Yup.string().
    //   matches(/^(\+91-|\+91|0)?\d{10}$/, "Invalid Phone number.").notRequired(),
    //   extensionNumber:Yup.string().
    //   matches(/[0-9]/, "Invalid Extension Number.").notRequired()
    //   // .required("Mobile number is required."),

    contactMedium: Yup.array()
      .transform(function (o, obj) {
        return Object.keys(obj).filter((k) => obj[k]);
      })
      .min(1, 'Please select an option for contact medium')
    // .of(
    //   Yup.object().shape({

    //     checked: Yup.boolean()
    //   })
    // ).oneOf([true], "Must choose one").nullable()

    // contactMedium: Yup.array().required("Contact medium is required."),
    // phoneNumber: Yup.string().matches(
    //   /^(\+91-|\+91|0)?\d{10}$/,
    //   "Invalid mobile number."
    // ),
    // extensionNumber: Yup.string()
    //   .matches(/[0-9]/, "Extension can only be number.")
    //   .max(2, "Extension number cant be longer than 2 digits.")
    //   .min(2, "Extension number cant be shorter than 1 digits."),
  }),

  // AdditionalContact: Yup.object().shape({
  //   role : Yup.string().required("Role is required"),
  //   name: Yup.string().required("Name is required."),
  //   lastName: Yup.string().required("Last Name is required."),
  //   mobileNumber: Yup.string()
  //     .matches(/^(\+91-|\+91|0)?\d{10}$/, "Invalid mobile number.")
  //     .required("Mobile number is required.") .min(10, "Invalid mobile number")
  //     .max(10, "Invalid mobile number"),
  //     whatsapp: Yup.string()
  //     .matches(/^(\+91-|\+91|0)?\d{10}$/, "Invalid whatsapp number.")
  //     .required("whatsapp number is required.") .min(10, "Invalid whatsapp number")
  //     .max(10, "Invalid whatsapp number"),
  //     telegram: Yup.string()
  //     .matches(/^(\+91-|\+91|0)?\d{10}$/, "Invalid telegram number.")
  //     .required("telegram number is required.") .min(10, "Invalid telegram number")
  //     .max(10, "Invalid telegram number"),

  //   email: Yup.string("Invalid email address.")
  //     .email("Invalid email address.")
  //     .required("Email address is required."),
  // contactMedium:Yup
  // .array().transform(function(o, obj) {

  //   return Object.keys(obj).filter(k => obj[k]);
  // })
  // .min(1,"Please select an option for contact medium")

  // }),

  // lob: Yup.array().required("Service of interest is required."),
  // assignment: Yup.object().required("Lead assignment is required."),

  referralInformation: Yup.object().shape({
    // company: Yup.object().required("Company is required."),
  })

  // consumptionPattern: Yup.object().shape({
  //   minutesOfLocalCallPerMonth: Yup.string(),
  //   minutesOfOffnetCallsPerMonth: Yup.string(),
  //   minutesOfInternationVoiceCallsPerMonth: Yup.string(),
  //   activeMessagesPerMonth: Yup.object(),
  //   dataUse: Yup.array(),
  // }),
});

const sectionValidator = async ({
  value,
  schema,
  sectionName,
  onSuccess,
  onFaliure
}) => {
  return await schema
    .validate(value, { abortEarly: false })
    .then((res) => {
      onSuccess();
      return true;
    })
    .catch((errors) => {
      let isValid = true;
      if (errors && errors.inner) {
        errors.inner.map((error) => {
          if (error.params.path.includes(sectionName)) {
            isValid = false;
          }
        });
      }

      if (isValid) {
        onSuccess();
      } else {
        onFaliure();
      }
      return isValid;
    });
};

export default validationSchema;
export { validationSchema, sectionValidator };

// website url
// Number should not start with 0
// extension only number not length limit
// service of interset
// lead assignment

// service of interest duplicate
// expire quote
// referral information
// Check quote id generated and sent

// Add modify quote to each step after it's generation
// After expiration
//  Generate Quote
//  Lead CLassification
//  Modify Quote
//  Drop Lead
//  Reassign
