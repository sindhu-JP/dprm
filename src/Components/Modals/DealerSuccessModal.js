import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import {
    Button,
   
    Grid,
    makeStyles,
    Typography
  } from '@material-ui/core';
  import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';

  import { useHistory } from 'react-router-dom';
  import { Trans } from '@lingui/react';
import { blue } from '@material-ui/core/colors';


const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  root: {
    backgroundColor: "#fff"
  },
  textColor: {
    color:
      theme.palette.type === 'dark'
        ? `${theme.palette.primary.black} !important`
        : ``
  },
  buttonWidth: { width: '120px'}
}));



function DealerSuccess({location}) {
  const classes = useStyles();

  const [open, setOpen] = useState(false)
//   const { formType, userId } = location?.state;

useEffect(()=> {
    setOpen(location?.state?.open)
}, [])
  const history = useHistory();
  const handleDashboardRoute = () => {
    !location?.state?.open
    history.push(`/`);
  };

  const handleHierarchy = ()=> {
    setOpen(false)
    !location?.state?.open
    history.push({
      pathname: '/digital-prm-web-ui/hierarchy',
      state: {
        partnerId: location?.state?.userId,
         userId: location?.state?.userId,
        stepper: false
      }
    });
  }
  const handleBackOfficeRoute = () => {
    localStorage.setItem('selectedSidebarTab', 'BackOffice');
    history.push('/digital-prm-web-ui/BackOffice');
  };
  const [copyAlert, setCopyAlert] = useState(false);
//   const handleProceed = () => {
//     history.push('/');
//     window.open(url, '_blank');
//   };

  const handleClose = () => {
    return !location?.state?.open
    
  };




  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={location?.state?.open}>
            <div>
              <div className={classes.root}>
            
            
                 
                        <Grid
                          container
                          direction="column"
                          alignItems="center"
                          spacing={4}
                        >
                          <Grid item>
                            <CheckCircleRoundedIcon
                              fontSize="large"
                              style={{
                                color: '#59cf59',
                                height: '80px',
                                width: '80px'
                              }}
                            />
                          </Grid>
                          <Grid item>
                            <Typography variant="h2" style={{ color: '#59cf59' }}>
                              Success !
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography variant="subtitle1">
                              <Trans id="Agent Created Successfully!"></Trans>
                            </Typography>
                          </Grid>
 
                          <Grid
                            item
                            container
                            justifyContent="space-evenly"
                            alignItems="center"
                          >
                            <ul style={{listStyleType: "none"}}>
                              <li> 
                             <div style={{display: "flex"}}>
                             <Typography variant="subtitle2" style={{width: "100px"}}>
                                Agent Name:
                              </Typography>
                              <Typography variant="subtitle2" style={{width: "20px"}}>
                                :
                              </Typography>
                              <Typography variant="subtitle2" style={{width: "100px"}}>
                                {location?.state?.PartnerName}
                              </Typography>
                             </div>
                              </li>
                              <li>
                                <div style={{display: "flex"}}>
                                <Typography variant="subtitle2" style={{width: "100px"}}>
                              Agent ID:
                              </Typography>
                              <Typography variant="subtitle2" style={{width: "20px"}}>
                                :
                              </Typography>
                              <Typography variant="subtitle2" style={{width: "100px"}}>
                              {location?.state?.TicketID}
                              </Typography>
                                </div>
                            
                              </li>
                             
                            </ul>
                      
                            
                          </Grid>
    
                        </Grid>
    
                        <Grid
                          container
                          spacing={6}
                          style={{
                            marginTop: '30px'
                          }}
                          justify="space-around"
                          alignItems="center"
                        >
                          
                            <Grid item>
                              <Button
                                variant="contained"
                                size="large"
                                color="primary"
                                disableElevation
                                className={classes.buttonWidth}
                                onClick={handleHierarchy}
                              >
                                Manage Hierarchy
                              </Button>
                             
                            </Grid>
                          
                          
                            <Grid item>
                              <Button
                                variant="contained"
                                size="large"
                                color="primary"
                                disableElevation
                                className={classes.buttonWidth}
                                onClick={handleDashboardRoute}
                              >
                                Close
                              </Button>
                            </Grid>
                          
                          {/* <Grid item>
                           <Button
                              variant="contained"
                              size="large"
                              color="primary"
                              disableElevation
                              className={classes.buttonWidth}
                              onClick={handleBackOfficeRoute}
                            >
                              Go to BackOffice
                            </Button>
                          </Grid> */}
                        </Grid>
                    
               
              </div>
            </div>

    </Dialog>
  );
}

DealerSuccess.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default DealerSuccess