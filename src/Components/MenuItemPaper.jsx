import React from 'react';
import Button from '@material-ui/core/Button';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';

import { makeStyles } from '@material-ui/core/styles';
import DownloadReports from '../../src/Assets/Icons/downloads.svg';
import {
  Box,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Typography,
  Tooltip,
  ClickAwayListener
} from '@material-ui/core';
import { Checkbox } from '@material-ui/core';
import { useStateful } from 'react-hanger';
import { CSVLink } from 'react-csv';
import _ from 'lodash';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    zIndex: 100
    // width:'300px',height:"500px"
  },
  paper: {
    marginRight: theme.spacing(2),
    zIndex: 100
  },
  menupaper: {
    width: '300px',
    height: '500px'
  }
}));

export default function MenuListComposition({
  downloadreports,
  sumaryCardDetails,
  PartnerSummaryrow,
  SUMMARY,
  CardItem,
  Alertopen,
  showFilter,
  setOpen,
  open,
  filter
}) {
  const classes = useStyles();

  const anchorRef = React.useRef(null);

  const Formatselections = useStateful({});
  const pdfFormatselection = useStateful('A3');
  const reportsVersion = useStateful('');
  const checkBoxlist = useStateful([
    { name: '.csv', code: 'csv', sub: false, active: false },
    { name: '.pdf', code: 'pdf', sub: false, active: false }
  ]);
  const pdfformatlist = useStateful([
    { name: '.A1', code: 'A1', sub: true, active: false },
    { name: 'A2', code: 'A2', sub: true, active: false },
    { name: 'A3', code: 'A3', sub: true, active: true },
    { name: 'A4', code: 'A4', sub: true, active: false }
  ]);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);

    filter.setFalse();
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  //  const checkBox=()=>

  const handlChange = (e, value, index) => {
    reportsVersion.setValue(value.code);
    checkBoxlist.setValue(
      _.map(checkBoxlist.value, (item) => {
        if (item.code === value.code) {
          return {
            ...item,
            active: !item.active
          };
        } else {
          return {
            ...item,
            active: false
          };
        }
      })
    );

    Formatselections.setValue({
      [e.target.name]: e.target.checked
    });
  };
  const handlpdffileChange = (e, value, index) => {
    pdfformatlist.setValue(
      _.map(pdfformatlist.value, (item) => {
        if (item.code === value.code) {
          return {
            ...item,
            active: true
          };
        } else {
          return {
            ...item,
            active: false
          };
        }
      })
    );
    pdfFormatselection.setValue(e.target.name);
  };

  const download = () => {
    if (reportsVersion.value === 'pdf') {
      if (!_.isEmpty(Formatselections.value)) {
        downloadreports(Formatselections.value, pdfFormatselection.value);
        handleToggle();
        Formatselections.setValue('');
      }
      Alertopen({
        type: 'success',
        message: ` ${sumaryCardDetails?.value?.name?.props?.id} PDF file  Downloaded Successfully !!`
      });
      checkBoxlist.setValue(
        _.map(checkBoxlist.value, (item) => {
          return {
            ...item,
            active: false
          };
        })
      );
      reportsVersion.setValue('');
    }
  };

  const downloadCsv = () => {
    if (reportsVersion.value === 'csv') {
      handleToggle();
      Formatselections.setValue('');
      Alertopen({
        type: 'success',
        message:  `${sumaryCardDetails?.value?.name?.props?.id} CSV file  Downloaded Successfully !!`        
      });

      checkBoxlist.setValue(
        _.map(checkBoxlist.value, (item) => {
          return {
            ...item,
            active: false
          };
        })
      );
      reportsVersion.setValue('');
    }
  };
  const handleClickAway = () => {
    setOpen(false);
  };
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
    <div>
      <div>
        <Tooltip title="Download" placeholder="bottom">         
            <IconButton
              ref={anchorRef}
              aria-controls={open ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            >
              {/* <GetAppSharpIcon /> */}
              <img src={DownloadReports} />
            </IconButton>
          
        </Tooltip>
        <Popper
          open={open && !showFilter}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
          className={classes.root}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom'
              }}
            >
              <Paper className="menupaper">
                <Box py={3} px={5}>
                  <Grid
                    container
                    direction="column"
                    // style={{ maxWidth: '20rem' }}
                    spacing={2}
                  >
                    <Grid item>
                      <Typography variant="subtitle2">
                        Please select format to download report
                      </Typography>
                    </Grid>

                    <Grid item>
                      <FormControl component="fieldset">
                        <FormGroup>
                          {checkBoxlist.value.map((item, index) => {
                            return (
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={item.active}
                                    name={item.code}
                                    size="small"
                                  />
                                }
                                label={item.name}
                                onChange={(e) => handlChange(e, item, index)}
                              />
                            );
                          })}
                        </FormGroup>

                        {Formatselections.value?.pdf && (
                          <FormGroup row>
                            {pdfformatlist.value.map((item, index) => {
                              return (
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={item.active}
                                      name={item.code}
                                      size="small"
                                    />
                                  }
                                  label={item.name}
                                  onChange={(e) =>
                                    handlpdffileChange(e, item, index)
                                  }
                                />
                              );
                            })}
                          </FormGroup>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid item xs>
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-end"
                        spacing={5}
                      >
                        <Grid item>
                          <Button variant="outlined" onClick={handleClose}>
                            Close
                          </Button>
                        </Grid>
                        <Grid item>
                          {Formatselections.value?.csv ? (
                            <CSVLink
                              filename={sumaryCardDetails.value.columnId}
                              data={PartnerSummaryrow}
                              headers={SUMMARY[CardItem].headers}
                            >
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={downloadCsv}
                              >
                                Download
                              </Button>
                            </CSVLink>
                          ) : (
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={download}
                            >
                              Download
                            </Button>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
    </ClickAwayListener>
  );
}
