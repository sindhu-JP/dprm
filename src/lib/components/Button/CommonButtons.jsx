import React from 'react';
import {  CircularProgress } from '@material-ui/core';
import { CommonButton } from '@tt-dcpq/dcpq-common-libs';
export default function CommonButtons({
  variant = 'contained',
  color = 'primary',
  size = 'large',
  loading = false,
  text = 'Submit',
  handleSubmit,
  disable
}) {
  return (
    <div>
      <CommonButton
        variant={variant}
        color={color}
        size={size}
        disabled={loading || disable}
        onClick={handleSubmit}
      >
        {loading ? (
          <CircularProgress size={25} style={{ color: 'green' }} />
        ) : (
          text
        )}
      </CommonButton>
    </div>
  );
}
