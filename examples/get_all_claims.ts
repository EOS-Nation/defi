import * as defi from "..";

// params
const chain = "eos";
const dapp = "dmd";
const owner = "myaccount";
const authorization = [{actor: owner, permission: "active"}];

// all claim actions
const actions = defi[chain][dapp].get_all_claims( owner, authorization );

console.log( actions );