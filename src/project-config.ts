/* eslint-disable @typescript-eslint/consistent-type-assertions */
const API_HOST = import.meta.env.VITE_API_HOST as string;
const AUTH_HOST = import.meta.env.VITE_AUTH_HOST as string;
const PROJECT_KEY = import.meta.env.VITE_PROJECT_KEY as string;
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID as string;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET as string;
const SCOPES = import.meta.env.VITE_SCOPES as string;

export { API_HOST, AUTH_HOST, PROJECT_KEY, CLIENT_ID, CLIENT_SECRET, SCOPES };
