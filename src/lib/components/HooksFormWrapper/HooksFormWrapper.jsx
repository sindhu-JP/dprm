import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const HooksFormWrapper = ({
  onSubmit,
  children,
  validationSchema,
  defaultValues,
}) => {
  const { handleSubmit, ...rest } = useForm({
    mode: "onBlur",
    defaultValues,
    resolver: validationSchema ? yupResolver(validationSchema) : null,
  });

  return (
    
    <form onSubmit={handleSubmit(onSubmit)}>
      {children({
        ...rest,
      })}
    </form>
  );
};

HooksFormWrapper.propTypes = {
  onSubmit: PropTypes.func,
  children: PropTypes.func,
  validationSchema: PropTypes.object,
};

export default HooksFormWrapper;
