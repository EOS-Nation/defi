# `DeFi`

> DeFi for EOS Mainnet

## Install

```bash
$ npm install git+ssh://git@github.com:EOS-Nation/DeFi.git
```

1. `get_all_claims` returns you all the actions (no validation)
2. `get_available_claims` returns you all claimable actions based on `owner` (requires HTTP requests)

## Quick Start

```ts
import * as defi from "defi";

// params
const chain = "eos";
const dapp = "defibox";
const owner = "myaccount";
const authorization = [{actor: owner, permission: "active"}];

// all claim actions
const actions = defi[chain][dapp].get_all_claims( owner, authorization );
console.log(actions);
```

**Requires HTTP requests**

```ts
import { JsonRpc } from 'eosjs';
import * as defi from "defi";

const rpc = new JsonRpc("https://eos.eosn.io", { fetch: require('node-fetch') });

// params
const chain = "eos";
const dapp = "defibox";
const owner = "myaccount";
const authorization = [{actor: owner, permission: "active"}];

(async () => {
    // available claim actions
    const actions = await defi[chain][dapp].get_available_claims( rpc, owner, authorization );
    console.log( actions );
})()
```
