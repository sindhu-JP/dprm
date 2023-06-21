import React from 'react';
import _ from 'lodash';
import config from 'config';
import Querystring from 'querystring';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import AuthController from 'Controllers/Auth';
import { Grid, Typography } from '@material-ui/core';
import Logo from '../../Components/Logo'

const Login = ({ login, authState, location }) => {
 
  React.useEffect(() => {
    if (location && location.search) {
      let params = Querystring.parse(location.search.split('?')[1]);
      login({ details: params, config: config.sso });
    } else {
      AuthController.initiateLogin(_.get(config, 'sso', {}));
    }
  }, [location]);

  return (
    <Grid
      style={{ width: '100vw', height: '100vh' }}
      container
      direction="column"
      alignItems="center"
      justify="center"
    >
      <Grid item>
        {authState.loading || !authState.authenticated ? (
          <>
          <Logo clickHandler ={()=>{}}/>
          <Typography variant="h2" style={{textAlign:"center"}}>Just a sec ...</Typography>
          </>

        ) : (
          <Redirect to={config.basePath} />
        )}
      </Grid>
    </Grid>
  );
};

export default connect((state) => ({ authState: state.auth }), {
  login: AuthController.login
})(withRouter(Login));
