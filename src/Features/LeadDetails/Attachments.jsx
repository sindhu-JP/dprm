import React from 'react';
import { Box, Grid, Paper, Typography, makeStyles } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';

import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import Attachpreview from './Attachpreview';
import { Documenturl } from 'Http/axios';
// import { ReactComponent as Refrel } from "Assets/Icons/referral.svg";

const Attachments = ({ url, attachList, title }) => {
  const classes = useStyles();

  return (
    <Paper elevation={0}>
      <Box p={4}>
        <Box mb={4}>
          <Grid container direction="row" spacing={4}>
            <Grid item>{/* <Refrel /> */}</Grid>
            <Grid>
              <Typography variant="h2" className={classes.title}>
                {title}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Grid container direction="row" spacing={2}>
          {attachList &&
            attachList.map((file) => {
              return (
                <Box className={classes.root} marginLeft={10}>
                  <Grid container direction="column" spacing={4}>
                    <Grid item style={{ height: '30px', marginTop: 10 }}>
                      <Typography
                        align="center"
                        className={classes.title}
                        variant="h6"
                      >
                        {/* {file.id} */}
                        {file.documentSpecification?.id}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Box className={classes.image} py={6}>
                        <div>
                          <Attachpreview
                            attachment={file}
                            documentId={file.id}
                            path={`${Documenturl}/document/download/${file.id}`}
                          />
                        </div>
                      </Box>

                      <Box px={1} pt={2}>
                        <Grid
                          container
                          justify="flex-end"
                          alignItems="center"
                          spacing={4}
                        >
                          <Grid item>
                            <Box px={1}>
                              <Grid
                                container
                                direction="row"
                                justify="flex-center"
                                spacing={4}
                              >
                                <Grid item>
                                  <EditOutlinedIcon />
                                </Grid>

                                <Grid item>
                                  <VisibilityOutlinedIcon />
                                </Grid>
                                <Grid item>
                                  <DeleteIcon />
                                </Grid>
                              </Grid>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              );
            })}
        </Grid>
      </Box>
    </Paper>
  );
};
const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold
  },
  Img: {
    height: '150',
    overflow: 'hidden !important',
    '&:hover': {
      transform: 'scale(1.5)',
      marginLeft: '50px'
    }
  },

  root: {
    width: theme.spacing(65),
    // height: "auto",
    minHeight: '18rem',
    border: `1px solid #e2e2e2`,
    borderRadius: theme.spacing(1.5),
    backgroundColor: '#ffffff',
    // overflow: "hidden",
    maxHeight: '25rem'
  },
  embedded: {
    display: 'block',
    width: '100%',
    height: '100'
  },
  closeIcon: {
    width: theme.spacing(8),
    cursor: 'pointer',
    color: theme.palette.text.primary
  },
  button: {
    backgroundColor: theme.palette.common.white
  },
  title: {
    fontWeight: theme.typography.fontWeightBold
  },
  selectText: {
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.primary.main,
    marginLeft: theme.spacing(1)
  },
  iconSmall: {
    width: theme.spacing(4),
    color: theme.palette.common.silver,
    '& svg': {
      path: theme.palette.common.silver
    },
    '& path': {
      path: theme.palette.common.silver
    }
  },
  image: {
    width: '90%',
    height: 'auto',
    overflow: 'hidden'
    // "& img": {
    //   display: "block",
    //   width: "100%",
    //   backgroundSize: "contain",
    //   height: "auto",
    // },
  },

  drawer: {
    backgroundColor: theme.palette.background.main
  },
  progress: {
    backgroundColor: theme.palette.primary.main,
    height: theme.spacing(4)
  }
}));
export default Attachments;
