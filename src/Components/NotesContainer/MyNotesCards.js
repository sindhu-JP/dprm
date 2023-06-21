import React, { useState } from 'react';
import {  withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { Trans } from '@lingui/react';
import _orderBy from 'lodash/orderBy';
import Utils from 'Factory/Utils';
// import classNames from 'classnames';
// import { lockBodyScroll, unlockBodyScroll } from 'common/utils/commonUtility';
import CreateNote from './components/CreateNote';
// import NotesList from './components/NotesList';
import SideDrawer from './components/SideDrawer';
// import { getSortedGroupData } from './functionalHelper';
import NotesListNew from './components/NotesListNew';

const styles = () => ({
  noPadding: {
    padding: '0 !important'
  },
  colorMTN: {
    color:'#ffcb05',
    '&.MuiTypography-body1':{
      color:'#ffcb05'
    }
    
  },
  colorSTC: {
    '&.MuiTypography-body1':{
      color:'#000000'
    }
  },
  seeMoreBtn:{
    display:'flex',
    alignItems:'center',
    paddingTop:'10px !important',
    marginTop:'-20px'
  },
  colorMTNN: {
    color:'#ffcb05',
    cursor:'pointer'
  }

});

const addNoteHeading = <Trans id="Add note here"></Trans>;
const seeAllNotes = <Trans id="See All Notes"></Trans>;
const hideNotes = <Trans id="Hide Notes"></Trans>;

const MyNotesCards = ({
  notesData = [],

  priorities,
  addNewNote,
  handleEdit,
  maxShowCount = 2,
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

  const handleClose = () => {
    setShowMore(true);
    loadNotes(user);
  };
  const getSortedData = () => {
    const clonedNotesData = [...notesData];
    // sort the data and will take top 4 data only
    const sortedData = _orderBy(
      clonedNotesData,
      ['createdDate'],
      ['desc']
    ).splice(0, maxShowCount ? maxShowCount - 1 : 0);
    return sortedData;
  };

  return (
    <>
      {/* <CreateNote onSave={onSave} onCancel={onCancel} priorities={priorities} /> */}
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
          <Grid item onClick={() => setEditMode(true)} >
            <Typography variant="body1" className={classes.colorMTN} >{addNoteHeading}</Typography>
          </Grid>):  (<Grid item onClick={() => setEditMode(true)} >
            <Typography variant="body1" className={classes.colorSTC} >{addNoteHeading}</Typography>
          </Grid>)}
          <Grid item>
            <Divider />
          </Grid>
          <Grid
            item
            // className={classNames({
            //   [classes.noPadding]: (notesData || []).length === 1
            // })}
          >
            {/* <NotesList
              notesData={getSortedGroupData(notesData, maxShowCount)}
              onEdit={handleEdit}
            /> */}
            <NotesListNew
              onEdit={handleEdit}
              notesData={getSortedData(maxShowCount)}
            />
          </Grid>
          {notesData.length > 0 && notesData.length >= maxShowCount ? (
            <Grid item className={classes.seeMoreBtn}>
              <Button
                style={{ paddingButton: '5px' }}
                color="primary"
                // endIcon={<ArrowDownwardIcon />}
                onClick={viewMoreNotes}
              >
                {showMore ? <span className={classes.colorMTN}> {seeAllNotes} </span> : hideNotes}
              </Button>
              <ArrowDownwardIcon  onClick={viewMoreNotes} className={classes.colorMTNN} />
            </Grid>
          ) : null}
        </Grid>
      )}
      {!showMore && (
        <SideDrawer
          notesData={_orderBy(notesData, ['createdDate'], ['desc'])}
          open
          setShowMore={setShowMore}
          // addNewNote={addNewNote}
          handleEdit={handleEdit}
          // loadNotes={()=>{}}
          // user={user}
          // priorities={priorities}
          handleClose={handleClose}
        />
      )}
    </>
  );
};

export default withStyles(styles)(MyNotesCards);
