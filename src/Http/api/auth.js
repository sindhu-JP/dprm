import Querystring from 'querystring';

import axios from 'axios';
import config from 'config';
import { TecnotreedigitalSales } from '../../Http/axios';
const handleError = (response) => {
  if (!response.ok && response.status !== 400) {
    throw Error(response.statusText);
  }
  return response.json();
};

const fetchToken = async ({ config, payload }) => {
  const url = `${config.oauthUri}oauth2/token`;
  return await fetch(url, payload)
    .then((res) => handleError(res))
    .then((res) => res);
};
const fetchdevToken = async (devpayload) => {
  return await axios
    .post(
      `${config.dev.server.dlpm_base_url}/digital-partnership-management/digital-partnership-management-back-end-dynamic-forms/sso/authenticate`,
      devpayload
    )
    .then((res) => res.data);
};

const refreshToken = async ({ config, refreshToken }) => {
  const { oauthscope, redirectState, oauthClientId, oauthClientSecret } =
    config;

  const encodedData = window.btoa(
    `${oauthClientId}` + ':' + `${oauthClientSecret}`
  );
  const params = {
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    scope: oauthscope || 'openid',
    state: redirectState || 'refreshToken'
  };
  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${encodedData}`
    },
    body: Querystring.stringify(params)
  };

  return await fetchToken({ config, payload });
};

const revokeToken = async ({ url, params }) => {
  return await fetch(url, params).then((res) => res);
};

const ssoUser = async ({ token, config }) => {
  const params = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };

  return await fetch(`${config.oauthUri}oauth2/userinfo?schema=openid`, params)
    .then((res) => handleError(res))
    .then((res) => res);
};

const loginUser = async ({ username }) => {
  const params = {
    username: username.sub
    // headers: {
    //   Authorization: `Bearer ${token}`,
    //   'Content-Type': 'application/json'
    // }
  };

  return await TecnotreedigitalSales.post(`/auth/secure/login`, params).then(
    (res) => res.data
  );
};

export {
  fetchToken,
  ssoUser,
  refreshToken,
  revokeToken,
  fetchdevToken,
  loginUser
};
export default {
  fetchToken,
  ssoUser,
  refreshToken,
  revokeToken,
  fetchdevToken,
  loginUser
};
