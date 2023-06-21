import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './uploadForm.scss';
import Grid from '@material-ui/core/Grid';

import { Typography } from '@material-ui/core';
import UploadFile from './Upload';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}));

export default function UploadForm({ uploadList, setUploadList , setLoading}) {
  const classes = useStyles();

  console.log(uploadList, "listxxx")
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Typography
            style={{
              fontSize: '15px',
              textTransform: 'capitalize',
              marginBottom: '10px'
            }}
          >
            Company Registration
          </Typography>{' '}
          <UploadFile uploadList={uploadList} setUploadList={setUploadList} type={"COMPANY_REGISTRATION"} setLoading={setLoading}/>
        </Grid>
        <Grid item xs={6}>
          <Typography
            style={{
              fontSize: '15px',
              textTransform: 'capitalize',
              marginBottom: '10px'
            }}
          >
            National ID
          </Typography>{' '}
          <UploadFile uploadList={uploadList} setUploadList={setUploadList} type={"NATIONAL_ID"} setLoading={setLoading}/>
        </Grid>
      </Grid>
    </div>
  );
}
