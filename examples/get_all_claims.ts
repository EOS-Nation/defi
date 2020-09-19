import { JsonRpc } from 'eosjs';
import * as defi from "..";

// nodeos
const rpc = new JsonRpc("https://eos.eosn.io", { fetch: require('node-fetch') });

// params
const chain = "eos";
const dapp = "defibox";
const owner = "myaccount";
const authorization = [{actor: owner, permission: "active"}];

(async () => {
    // all claim actions
    const actions = await defi[chain][dapp].get_all_claims( rpc, owner, authorization );

    console.log( actions );
})()