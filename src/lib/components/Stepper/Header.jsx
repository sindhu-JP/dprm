// import React,{useEffect,useState} from "react";
// import PropTypes from "prop-types";
// import formsAPIs from '../../../Http/api/forms';
// import {
//   Box,
//   AppBar,
//   Toolbar,
//   IconButton,
//   Divider,
//   Chip,
//   Typography,
//   Grid,
//   makeStyles,
//   Button,
// } from "@material-ui/core";
// import { ArrowBack, Edit, PersonAddDisabled, Help } from "@material-ui/icons";
// import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
// import ExitToAppIcon from "@material-ui/icons/ExitToApp";
// import Logo from "Assets/Icons/Logo.svg";
// import { useHistory } from "react-router-dom";

// const FormHeader = (props) => {
//   const classes = useStyles();
//   const history = useHistory();
//   const [regId,setRegId] = useState("");
//   const navigateToPreviousPage = () => {
//     history.goBack();
//   };

//   //  fetch registration number
//   const fetchRegNumber = async ()=>{
//     const res = await formsAPIs.getPartnerNumber(props.regId)
//     setRegId(res.partnerRegId)
//   }
//   useEffect(()=>{
//     (props.regId !== "" || props.regId !== undefined) &&
//   fetchRegNumber()
//   },[])
//   return (
//     <AppBar className={classes.root} position="relative">
//       <Toolbar>
//         <IconButton onClick={navigateToPreviousPage}>
//           <ArrowBack style={{ fontSize: "20px" }} />
//         </IconButton>
//         <Box className={classes.logo} onClick={() => {
//             history.push({
//               pathname: "/digital-prm-web-ui/",
//             });
//           }}>
//           <img src={Logo} />
//         </Box>
//         <Divider orientation="vertical" className={classes.divider} />
//         <Box>
//           <Grid
//             container
//             direction="row"
//             alignItems="center"
//             wrap="nowrap"
//             spacing={6}
//           >
//             <Grid item>
//              {
//                (regId !== "") &&
//                 <Typography className={classes.req} variant="h6">
//                 Partner Registraion - {regId}
//               </Typography>
//              }
//             </Grid>
//             <Grid item>
//               <Button
//                 style={{ borderRadius: "25px", color: "#4933D3" }}
//                 variant="outlined"
//                 color="secondary"
//                 className={classes.button}
//                 startIcon={<Edit />}
//               >
//                 Draft
//               </Button>
//               {/* <Chip
//                 // avatar={Edit}
//                 color="primary"
//                 variant="outlined"
//                 label="Draft"
//               /> */}
//             </Grid>
//           </Grid>
//         </Box>
//         <Box className={classes.spacer} />
//         <Box>
//           <Grid
//             container
//             direction="row"
//             alignItems="center"
//             justify="flex-end"
//           >
//             <Grid item>
//               <IconButton size="large" onClick={props.onFaqRequest}>
//                 <HelpOutlineOutlinedIcon style={{ fontSize: "20px" }} />
//               </IconButton>
//             </Grid>
//             <Grid item>
//               <IconButton size="large" onClick={props.onDrop}>
//                 <ExitToAppIcon style={{ fontSize: "20px" }} />
//               </IconButton>
//             </Grid>
//           </Grid>
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// const useStyles = makeStyles((theme) => ({
//   root: {
//     backgroundColor: theme.palette.common.white,
//   },
//   spacer: {
//     flexGrow: 1,
//   },
//   logo: {
//     width: theme.spacing(40),
//     "& > img": {
//       display: "block",
//       backgroundSize: "contain",
//       width: "100%",
//       height: "auto",
//     },
//   },
//   divider: {
//     margin: theme.spacing(0, 4),
//     height: "6rem",
//   },
//   req: {
//     color: theme.palette.text.primary,
//     fontWeight: theme.typography.fontWeightMedium,
//   },
// }));

// FormHeader.defaultProps = {
//   title: "Create Lead",
//   onInfo: () => {},
//   onDrop: () => {},
// };

// FormHeader.propTypes = {};
// export default FormHeader;
import React from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Divider,
  Chip,
  Typography,
  Grid,
  makeStyles
} from '@material-ui/core';
import { ArrowBack, PersonAddDisabled, Help } from '@material-ui/icons';
//import Logo from 'Assets/Icons/Logo.svg';
import { useHistory } from 'react-router-dom';
import Logo from 'Components/Logo';
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.common.white
  },
  spacer: {
    flexGrow: 1
  },
  logo: {
    width: theme.spacing(40),
    '& > img': {
      display: 'block',
      backgroundSize: 'contain',
      width: '100%',
      height: 'auto'
    }
  },
  divider: {
    margin: theme.spacing(0, 4),
    height: '3.6rem'
  },
  req: {
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightMedium
  },
  chipClr:{
    color: theme.palette.type === 'dark' ? `${theme.palette.common.white} !important`: `${theme.palette.primary.main} !important`    
  }
}));
const FormHeader = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const handleClickLogo = () => {
    props.onClose;
    history.push({
      pathname: '/digital-prm-web-ui/'
    });
  };
  const navigateToPreviousPage = () => {
    if (props.AgentPaymentModel === 'Success') {
      history.push('/');
    } else {
       props.onClose();
      //history.goBack();
    }
  };
  return (
    <AppBar className={classes.root} position="relative">
      <Toolbar>
        <IconButton edge="start" onClick={navigateToPreviousPage}>
          <ArrowBack />
        </IconButton>
        <Box ml={4} className={classes.logo} onClick={props.historypush}>
          {/* <img src={Logo} /> */}
          <Logo />
        </Box>
        <Divider orientation="vertical" className={classes.divider} />
        <Box>
          <Grid
            container
            direction="row"
            alignItems="center"
            wrap="nowrap"
            spacing={6}
          >
            <Grid item>
              {props.AgentPaymentModel === 'Success' ? (
                ''
              ) : (
                <Typography className={classes.req} variant="h6">
                  {/* {`${props.title} - ${props.id ? props.id : 'Loading ...'}`} */}
                  {`${props.title}`}
                </Typography>
              )}
            </Grid>
            <Grid item>
              <Chip
                // avatar={Edit}
                className={classes.chipClr}
                variant="outlined"
                label="Draft"
              />
            </Grid>
          </Grid>
        </Box>
        <Box className={classes.spacer} />
        <Box>
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="flex-end"
          >
            <Grid item>
              <IconButton size="large" onClick={props.onFaqRequest}>
                <Help />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton size="large" onClick={props.onDrop}>
                <PersonAddDisabled />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

FormHeader.defaultProps = {
  title: 'Create Lead',
  onInfo: () => {},
  onDrop: () => {}
};

FormHeader.propTypes = {};
export default FormHeader;
