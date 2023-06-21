export default function validate(values) {
  let errors = {};
  if (!values.method) {
    errors.method = 'Payment Method is required';
  }else if (!values.remarks) {
    errors.remarks = 'Description is required';
  }
  return errors;
}
