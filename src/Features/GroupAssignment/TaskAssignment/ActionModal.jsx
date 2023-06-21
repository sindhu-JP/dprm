import React from 'react';
import Buttonsheet from 'Components/ButtonSheets/Buttonsheet';
import { Box, Button, Grid, makeStyles } from '@material-ui/core';
import { ArrowForward } from '@material-ui/icons';

import TaskPolicy from './TaskPolicy';
import Groups from 'Http/api/Groups';
import { useBoolean, useStateful } from 'react-hanger';
const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold
  },
  icon: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.contrastText,
    '& svg': {
      fill: theme.palette.common.white,
      stroke: theme.palette.common.white
    }
  },
  footer: {
    position: 'fixed',
    padding: '10px',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.palette.common.white
  },
  button: {
    boxShadow: 'none',
    // backgroundColor: theme.palette.success.main,
    // color: theme.palette.common.white,
    fontSize:'14px',
    minWidth: theme.spacing(30),
    '&:hover': {
      // backgroundColor: theme.palette.success.light
    }
  }
}));
export default function ActionModal({
  open,
  onClose,
  Unavailablerow,
  UserSetAvailable,
  getuserGrouplist,
  value,
  userGroupsRow,
  context,
  TaskAssingUser
}) {
  const classes = useStyles();
  const [fromdate, setfromdate] = React.useState(null);
  const [todate, settodate] = React.useState(null);
  const selectedUserlist = useStateful([]);
  const fechUserlist = useStateful([]);
  const showlist = useBoolean(false);

  const handleSubmit = () => {
    //  if(selectedUserlist.value.length>0){

    const payload = {
      workflowId: context?.columns?.WORKFLOW_ID,
      nodeId: context?.list?.nodeId,
      groupId: value,
      taskUsers: selectedUserlist.value,
      hierarchyId: '',
      escalationId: '',
      groupLevel: []
    };
    TaskAssingUser({ id: fechUserlist.value?.id, payload: payload });
    // }
  };

  React.useEffect(() => {
    if (value) {
      getuserGrouplist({ id: value });
    }
  }, [value]);

  const gethistory = async () => {
    let res = await Groups._TaskAssignHistory(
      context?.columns?.WORKFLOW_ID,
      context?.list?.nodeId
    );    
    if (res.length > 0) {
      let  res2 = await Groups._getuesrGrouplist( res[0].groupId,()=>{})
      showlist.setTrue();
     
      fechUserlist.setValue({...res[0],newList:res2});
      selectedUserlist.setValue(
        _.map(res[0]?.taskUsers, (item) => {
          return {
            userId: item.userId,
            username: item.username
          };
        })
      );
    } else {
      fechUserlist.setValue([]);
      showlist.setFalse();
    }
  };
  React.useEffect(() => {
    if (context) {
      gethistory();
    }
  }, [context]);

  const onchangeDropdown = (e, v) => {
    selectedUserlist.setValue(
      _.map(v, (item) => {
        if(_.isEmpty(item.list)){

          return {
            userId: item.id,
            username: item.username
          };
        }
        else{
          return {
            userId: item.list.id,
            username: item.list.username
          };
        }
      })
    );
  };

  return (
    <div>
      <Buttonsheet
        open={open}
        header={'Settings'}
        onClose={onClose}
        heightvalue={'60vh'}
      >
        <Box py={5}>
          <Grid container direction="column">
            <Grid item>
              <TaskPolicy
                userGroupsRow={userGroupsRow}
                selectedUserlist={selectedUserlist}
                onchangeDropdown={onchangeDropdown}
                fechUserlist={fechUserlist.value}
                showlist={showlist.value}
              />
            </Grid>
          </Grid>

          <Box px={8} className={classes.footer}>
            <Grid container justify="flex-end" spacing={5} direction="row">
              <Grid item>
                <Button
                  size="large"
                  variant="outlined"
                  color="primary"
                  className={classes.button}
                  onClick={onClose}
                >
                  Cancel
                </Button>
              </Grid>

              <Grid item>
                <Button
                  size="large"
                  variant="contained"
                  color="primary"
                  // endIcon={!buttonLoader ? <ArrowForward /> : null}
                  className={classes.button}
                  endIcon={<ArrowForward />}
                  onClick={handleSubmit}
                >
                  {/* {buttonLoader ? (
                          <CircularProgress size={25} color="primary" />
                        ) : (
                          btn.label
                        )} */}
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Buttonsheet>
    </div>
  );
}
