import { JsonRpc } from 'eosjs';
import * as defi from "..";

// nodeos
const rpc = new JsonRpc("https://eos.eosn.io", { fetch: require('node-fetch') });

// params
const chain = "eos";
const dapp = "tag";
const owner = "111111111dwd";
const authorization = [{actor: owner, permission: "active"}];

(async () => {
    // available claim actions
    const actions = await defi[chain][dapp].get_available_claims( rpc, owner, authorization );

    console.log( actions );
    console.log( defi[chain][dapp].tokens );
})()