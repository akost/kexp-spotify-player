import querystring from 'query-string';
import {isString, isNumber, isEmpty} from 'lodash/lang';
import {random} from 'lodash/number';

const SCOPES = ['user-library-read', 'user-library-modify'];
const AUTH_URL = 'https://accounts.spotify.com/authorize';

const scope = 'user-library-read user-library-modify';
const authUrl = new URL("https://accounts.spotify.com/authorize")


const ACCESS_TOKEN_KEY = 'access_token';
const CODE_VERIFIER_KEY = 'code_verifier';

const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;


const generateRandomString = (length) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
  }

const sha256 = async (plain) => {
  const encoder = new TextEncoder()
  const data = encoder.encode(plain)
  return window.crypto.subtle.digest('SHA-256', data)
}

const base64encode = (input) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

// Navigate the browser to the Spotify auth page
export const navigateToAuth = async (redirectState = {}) => {
  const codeVerifier  = generateRandomString(64);
  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64encode(hashed);

  window.localStorage.setItem(CODE_VERIFIER_KEY, codeVerifier);

  const params =  {
    response_type: 'code',
    client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
    scope,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
    redirect_uri: window.location.origin + '/spotify_callback'
  };

  authUrl.search = new URLSearchParams(params).toString();
  window.location.href = authUrl.toString();

  const urlParams = new URLSearchParams(window.location.search);
  let code = urlParams.get('code');
}


export const getToken = async code => {
  // stored in the previous step
  const codeVerifier = localStorage.getItem('code_verifier');

  const url = "https://accounts.spotify.com/api/token";
  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: 'authorization_code',
      code,
      redirect_uri: window.location.origin + '/spotify_callback',
      code_verifier: codeVerifier,
    }),
  }

  const body = await fetch(url, payload);
  const response = await body.json();
  const accessToken = response.access_token;
  const expiresIn = parseInt(response.expires_in, 10);

  localStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify({
    accessToken,
    expiresAt: Date.now() + expiresIn * 1000
  }));

  localStorage.removeItem(CODE_VERIFIER_KEY);
}

export const getAccessToken = () => {
  let token;
  try {
    token = JSON.parse(window.localStorage.getItem(ACCESS_TOKEN_KEY));
  } catch (err) {
    return null;
  }

  if (isEmpty(token)) return null;
  if (!isString(token.accessToken)) return null;

  if (!isNumber(token.expiresAt) || token.expiresAt < Date.now()) {
    console.log('The spotify access_token is expired');
    return null;
  }
  return token.accessToken;
};

export const validAccessToken = () => {
  if (getAccessToken() !== null) {
    return true;
  }
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  return false;
};
