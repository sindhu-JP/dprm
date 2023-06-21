//'https://xd.adobe.com/view/47138c9b-db17-46fa-8988-185a26f05a98-1240/screen/8d4bad4f-9a47-4ed9-a17c-ee6aa6208dbc/specs/';
import React from 'react';
import { Grid, Box, Button, Typography, makeStyles } from '@material-ui/core';

const details = {
  'Company Name': 'Coca-Cola India',
  'Registration number': '9876543234567',
  'VAT number': 'GB0987654323',
  'Customer Category': 'Corporate',
  'Sub Category': 'Small Business'
};

const useStyles = makeStyles((theme) => ({
  dot: {
    backgroundColor: '#FF6E00',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    display: 'inline-block'
  },
  mtop19: {
    marginTop: '19px',
    marginLeft: '220px'
  },
  mtop46: {
    marginTop: '46px'
  },
  borderRadius25: {
    borderRadius: '25px',
    width: '369px',
    height: '50px'
  },
  okBtn: {
    background: '#7564DE',
    width: '93px',
    color: 'white',
    borderRadius: '8px',
    fontSize: '16px',
    '&:hover': {
      background: '#7564DE'
    }
  },
  marginAlign: {
    marginTop: '20px',
    marginLeft: '65px'
  },
  titleColor: {
    color: '#999999'
  }
}));
const BlackList = (props) => {
  const classes = useStyles();

  return (
    <Box
      style={{
        marginTop: '210px',
        marginLeft: '550px'
      }}
    >
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        spacing={4}
        style={{
          borderRadius: '16px',
          backgroundColor: '#EDEDF5',
          width: '545px',
          height: '563px',
          padding: '10px'
        }}
      >
        <Grid item className={classes.mtop46}>
          <span className={classes.dot}></span>
        </Grid>
        <Grid item>
          <Typography variant="h2">Blacklist</Typography>
        </Grid>
        <Grid item>
          <Typography
            variant="h6"
            className={classes.titleColor}
            style={{ textAlign: 'center' }}
          >
            “9876543234567” company registration number found blacklist.
            Registration can’t be performed.
          </Typography>
        </Grid>

        <Grid item>
          <Grid container direction="row" spacing={4}>
            {Object.keys(details).map((item, i) => (
              <Grid item xs={6}>
                <Grid
                  container
                  direction="column"
                  // alignItems="center"
                  justify="space-between"
                  spacing={2}
                >
                  <Grid item>
                    <Typography variant="h6" className={classes.titleColor}>
                      {item}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6">{details[item]}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item className={classes.mtop19}>
          <Grid
            container
            direction="row"
            // alignItems="flex-end"
            // justify="flex-end"
            spacing={4}
          >
            <Grid item xs={10}></Grid>
            <Grid item xs={2}>
              <Button variant="contained" className={classes.okBtn}>
                OK
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/*  */}
      <Grid
        container
        direction="column"
        // alignItems="center"
        // justify="center"
        spacing={6}
        className={classes.marginAlign}
      >
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            className={classes.borderRadius25}
          >
            Click here to continue profile creation
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
export default BlackList;
