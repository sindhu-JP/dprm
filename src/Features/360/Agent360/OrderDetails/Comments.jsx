import React from 'react';
import { Box, Grid, Paper, Typography, makeStyles } from '@material-ui/core';

import User from 'Assets/Icons/User-Profile-Img.svg';
import { TextField } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold
  },
  textarea: {
    width: '100%',
    // padding: '5px',
    '& input': {
      backgroundColor: '#e2e2e2'
    }
  },
  root: {
    width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));
const Comments = ({ values }) => {
  const classes = useStyles();
  return (
    <Paper elevation={0}>
      <Box p={4}>
        <Box mb={4}>
          <Grid container direction="row" spacing={4}>
            <Grid item>
              <img src={User} />
            </Grid>
            <Grid item>
              <Typography variant="h2" className={classes.title}>
                Comments
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box py={5}>
          <Grid container mt={10}>
            <TextField
              placeholder="Add a comment..."
              variant="outlined"
              name="comment"
              fullWidth
              // onChange={handleComment}
              className={classes.textarea}
              type="text"
              name="textMsg"
              //   value={textMsg}
              //   onKeyDown={keyPress}
              //   onChange={(e) => handleChange(e.target.value)}
            />
          </Grid>
        </Box>

        <Grid container direction="colmuns" spacing={4}>
          <Grid item xs>
            <List className={classes.root}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar
                  // alt={`Avatar n°${value + 1}`}
                  // src={`/static/images/avatar/${value + 1}.jpg`}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary="John Smith"
                  secondary="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam semper, nisl nec lacinia gravida"
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default Comments;
