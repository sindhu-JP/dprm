import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingRight: '20px',
    paddingLeft: '20px'
  },
  heading: {
    fontSize: '20px',
    fontWeight: 600,
    marginTop: '8px',
    marginLeft: '10px'
  },
  outer: {
    padding: '10px'
  },
  Logo: {
    marginLeft: '10px'
  },
  expandIcon: {
    marginRight: 20
  },
  details: {
    paddingLeft: '10px'
  },
  id: {
    marginTop: '14px'
  },
  content: {
    marginTop: '2px',
    marginleft: '5px'
  }
}));

export default function Company(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <DialogTitle id="form-dialog-title">Select Product</DialogTitle>
      <Accordion className={classes.outer}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Grid container direction="row" spacing="2">
            <Grid item className="classes.Logo">
              <Typography>
                <img src={CompanyLogo} />
              </Typography>
            </Grid>

            <Grid item>
              <Typography className={classes.heading}>
               
                {props.accordianDetails.userName} - {props.accordianDetails.id}
              </Typography>
            </Grid>

            <Grid item className={classes.id}>
              <Typography>{props.id}</Typography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid
            container
            direction="row"
            alignItems="center"
            spacing="10"
            justify="center"
            className="classes.details"
          >
            <Grid item xs={4}>
              <Grid container>
                <Grid>
                  <Typography variant="subtitle1">ID </Typography>
                </Grid>
                <Grid className={classes.content}>
                  <Typography>: {props.id}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid container>
                <Grid>
                  <Typography variant="subtitle1">Email </Typography>
                </Grid>
                <Grid className={classes.content}>
                  <Typography>: {props.email}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid container>
                <Grid>
                  <Typography variant="subtitle1">Mobile </Typography>
                </Grid>
                <Grid className={classes.content}>
                  <Typography>: {props.mobile}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion> */}
    </div>
  );
}
