import { useState, useEffect } from 'react';
import { useStateful } from 'react-hanger';
import validate from './validate';
const useForm = (onSuccess) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const InvoicePaymentdetails = useStateful({
    currentDate: new Date()
  });

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      onSuccess(InvoicePaymentdetails.value);
    }
  }, [errors]);

  const handleSubmit = (event) => {
    // if (event) event.preventDefault();
    setErrors(validate(InvoicePaymentdetails.value));
    setIsSubmitting(true);
  };
  const handleChange = (event, name) => {
    // event.persist();
    InvoicePaymentdetails.setValue({
      ...InvoicePaymentdetails.value,
      [name]: event
    });
  };

  return {
    handleChange,
    handleSubmit,
    InvoicePaymentdetails,
    errors
  };
};

export default useForm;
