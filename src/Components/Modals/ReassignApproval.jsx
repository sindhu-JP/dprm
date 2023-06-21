import React from 'react';
import _ from 'lodash';
import { useStateful } from 'react-hanger';

import {
  Grid,
  Box,
  Button,
  Typography,
  makeStyles,
  TextField
} from '@material-ui/core';

const ReassignApproval = ({
  context,
  onCancel,
  onSubmit,
  loading,
  accountManagers,
  parent
}) => {
  const classes = useStyles();
  const mobile = useStateful('');
  const email = useStateful('');
  const reason = useStateful('');
  const selectedManager = useStateful({});

  const getParentdetails = useStateful({});
  const handleSubmit = () => {
    onSubmit({
      id: context.lead.id,
      quoteId: context.quoteId,
      user: context?.user,
      //  oppId:context.opportuntiData.id,
      modalId: 'reassignApproval',
      payload: {
        name: userdatail()
        // email: email.value || selectedManager.value.email,
        // mobileNumber: mobile.value || selectedManager.value.mobileNumber,
      }
    });
  };

  const handleSelect = (event) => {
    selectedManager.setValue(accountManagers.entities[event.target.value]);
    // managers.value.map((man) => {
    //   if (man.id === manager) {
    //     selectedManager.setValue(man);
    //   }
    // });
    // reason.setValue(manager);
  };

  //  React.useEffect(()=>{
  //     if(parent){
  //       getParentdetails.setValue({
  //          ...LeadFactory.getparent(parent)
  //       })
  //     }

  //  },[])
  const userdatail = () => {
    if (parent) {
      let username = _.get(parent.parent, 'username', '');
      return username;
    }
  };
  return (
    <Box className={classes.root}>
      <Grid
        container
        direction="column"
        justify="center"
        spacing={6}
        className={classes.inner}
      >
        <Grid item>
          <Typography variant="h4">Reassign ?</Typography>
        </Grid>

        <Grid item>
          <Typography variant="h6" className={classes.subtitle}>
            Lead Reassignment by {userdatail()}
          </Typography>
        </Grid>

        <Grid item>
          <TextField
            label="ASSIGNEE"
            fullWidth
            onChange={handleSelect}
            value={userdatail()}
            disabled={true}
          />
        </Grid>

        {/* <Grid item>
          <TextField
            value={selectedManager.value.email || email.value}
            onChange={(e) => email.setValue(e.target.value)}
            label="EMAIL ID"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item>
          <TextField
            value={selectedManager.value.mobileNumber || mobile.value}
            onChange={(e) => mobile.setValue(e.target.value)}
            label="MOBILE NUMBER"
            size="small"
            fullWidth
          />
        </Grid> */}
        <Grid item>
          {/* <Grid container direction="column" spacing={2}>
            <Grid item>
              <Typography variant="subtitle2">Description</Typography>
            </Grid>
            <Grid item>
              <TextareaAutosize
                rowsMin={4}
                rowsMAx={6}
                placeholder="Your Description Here"
                className={classes.textarea}
                onChange={(e) => description.setValue(e.target.value)}
              />
            </Grid>
          </Grid> */}
        </Grid>

        <Grid item>
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="flex-end"
            spacing={4}
          >
            <Grid item>
              <Button
                onClick={onCancel}
                size="large"
                variant="text"
                color="secondary"
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={handleSubmit}
                variant="contained"
                color="primary"
                size="large"
              >
                {loading ? 'Reassigning ...' : 'Reassign'}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh'
  },

  inner: {
    width: theme.spacing(100),
    padding: theme.spacing(6),
    height: 'auto',
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.spacing(4)
  },

  subtitle: {
    fontWeight: theme.typography.fontWeightMedium
  },

  textarea: {
    width: '100%',
    minWidth: '100%',
    maxWidth: theme.spacing(92),
    maxHeight: theme.spacing(104),
    border: `none`,
    color: theme.palette.text.primary,
    fontFamily: 'inherit'
  }
}));

export default ReassignApproval;
