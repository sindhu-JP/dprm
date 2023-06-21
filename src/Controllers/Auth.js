import AuthAPI from 'Http/api/auth';
import { Storage } from 'lib/utils';
import Querystring from 'querystring';
import { createAsyncThunk } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';

const sessionIsValid = async () => {
  const token = await Storage.get('ACCESS_TOKEN');
  const validity = await Storage.get('VALID_TILL');

  const currentTime = new Date().getTime();
  const isExpired = currentTime >= validity;

  if (!token || isExpired) {
    return false;
  } else {
    return true;
  }
};

const restoreSession = createAsyncThunk('auth/restoreSession', async () => {
  const userString = await Storage.get('USER');
  const VALID_TILL = await Storage.get('VALID_TILL');
  const ACCESS_TOKEN = await Storage.get('ACCESS_TOKEN');
  const REFRESH_TOKEN = await Storage.get('REFRESH_TOKEN');
  const loginUser = await Storage.get('loginUser');
  return {
    tokens: {
      VALID_TILL,
      ACCESS_TOKEN,
      REFRESH_TOKEN
    },
    user: JSON.parse(userString),
    loginUser: JSON.parse(loginUser)
  };
});

// Creates oauth url from the provided sso variables.
const createOAuthUrl = (options) => {
  const { url, path, clientId, responseType, redirectUrl, scope, state } =
    options;
  return `${url}${path}?client_id=${clientId}&response_type=${responseType}&redirect_uri=${redirectUrl}&scope=${scope}&state=${state}`;
};

// Extracts necessary sso config and creates the oauth
// url for loggin in.
const initiateLogin = (config) => {
  const {
    oauthUri,
    oauthPathUri,
    oauthClientId,
    oauthResponseType,
    oauthRedirectUri
  } = config;
  const oauthUrl = createOAuthUrl({
    url: oauthUri,
    path: oauthPathUri,
    clientId: oauthClientId,
    responseType: oauthResponseType,
    redirectUrl: oauthRedirectUri,
    scope: 'openid',
    state: 'openid'
  });
  window.location.assign(oauthUrl);
};

// Gets accesss token from the provided auth code
const login = createAsyncThunk(
  'auth/login',
  async ({ details, config }, { dispatch }) => {
    const { oauthClientId, oauthClientSecret, oauthRedirectUri } = config;
    const params = {
      client_id: oauthClientId,
      client_secret: oauthClientSecret,
      // scope: 'openid',
      grant_type: 'authorization_code',
      redirect_uri: oauthRedirectUri,
      code: details.code
    };

    const payload = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: Querystring.stringify(params)
    };

    //

    const devPayload = {
      accessType: 'Agent',
      redirectUri: oauthRedirectUri,
      code: details.code
    };
    //  const   tokens = await AuthAPI.fetchdevToken(devPayload).catch(err=>console.log(err));

    let tokens = '';
    let uri = oauthRedirectUri.includes('http://localhost');
    if (uri) {
      tokens = await AuthAPI.fetchToken({
        config,
        payload
      });
    } else {
      tokens = await AuthAPI.fetchdevToken(devPayload);
    }

    const user = await AuthAPI.ssoUser({
      config,
      token: tokens.access_token
    });

    const expirationTime = JSON.stringify(
      tokens.expires_in * 1000 + new Date().getTime()
    );

    await Storage.set('USER', JSON.stringify(user));
    await Storage.set('authenticated', true);
    await Storage.set('VALID_TILL', expirationTime);
    await Storage.set('ACCESS_TOKEN', tokens.access_token);
    //
    // tItem('ACCESS_TOKEN', tokens.access_token);
    await Storage.set('REFRESH_TOKEN', tokens.refresh_token);

    const username = JSON.parse(localStorage.getItem('USER'));
    const loginUser = await AuthAPI.loginUser({
      username
    });
    await Storage.set('loginUser', loginUser);
    return { tokens, user, loginUser };
  }
);

const logout = async (config) => {
  const revokeURI = `${config.oauthUri}oauth2/revoke`;
  const userPass = `${config.oauthClientId}:${config.oauthClientSecret}`;
  const access_token = await Storage.get('ACCESS_TOKEN');
  const data = new URLSearchParams();

  data.set('token', `${access_token}`);
  data.set('token_type_hint', 'access_token');

  const params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
      Authorization: `Basic ${btoa(userPass)}`
    },
    body: data
  };

  const response = await AuthAPI.revokeToken({
    url: revokeURI,
    params
  });

  const logoutRedirect = `${config.oauthUri}commonauth?commonAuthLogout=true&type=oidc2&commonAuthCallerPath=${config.oauthRedirectUri}&relyingParty=${config.oauthServiceProviderName}`;
  await storage.removeItem('persist:root');
  await Storage.clear();
  window.location.replace(logoutRedirect);
  return;
};

export default {
  login,
  logout,
  initiateLogin,
  restoreSession,
  sessionIsValid
};
