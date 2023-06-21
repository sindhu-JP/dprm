import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  makeStyles,

} from '@material-ui/core';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import _isEmpty from 'lodash/isEmpty';
import moment from 'moment'


// import { Trans } from '@lingui/macro';

const UserDetails = ({

    
  values,
  preview,
  title,
  partnerDetails,
  productData,
  maintitle,
  DownloadPreview,
  contractPreview,
  ticket,
  
}) => {

 console.log(values, "valuxxxx")
    const classes = useStyles()

  // console.log(modifyData, 'modiyData1z');
  
  // console.log(Product.value, 'proddduuuct');
  return (
    <>
   <Paper elevation={0}>
        <Box p={4}>
          <Grid container spacing={4} direction="column">
            <>
              <>
                <Grid item>
                  <Paper elevation={0} className={classes.border}>
                    {/* <Box px={5}> */}

                    <Grid container direction="row" spacing={4} style={{paddingBottom: "20px"}}>
                      <Grid item >
             <PersonOutlineIcon style={{fontSize: "24px"}}/>
            </Grid>
                      <Grid item>
                        <Typography variant="h1" className={classes.title}>
                          {'User Details'}
                        </Typography>
                      </Grid>
                    </Grid>
                    {/* </Box> */}

                    <Grid container spacing={3}>
                      <Grid container spacing={6}>
                        <Grid item xs={12}>
                          <Grid container direction="row">
                            <Grid
                              item
                              xs={3}
                              style={{
                                padding: '0.5rem'
                              }}
                            >
                              <Typography variant="h3" style={{color: "#494F55"}}>
                                {'CREATED BY'}
                              </Typography>
                              <Typography variant="subtitle2" >
                                {!(_isEmpty(values?.relatedParty)) && values?.relatedParty[0]?.name}
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              xs={3}
                              style={{
                                padding: '0.5rem'
                              }}
                            >
                              <Typography variant="h3" style={{color: "#494F55"}}>
                                {'CREATED DATE'}
                              </Typography>
                              <Typography variant="subtitle1">
                              {moment(
                                values?.createdDate
                              ).format('YYYY-MM-DD')}
                              </Typography>
                            </Grid>

                            <Grid
                              item
                              xs={3}
                              style={{
                                padding: '0.5rem'
                              }}
                            >
                              <Typography variant="h3" style={{color: "#494F55"}}>
                                {'ROLE'}
                              </Typography>
                              <Typography variant="subtitle1">
                              {!(_isEmpty(values?.relatedParty)) && values?.relatedParty[0]?.role}
                              </Typography>
                            </Grid>

                            <Grid
                              item
                              xs={3}
                              style={{
                                padding: '0.5rem'
                              }}
                            >
                              <Typography variant="h3" style={{color: "#494F55"}}>
                                {'CHANNEL'}
                              </Typography>
                              <Typography variant="subtitle1">
                              {!(_isEmpty(values?.channel)) && values?.channel[0]["@type"]}
                              </Typography>
                            </Grid>
         
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </>
            </>
            <>
              <>
            
              </>
            </>
          </Grid>
        </Box>
      </Paper>

    </>
  );
};
const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold
  },
  border: {
    border: '1px solid #e2e2e2'
    //  borderRadius:"0px"
  },
  borderSecondary: {
    border: '1px solid #e2e2e2',
    width: '94%',
    marginLeft: '30px'
    //  borderRadius:"0px"
  },
  img: {
    height: '108px'
  },
  root: {
    width: theme.spacing(65),
    // height: "auto",
    display: 'flex',
    minHeight: '13rem',
    border: `1px solid #e2e2e2`,
    borderRadius: theme.spacing(1.5),
    backgroundColor: '#ffffff',
    // overflow: "hidden",
    maxHeight: '20rem',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    // width: '90%',
    height: 'auto',
    overflow: 'hidden',
    display: 'flex'
    // "& img": {
    //   display: "block",
    //   width: "100%",
    //   backgroundSize: "contain",
    //   height: "auto",
    // },
  },

  img: {
    width: '180px',
    height: 100,

    overflow: 'hidden !important'
    // '&:hover': {
    //   transform: 'scale(1.5)',
    //   marginTop: '50px'
    // }
  },
  Img: {
    height: '150',
    overflow: 'hidden !important',
    '&:hover': {
      transform: 'scale(1.5)',
      marginLeft: '50px'
    }
  },
  pdfIcon: {
    '& .MuiSvgIcon-root': {
      fontSize: 40
    }
  },
  imageModal: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  someBox: {
    backgroundColor: theme.palette.background.paper,

    marginTop: '30px',

    borderRadius: '16px'
  },
  content: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  contentBox1: {
    width: '180px',
    // height: '200px',
    backgroundColor:
      theme.palette.type === 'dark'
        ? `#aaaaaa !important`
        : `${theme.palette.background.paper} !important`,
    //  marginLeft: '20px',
    boxShadow: '0px 1px 5px #00000029',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  header: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '600px',
    height: '35px'
  },
  iconSpace: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: '10px'
  },
  iconSpace1: {
    width: '100px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  inner: {
    width: theme.spacing(150),
    padding: theme.spacing(6),
    height: 'auto',
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.spacing(4)
  }
}));

export default UserDetails;
