import { Checkbox, Grid, makeStyles ,Button} from '@material-ui/core';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ErrorIcon from '@material-ui/icons/Error';
import { getDateTime, getPriorityColor } from '../functionalHelper';
import ScheduleIcon from '@material-ui/icons/Schedule';
import EditIcon from '../../../Assets/Icons/Edit.svg';
import OfferPopup from './OfferPopup';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    fontSize: '17px',
    // overflowX:'auto'
  },
  divBreakword: {
    wordBreak: 'break-word'
  }
}));



const styles = (theme) => ({
  strikeThrough: {
    textDecorationLine: 'line-through',
    wordBreak: 'break-word'
  },
  time: {
    color: theme.palette.error.main
  },
  noteCheckBox: {
    padding: 'unset'
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
      : `${theme.palette.primary.main} !important`
  },
  lowPriority: {
    color: theme.palette.type === 'dark'
      ? `#ffcc00 !important`
      : `${theme.palette.primary.main} !important`
  },
  watchIcon: {
    verticalAlign: 'sub',  
  },
  wordBreak: {
    wordBreak: 'break-word'
  }
});
const NotesListNew = (props) => { 
  const { classes, notesData } = props;
  const handleCheckBox = (e, note, noteId) => {
    props.onEdit({
      note,
      id: note.id,
      status: note.status === 'closed' ? 'open' : 'closed'
    });
  };
  const getStyle = (note) => {
    if (note.status === 'closed') {
      return {
        textDecoration: 'line-through',

      };
    } else {
      return {};
    }
  };
  const classess = useStyles();
  return (
    <>
      {!notesData.length ? <p>no notes</p> : null}
      {notesData.map((note) => (
        <Grid item direction="column" key={note.id} style={{ marginTop: '10px' }} >
          <Grid item direction="row" className={classess.mainGrid} style={{ margin: '20px 0 10px 0' }}  >
            <span >{getDateTime(note.endDate, 'DD MMM YYYY')}   </span>
            <span style={{  paddingLeft:'30px'}}><ScheduleIcon  className={classess.watchIcon}  /></span>
            <span>{getDateTime(note.endDate, 'hh:mm:ss A')}</span>
        
          </Grid>
          <Grid item direction="row" className={classess.mainGrid} style={{width:'80%',justifyContent:'space-between'}}>
            <Grid style={{display:'flex',justifyContent:'space-between'}}>
            <span>
              <Checkbox onChange={(e) => handleCheckBox(e, note, note.id)} checked={note.status === 'closed' ? true : false}
                classes={{ root: classes.noteCheckBox }} />
            </span>
            <span>
              <ErrorIcon
                classes={{ root: classes[getPriorityColor(note.priority)] }}
              />
            </span>
            <span style={getStyle(note)} className={classess.divBreakword}>{note.text}</span>
            </Grid>
          
            <Grid style={{display:'flex',justifyContent:'space-between'}}>
            <span>
            <Button style={{background:'#ffcb05',borderRadius:'30px',padding:'0px 15px'}}>Open</Button>
          </span>
          <span style={{marginLeft:'20px',cursor:'pointer'}}>
            <img src={EditIcon} alt='editIcon'/>
          </span>
            </Grid>
          </Grid>         
        </Grid>
      ))}
      <OfferPopup/>
    </>
  );
};
export default withStyles(styles)(NotesListNew);
