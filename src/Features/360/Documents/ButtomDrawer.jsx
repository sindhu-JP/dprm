import React from 'react';

import Dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { useBoolean, useStateful } from 'react-hanger';

import {
  Box,
  Grid,
  Typography,
  Drawer,
  Button,
  TextField,
  makeStyles,
  Paper,
  Chip
} from '@material-ui/core';
import { SvgIcon } from 'lib/components';
import CloseIcon from '@material-ui/icons/Close';

// import DocumentDetails from './DocumentDetails';
import Statuses from 'lib/constants/statuses';

const ButtomDrawer = (props) => {
  const classes = useStyles();

  const getStatusColor = (status) => {
    return Statuses.docStatus[status]?.color || 'orange';
  };

  return (
    <div>
      <Drawer
        anchor="bottom"
        open={props.open}
        // onClose={upload.cancel}
      >
        <Box className={classes.drawer}>
          {/* <Box className={classes.progress}></Box> */}
          <Box className={classes.details} p={10}>
            <Grid container direction="column" spacing={4}>
              <Grid item>
                <Grid
                  container
                  direction="row"
                  spacing={4}
                  justify="space-between"
                >
                  <Grid item>
                    <Chip
                      style={{ minWidth: '3.31rem' }}
                      className={
                        classes[
                          getStatusColor(props.fileDetails?.lifecycleState)
                        ]
                      }
                      label={props.fileDetails?.lifecycleState}
                      size={'small'}
                    />
                  </Grid>
                  <Grid item onClick={props.close}>
                    <CloseIcon iconName="close" className={classes.closeIcon} />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item>
                <Typography variant="h4">
                  Document Purpose:{' '}
                  {props.fileDetails.documentSpecification?.id}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  Document No.: {props.fileDetails.id}
                </Typography>
              </Grid>
              <Grid item>
                {/* <DocumentDetails fileDetails={props.fileDetails} /> */}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Drawer>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: theme.spacing(70),
    height: 'auto',
    border: `1px solid #e2e2e2`,
    borderRadius: theme.spacing(1.5),
    backgroundColor: '#ffffff',
    overflow: 'hidden'
  },
  embedded: {
    display: 'block',
    width: '100%',
    height: '90px',
    // height: "100",
    overflow: 'hidden'
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
    fontWeight: 'bold',
    color: '#2E1EC8'
  },
  fontcolor: {
    fontWeight: theme.typography.fontWeightBold,
    color: '#777777'
  },
  subfont: {
    color: '#777777'
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
    width: '100%',
    height: 'auto',
    overflow: 'hidden'
    // "& img": {
    //   display: "block",
    //   width: "100%",
    //   backgroundSize: "contain",
    //   height: "auto",
    // },
  },
  inputWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#e2e2e2',
    borderStyle: 'dashed',
    backgroundColor: '#ffffff',
    color: theme.palette.common.textSecondary,
    outline: 'none',
    transition: 'border .24s ease-in-out',
    textAlign: 'center',
    minHeight: '150px',
    cursor: 'pointer',
    '& span': {
      color: theme.palette.primary.main,
      fontSize: '16px',
      fontWeight: theme.typography.fontWeightBold
    }
  },

  drawer: {
    backgroundColor: theme.palette.background.main
  },
  progress: {
    backgroundColor: theme.palette.primary.main,
    height: theme.spacing(4)
  },
  chip: {
    color: '#FFFFFF',
    background: '#FFA369'
  },
  orange: {
    backgroundColor: theme.palette.common.gold,
    color: theme.palette.common.white
  }
}));

export default ButtomDrawer;
