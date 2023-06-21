import React from 'react';
import {
  Paper,
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  makeStyles
} from '@material-ui/core';
import { useForm } from 'Hooks/Form';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[200],
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    padding: theme.spacing(10),
    width: theme.spacing(70)
  }
}));
const Login = ({ loading, error, onLogin }) => {
  const classes = useStyles();
  const form = useForm({
    initialState: {
      username: '',
      password: ''
    },
    rules: {
      username: 'required',
      password: 'required'
    },
    onSuccess: onLogin
  });

  return (
    <Box className={classes.root}>
      <Paper
        className={classes.paper}
        variant="rounded"
        square={false}
        elevation={0}
      >
        <Grid container direction="column" justify="center" spacing={6}>
          <Grid item>
            <Typography variant="h5">Login</Typography>
          </Grid>
          <Grid item>
            <Grid container direction="column" spacing={4}>
              {error && (
                <Grid item>
                  <Typography color="error" variant="subtitle2">
                    {error}
                  </Typography>
                </Grid>
              )}
              <Grid item>
                <TextField
                  fullWidth
                  label="Username"
                  variant="outlined"
                  name="username"
                  value={form.value.username}
                  onChange={form.update}
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  type="password"
                  label="Password"
                  variant="outlined"
                  name="password"
                  value={form.value.password}
                  onChange={form.update}
                />
              </Grid>

              <Grid item>
                <Button
                  color="primary"
                  size="large"
                  type="submit"
                  fullWidth
                  variant="contained"
                  onClick={form.submit}
                  disabled={!form.canSubmit}
                  endIcon={<NavigateNext />}
                >
                  {loading ? 'Authenticating ...' : 'Login'}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Login;
