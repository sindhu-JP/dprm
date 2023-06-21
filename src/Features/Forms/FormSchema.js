import { isValid } from "date-fns";
import * as Yup from "yup";
import constants from "../constants/constants";

const FormSchema = Yup.object().shape({
  // companyName: Yup.string("Invalid Company Name").required(
  //     "Company Name is Required"
  //   ),
  // companyRegNo : Yup.string("Invalid Company Registration Number")
  // .min(3, "Company Registration Number should be minimum of 3 digits long..").max(20),
  // // name: Yup.string().required("Required"),
  // // email: Yup.string().required("Required"),
  // lob: Yup.string().required("Required"),

  partnerName: Yup.string().required("Required"),
  name: Yup.string().required("Required"),
  phoneNumber: Yup.string()
    .required("Required")
    .matches(constants.regex.mobile, "Enter valid mobile number"),
  dob: Yup.string().required("Required"),
  email: Yup.string()
    .required("Required")
    .matches(constants.regex.email, "Enter valid Email"),
  //
  "PARTNER_NAME": Yup.string()
    .required("Required")
    .matches(constants.regex.name, "Enter valid mobile number"),
  "USERNAME": Yup.string()
    .required("Required")
    .matches(constants.regex.name, "Enter valid mobile number"),
});

export default FormSchema;
export { FormSchema };
