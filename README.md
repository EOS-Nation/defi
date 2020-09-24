# `defi`

> DeFi utility for EOS Mainnet

## Install

```bash
$ npm install git+ssh://git@github.com:EOS-Nation/defi.git
```

## DAPPS

- `coral`
- `defibox`
- `dfs`
- `dmd`
- `wool`
- `yfc`

## Actions

1. `get_all_claims` returns you all the claimable actions

## Quick Start

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
