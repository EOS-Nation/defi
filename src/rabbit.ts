import { JsonRpc } from 'eosjs';
import { Action, Authorization } from 'eosjs/dist/eosjs-serialize';
import { is_unclaimed, get_pools } from "./wool";

export async function rewards( rpc: JsonRpc, owner: string, authorization: Authorization[] ): Promise<Action[]> {
    // results
    const actions = [];

    for ( const contract of ["carrotliquid", "carrotstakes"]) {
        for ( const pool_id of await get_pools( rpc, contract ) ) {
            // must have unclaimed rewards
            if ( !await is_unclaimed( rpc, owner, contract, pool_id ) ) continue;

            // claim action
            actions.push({
                account: contract,
                name: "claim",
                authorization,
                data: {
                    owner,
                    pool_id,
                }
            })
        }
    }
    return actions;
}

export async function get_available_claims( rpc: JsonRpc, owner: string, authorization: Authorization[] ): Promise<Action[]> {
    return [ ...await rewards( rpc, owner, authorization ) ];
}