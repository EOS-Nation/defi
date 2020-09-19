import { JsonRpc } from 'eosjs';
import * as defi from "../dist";

const rpc = new JsonRpc("https://eos.eosn.io", { fetch: require('node-fetch') });

// params
const chain = "eos";
const dapp = "dmd";
const owner = "myaccount";
const authorization = [{actor: owner, permission: "active"}];

(async () => {
    // available claim actions
    const actions = await defi[chain][dapp].get_available_claims( rpc, owner, authorization );

    console.log( actions );
})()