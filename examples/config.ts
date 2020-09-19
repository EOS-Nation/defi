import { JsonRpc } from 'eosjs';

// Nodeos
export const endpoint = process.env.NODEOS_ENDPOINT || "http://localhost:8888";
export const rpc = new JsonRpc(endpoint, { fetch: require('node-fetch') });