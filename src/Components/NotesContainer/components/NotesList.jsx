import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import List from '@material-ui/core/List';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ErrorIcon from '@material-ui/icons/Error';
import _sortBy from 'lodash/sortBy';
import { getDateTime, getPriorityColor } from '../functionalHelper';

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
    color: theme.palette.text.primary
  },
  lowPriority: {
    color: theme.palette.info.main
  },
  watchIcon: {
    verticalAlign: 'sub'
  },
  wordBreak: {
    wordBreak: 'break-word'
  }
});

const getListSubHeading = (dateTime, styleClass) => (
  <Grid alignItems="center" container spacing={3} direction="row">  
    <Grid item>
      <Typography variant="button">
        {getDateTime(dateTime, 'DD MMM YYYY')}
      </Typography>
    </Grid>
    <Grid item>
      <Grid container spacing={2} alignItems="baseline">
        <Grid item>
          <AccessTimeIcon className={styleClass.watchIcon} />
        </Grid>
        <Grid item>
          <Typography
            className={classNames({
              [styleClass.time]: new Date(dateTime) > new Date()
            })}
            variant="button"
          >
            {getDateTime(dateTime, 'hh:mm a')}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

const getNote = (note, styleClass, onEdit) => {
  return (
    <Grid container spacing={3} alignItems="center">
      <Grid item xs={1}>
        <Checkbox
          color="default"
          checked={note.status === 'closed'}
          tabIndex={-1}
          disableRipple
          onChange={() =>
            onEdit({
              note,
              id: note.id,
              status: note.status === 'closed' ? 'open' : 'closed'
            })
          }
          classes={{ root: styleClass.noteCheckBox }}
        />
      </Grid>
      <Grid item xs={1}>
        <ErrorIcon
          classes={{ root: styleClass[getPriorityColor(note.priority)] }}
        />
      </Grid>
      <Grid item xs={10}>
        <Tooltip
          title={note.text.length > 79 ? note.text : ''}
          placement="bottom"
        >
          {note.status === 'closed' ? (
            <Typography className={styleClass.strikeThrough} variant="body1">
              {note.text.substr(0, 79)}
            </Typography>
          ) : (
            <Typography variant="body1" className={styleClass.wordBreak}>
              {note.text.substr(0, 79)}
            </Typography>
          )}
        </Tooltip>
      </Grid>
    </Grid>
  );
};

const getSubList = (heading, notes, styleClass, onEdit) => {
  const sortedNotes = _sortBy(notes, 'priority', 'DESCENDING');
  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListItem key="subheader">
          {getListSubHeading(heading, styleClass)}
        </ListItem>
      }
      key={heading}
    >
      {sortedNotes.map((note) => (
        <ListItem key={note.id}>{getNote(note, styleClass, onEdit)}</ListItem>
      ))}
    </List>
  );
};

const NotesList = ({ notesData, onEdit, classes }) => {
  return (
    <Grid container direction="column">
      {Object.keys(notesData).map((noteKey, idx) => {
        return (
          <Grid item key={idx}>         
            {getSubList(noteKey, notesData[noteKey], classes, onEdit)}
          </Grid>
        );
      })}
    </Grid>
  );
};

NotesList.propTypes = {
  notesData: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired
};

NotesList.defaultProps = {};

export default withStyles(styles)(NotesList);
