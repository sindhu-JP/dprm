import React, { useState } from 'react';
import { Trans } from '@lingui/react';
import { makeStyles } from '@material-ui/core/styles';
// import { useSelector } from 'react-redux';
// import Paper from '@material-ui/core/Paper';
// import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
// import Box from '@material-ui/core/Box';
// import Divider from '@material-ui/core/Divider';
// import IconButton from '@material-ui/core/IconButton';
// import TablePagination from '@material-ui/core/TablePagination';
// import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import {Drawer} from '@material-ui/core';
// import Checkbox from '@material-ui/core/Checkbox';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import ErrorIcon from '@material-ui/icons/Error';
// import CloseIcon from '@material-ui/icons/Close';
// import SvgIcon from 'common/components/SvgIcon/SvgIcon';
// import SvgIcon from 'common/components/SvgIcon';
// import img from 'Assets/Icons/Notes.svg';
// import imgD from 'Assets/Icons/NotesD.svg';
import SvgFile from 'lib/components/SvgFile';
// import SvgIcon from "lib/components/SvgIcon";
import _groupBy from 'lodash/groupBy';
import { getPriorityColor } from '../functionalHelper';
// import Filter from 'common/components/Filter/FilterComponent';
// import SVGIcon from 'common/components/SvgIcon';
import { withStyles } from '@material-ui/core/styles';
import _isEmpty from 'lodash/isEmpty';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import { Box, Checkbox, Divider, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  checkbox: {
    margin: theme.spacing(0, 4)
  },
  mainGrid: {
    display: 'flex',
    gap: '30px',
    alignItems: 'center',
    fontSize: '17px',
    paddingTop:'20px'
  },
  listItemIcon: {
    maxWidth: theme.spacing(4)
  },
  errorItem: {
    minWidth: theme.spacing(12)
  },
  note: {
    color: theme.palette.text.primary,
    wordBreak: 'break-word',
    paddingRight: theme.spacing(12)
  },
  noteChecked: {
    textDecoration: 'line-through',
    color: theme.palette.text.primary,
    wordBreak: 'break-word',
    paddingRight: theme.spacing(12)
  },
  drawer: {
    maxWidth: theme.spacing(160),
    minWidth: theme.spacing(160),
    zIndex: '2333'
  },
  closeIcon: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    color: theme.palette.common.black,
    cursor: 'pointer'
  },
  priorityIcon: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    padding: 0,
    margin: 0
  },
  criticalPriority: {
    color: theme.palette.error.main
  },
  highPriority: {
    color: theme.palette.warning.main
  },
  mediumPriority: {
    color: theme.palette.type === 'dark'
    ? `#ffcc00 !important`
    :  `${theme.palette.primary.main} !important`
  },
  lowPriority: {
      color: theme.palette.type === 'dark'
      ? `#ffcc00 !important`
      : `${theme.palette.primary.main} !important`
  },
  divider:{
marginTop:'20px'
  },
  dropdown: {
    position: 'absolute',
    zIndex: 10,
    top: theme.spacing(18),
    right: 0
  },
  paper: {
    padding: 0,
    width: 400
  }
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: theme.palette.error.main,
    top: 0,
    padding: '0 4px'
  }
}))(Badge);

const SideDrawer = ({
  setShowMore,
  notesData,
  handleEdit,
  // loadNotes,
  // user,
  open,
  handleClose,
  priorities = []
}) => {
  const classes = useStyles();
  const notesGroup = _groupBy(notesData, (item1) => {
    return item1.status || 'open';
  });
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [filteropen, setFilterOpen] = useState(false);
  const [filterCount, setFilterCount] = useState(0);
  // const { ThemeType } = useSelector((state) => state.Appearance);
  const [noteType, setNoteType] = useState('');
  const [notesList, setNotesList] = useState([]);
  const [selectedNote, setSelectedNote] = useState('');
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(new Date());

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClickAway = () => {
    setFilterOpen(false);
  };
  const handleClick = () => {
    setFilterOpen((prev) => !prev);
  };
  const onApplyFilter = (params) => {
    const filterTypes = (params.selectedValues || []).map((a) => a.value) || [];
    const count =
      (filterTypes.length ? 1 : 0) +
      (params.fromDate || params.toDate ? 1 : 0) +
      (params.noteValue ? 1 : 0);

    setFilterOpen(false);
    setFilterCount(count);
    setSelectedNote(params.noteValue);
    setFromDate(params.fromDate);
    setToDate(params.toDate);
  };
  const onApplyClear = () => {
    setSelectedNote('');
    setFilterCount(0);
    setFromDate(null);
    setToDate(null);
  };
  const selectedNoteType = (value) => {
    setNoteType(value);
    let filteredNotes = [];
    !_isEmpty(priorities) &&
      priorities.map((item) => {
        filteredNotes.push({
          value: item.code,
          label: item.name
        });
      });
    setNotesList(filteredNotes);
  };
  const getStyle = (note) => {
    if (note.status === 'closed') {
      return {
        textDecoration: 'line-through'
      };
    } else {
      return {};
    }
  };
  const getOpenNotes = () => {
    if (!notesData.length) return null;
    let data = notesData.filter((note) => note.status === 'open');
    return (
      <>
        {data.map((note) => (
          <Grid item spacing={4} className={classes.mainGrid}>
            <span>
              <Checkbox
                checked={note.status === 'closed' ? true : false}
                onChange={(e) =>
                  handleEdit({
                    note,
                    id: note.id,
                    status: note.status === 'closed' ? 'open' : 'closed'
                  })
                }
                // classes={{ root: classes.noteCheckBox }}
                className={classes.priorityIcon}
                classes={{
                  root: classes[getPriorityColor(note.priority)]
                }}
              />
            </span>
            <span>
              <ErrorIcon
                className={classes.priorityIcon}
                classes={{ root: classes[getPriorityColor(note.priority)] }}
              />
            </span>
            <span style={{wordBreak: 'break-word' }}>{note.text}</span>
          </Grid>
        ))}
      </>
    );
  };
  const getClosedNotes = () => {
    if (!notesData.length) return null;
    let data = notesData.filter((note) => note.status === 'closed');
    return (
      <>
        {data.map((note) => (
          <Grid item spacing={4} className={classes.mainGrid}>
            <span>
              <Checkbox
                onChange={(e) =>
                  handleEdit({
                    note,
                    id: note.id,
                    status: note.status === 'closed' ? 'open' : 'closed'
                  })
                }
                checked={note.status === 'closed' ? true : false}
                // classes={{ root: classes.noteCheckBox }}
                className={classes.priorityIcon}
                classes={{
                  root: classes[getPriorityColor(note.priority)]
                }}
              />
            </span>
            <span>
              <ErrorIcon
                className={classes.priorityIcon}
                classes={{ root: classes[getPriorityColor(note.priority)] }}
              />
            </span>
            <span style={{ textDecoration: 'line-through',wordBreak: 'break-word' }}>{note.text}</span>
          </Grid>
        ))}
      </>
    );
  };
  return (
    <Drawer
      anchor="right"
      open     
      PaperProps={{ className: classes.drawer }}
      className={classes.drawer}
      onClose={() => setShowMore(true)}
    >
      <Grid item>
      <Grid container direction="row" alignItems="center" spacing={4}>
        <Grid item xs={1}>
        <SvgFile iconName="my-notes" iconWidth={30} />
        </Grid>
        <Grid item xs={9}>
          <Typography variant="h2">
            <Trans id="My Notes"></Trans>
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <CloseIcon
            className={classes.closeIcon}
            onClick={() => setShowMore(true)}
          />
        </Grid>
        </Grid>
      </Grid>
      {/* <span onClick={() => setShowMore(true)}>
        <CloseIcon>Close</CloseIcon>
      </span> */}
      {/* <Box p={8}>
        <Grid container direction="column" spacing={4}>
          <Grid item xs={12}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item xs={1}>
                <SvgIcon iconName="Notes" iconWidth={25} />
              </Grid>
              <Grid item xs={9}>
                <Typography variant="h2">
                  <Trans id="My Notes"></Trans>
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <ClickAwayListener onClickAway={handleClickAway}>
                  <Grid container alignItems="baseline" spacing={1}>
                    <Grid item>
                      <IconButton onClick={handleClick}>
                        <StyledBadge color="primary" badgeContent={filterCount}>
                          <SvgIcon iconName="Filter" iconWidth={16} />
                        </StyledBadge>
                      </IconButton>
                    </Grid> */}
      {/* {filteropen && (
                      <Grid item className={classes.dropdown}>
                        <Paper className={classes.paper}>
                          <Filter
                            isNotesList={true}
                            onApply={onApplyFilter}
                            onCancel={onApplyClear}
                            selectedNoteType={selectedNoteType}
                            noteType={noteType}
                            notesList={notesList}
                            fromDate={fromDate}
                            toDate={toDate}
                          />
                        </Paper>
                      </Grid>
                    )} */}
      {/* </Grid>
                </ClickAwayListener>
              </Grid>
              <Grid item xs={1}>
                <CloseIcon
                  className={classes.closeIcon}
                  onClick={handleClose}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <List>
              {(notesGroup.open || []).map((note, index) => {
                return (
                  <ListItem key={index} disableGutters>
                    <ListItemIcon className={classes.listItemIcon}>
                      <Checkbox
                        className={classes.checkbox}
                        color="primary"
                        checked={false}
                        onClick={() =>
                          handleEdit({ note, id: note.id, status: 'closed' })
                        }
                      />
                    </ListItemIcon>
                    <ListItemIcon className={classes.errorItem}>
                      <ErrorIcon
                        className={classes.priorityIcon}
                        classes={{
                          root: classes[getPriorityColor(note.priority)]
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      className={classes.note}
                      primary={note.text}
                    />
                  </ListItem>
                );
              })}
            </List>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              component="div"
              count={40}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Grid>
          <Divider />
          <Grid item>
            <List>
              {(notesGroup.closed || []).map((note, index) => {
                return (
                  <ListItem key={index} disableGutters>
                    <ListItemIcon className={classes.listItemIcon}>
                      <Checkbox
                        checked
                        className={classes.checkbox}
                        color="primary"
                        onChange={() =>
                          handleEdit({ note, id: note.id, status: 'open' })
                        }
                      />
                    </ListItemIcon>
                    <ListItemIcon className={classes.listItemIcon}>
                      <ErrorIcon
                        className={classes.priorityIcon}
                        classes={{
                          root: classes[getPriorityColor(note.priority)]
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      className={classes.noteChecked}
                      primary={note.text}
                    />
                  </ListItem>
                );
              })}
            </List>
          </Grid>
        </Grid>
      </Box> */}
      <Divider />
      <Box p={8}>
        <Grid direction="column" spacing={4}>
          {getOpenNotes()}
        </Grid>
        <Divider  className={classes.divider}  />
        <Grid direction="column">{getClosedNotes()}</Grid>
      </Box>
    </Drawer>
  );
};

export default SideDrawer;
