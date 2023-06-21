import React from 'react';
import { makeStyles } from '@material-ui/core';

import { CommonButton, } from '@tt-dcpq/dcpq-common-libs';

const Actions = ({data}) => {

  const classes = useStyles();

  return (
    <CommonButton 
      variant='contained'
      color="primary"
      fullWidth={false}
    >
      {data.status}
    </CommonButton>

  )
}

const useStyles = makeStyles((theme) => ({

  container: {
    backgroundColor: 'lightblue',
    color: 'blue',
    fontWeight: 'bold'
  },
}))

export default Actions