import React from 'react';
import { Grid, Box, Paper, Typography, Divider } from '@material-ui/core';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
// import ViewHierarchyTable from '../../Components/Table/ViewHierarchyTable';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(40),
    height: theme.spacing(40),
  },
}));

const NodeData = ({ onClose, currentNode }) => {

  const classes = useStyles();
  console.log(currentNode, "currr")
  return (
    <>
    <div style={{backgroundColor: "#039BE5", borderRadius: "10px", color: "#fff", height: "150px"}}>
      <Box className="drawer-header">
        <Typography style={{ fontSize: '18px', color: "#fff", marginLeft: "10px" }}>View Hierarchy</Typography>
        <IconButton iconStyle="icon" onClick={onClose}>
          <CloseRoundedIcon  style={{color: "#fff"}}/>
        </IconButton>
      </Box>
      <Grid container>
        <Grid item xs={12} justifyContent="center">
          <div style={{display: "flex", justifyContent: "center", position: "absolute", left: "45%", top: "13%"}}>
          <Avatar sizes="large" style={{fontSize: "100px"}} src="/broken-image.jpg" className={classes.large}/>
          </div>
       
        </Grid>

        <Grid container direction="row" alignItems="center" wrap="nowrap" justifyContent="center" style={{position: "absolute", top: "22%"}}>
          <div style={{display: "flex", justifyContent: "center"}}>
          <Grid item>
            <Box style={{ display: 'flex',color: "#fff"  }}>
              <Typography className="partnerId-label">Agent Category:</Typography>
              <Typography className="partnerId-value">{currentNode?.agentCat}</Typography>
            </Box>
          </Grid>
          <Grid item>
            <Divider orientation="vertical" className="divider" />
          </Grid>
          <Grid item>
            <Box style={{ display: 'flex', color: "#fff" }}>
              <Typography className="partnerId-label">Agent SubCategory:</Typography>
              <Typography className="partnerId-label">{currentNode?.agentSubCat}</Typography>
            </Box>
          </Grid>
          <Grid item>
            <Divider orientation="vertical" className="divider" />
          </Grid>
          <Grid item style={{color: "#fff"}}>
            <Typography className="partnerId-label">Tenants: {currentNode?.tenantCount}</Typography>
          </Grid>
          </div>
       
        </Grid>
      </Grid>
      </div>
      <Grid container>
        <Paper
          variant="outlined"
          style={{ width: '100%', borderRadius: '5px', marginTop: '124px' }}
        >
          <Grid item xs={12}>
            <Typography className="tenant-partner-name">
             {currentNode?.title}
            </Typography>
          </Grid>
          <Grid container direction="row" alignItems="center" wrap="nowrap">
            <Grid item>
              <Box style={{ display: 'flex' }}>
                <Typography className="tenants-label">Agent ID:</Typography>
                <Typography className="tenants-label">{currentNode?.partnerId}</Typography>
              </Box>
            </Grid>
            <Grid item>
              <Divider orientation="vertical" className="divider" />
            </Grid>
            <Grid item>
              <Box style={{ display: 'flex' }}>
                <Typography className="tenants-label">
                  User ID:
                </Typography>
                <Typography className="tenants-label">{currentNode?.id}</Typography>
              </Box>
            </Grid>
          </Grid>
          {/* <ViewHierarchyTable /> */}
        </Paper>
      </Grid>
    </>
  );
};

export default NodeData;
