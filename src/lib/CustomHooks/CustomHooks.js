import React from 'react';
import { useBoolean, useStateful } from 'react-hanger';
import { useDispatch } from 'react-redux';
const CustomUseState = (data) => {
  const [state, setstate] = React.useState(data || "");

  return [state, setstate];
};

const CustomUseBoolean = (value) => {
  const boolean = useBoolean(value||false);

  return boolean;
};

const custUsestatefull = (type) => {
  const data = useStateful(type);

  return data;
};
const customUseDispatch = () => {
  const dispatch = useDispatch();
  return dispatch;
};

const normalfuc = () => { }

const useAsync =  (asyncFunction, immediate = false) => {

  const [status, setStatus] = React.useState("idle");
  const ParseRes = useStateful(null)
  const [error, setError] = React.useState(null);
  const loading = useBoolean(false)



  const execute = React.useCallback(async () => {
    setStatus("pending");
    loading.setTrue()
    ParseRes.setValue(null);
    setError(null);
    return await asyncFunction()
      .then((response) => {

        ParseRes.setValue(response);
        setStatus("success");
        loading.setFalse()
      })
      .catch((error) => {
        setError(error);
        setStatus("error");
        loading.setFalse()
      });
  }, [asyncFunction]);



  React.useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate]);
  return { execute, status, value: ParseRes.value, error, loading: loading.value };
};


const useSubmit = submitFunction => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      await submitFunction();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  return [handleSubmit, loading, error];
};
export default { CustomUseState, CustomUseBoolean, customUseDispatch, custUsestatefull, useAsync, useSubmit };
