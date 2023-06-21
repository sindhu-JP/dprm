import { Box, Grid, Paper, Typography } from '@material-ui/core';
import NotesContainer from 'Components/NotesContainer/NotesContainer';
import React from 'react';
import SvgFile from 'lib/components/SvgFile';
import dashboardController from '../../Controllers/Dashboard';
import dashboardApi from '../../Http/api/dashboard';
import { connect } from 'react-redux';
import { Trans } from '@lingui/react';
function MyNotes(props) {
  const MyCreateNote = async (text, user, data) => {
    const userData = JSON.parse(localStorage.getItem('USER'));
    const Loginuser = JSON.parse(localStorage.getItem('loginUser'));

    await dashboardApi
      .CreateNote(data, Loginuser.username)
      .then((res) => {
        props.storeAllNotes();
      })
      .catch((err) => {
        return err;
      });
  };
  const notesData = props.dashboardData.allNotes || [];

  const editNote = async (text, user, data) => {
    await dashboardApi
      .editNote(data)
      .then((res) => {
        props.storeAllNotes();
      })
      .catch((err) => {
        return err;
      });
  };

  return (
    <div>
      <Paper elevation={0} style={{ height: 350 }}>
        <Box>
          <Grid container direction="column" spacing={4}>
            <Grid item>
              <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item>
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    spacing={4}
                  >
                    <Grid item>
                      <SvgFile iconName="my-notes" iconWidth={30} />
                    </Grid>
                    <Grid item>
                      <Box pl={2} py={4}>
                        <Typography variant="h2">
                          <Trans id="My Notes">My Notes</Trans>
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <NotesContainer
                MyCreateNote={MyCreateNote}
                customerNotes={notesData}
                editNote={editNote}
              />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </div>
  );
}
export default connect((state) => ({ dashboardData: state.dashboardData }), {
  storeAllNotes: dashboardController.storeAllNotes
})(MyNotes);
