import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Utils from 'Factory/Utils';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { Trans } from '@lingui/react';
import classNames from 'classnames';
// import { lockBodyScroll, unlockBodyScroll } from 'common/utils/commonUtility';
import CreateNote from './components/CreateNote';
import NotesList from './components/NotesList';
// import SideDrawer from './components/SideDrawer';
import { getSortedGroupData } from './functionalHelper';

const styles = () => ({
  noPadding: {
    padding: '0 !important'
  },
  colorMTN: {
    color:'#ffcb05'
  },
  colorSTC: {
    color:'#000000'
  }
});

const addNoteHeading = <Trans id="Add note here"></Trans>;

const NotesCard = ({
  notesData = [],
  priorities,
  addNewNote,
  handleEdit,
  maxShowCount = 4,
  loadNotes,
  user,
  classes
}) => {
  const [editMode, setEditMode] = useState(false);
  const [showMore, setShowMore] = useState(true);

  const onSave = (data) => {
    addNewNote(data);
    setEditMode(false);
  };

  const onCancel = () => {
    setEditMode(false);
  };

  const viewMoreNotes = () => {
    setShowMore(!showMore);
  };

  // if (!showMore) {
  //   // lockBodyScroll();
  // } else {
  //   // unlockBodyScroll();
  // }
  const handleClose = () => {
    setShowMore(true);
    loadNotes(user);
  };

  return (
    <>
      {editMode ? (
        <>
          <CreateNote
            onSave={onSave}
            onCancel={onCancel}
            priorities={priorities}
          />
        </>
      ) : (
        <Grid container spacing={3} direction="column" alignContent="stretch">
             {Utils.Opcochanges() ? (
          <Grid item onClick={() => setEditMode(true)} className={classes.colorMTN} >
            <Typography variant="body1">{addNoteHeading}</Typography>
          </Grid>):  (<Grid item onClick={() => setEditMode(true)} className={classes.colorSTC} >
            <Typography variant="body1">{addNoteHeading}</Typography>
          </Grid>)}
          <Grid item>
            <Divider />
          </Grid>
          <Grid
            item
            className={classNames({
              [classes.noPadding]: (notesData || []).length === 1
            })}
          >
            <NotesList
              notesData={getSortedGroupData(notesData, maxShowCount)}
              onEdit={handleEdit}
            />
          </Grid>
          {notesData.length > 0 && notesData.length >= maxShowCount ? (
            <Grid item>
              <Button
                color="primary"
                endIcon={<ArrowDownwardIcon fontSize="small" />}
                onClick={viewMoreNotes}
              >
                {showMore ? 'See All Notes' : 'Hide Notes'}
              </Button>
            </Grid>
          ) : null}
        </Grid>
      )}
      {/* {!showMore && (
        <SideDrawer
          notesData={_orderBy(notesData, ['createdDate'], ['desc'])}
          open
          setShowMore={setShowMore}
          addNewNote={addNewNote}
          handleEdit={handleEdit}
          loadNotes={loadNotes}
          user={user}
          priorities={priorities}
          handleClose={handleClose}
        />
      )} */}
    </>
  );
};

export default withStyles(styles)(NotesCard);
