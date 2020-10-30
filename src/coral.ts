import { JsonRpc } from 'eosjs';
import { Action, Authorization } from 'eosjs/dist/eosjs-serialize';
import { get_pools, is_unclaimed } from "./wool";
import { CRL, Token } from "./tokens";

export const contracts = ["eoscoralpool"];
export const tokens: Token[] = [ CRL ];

export async function rewards( rpc: JsonRpc, owner: string, authorization: Authorization[] ): Promise<Action[]> {
    // results
    const actions = [];
    for ( const pool_id of await get_pools( rpc, contracts[0] ) ) {
        // must have unclaimed rewards
        if ( !await is_unclaimed( rpc, owner, contracts[0], pool_id, "miners" ) ) continue;

        // claim action
        actions.push({
            account: contracts[0],
            name: "claim",
            authorization,
            data: {
                owner,
                pool_id,
            }
        })
    }
    return actions;
}

export async function get_available_claims( rpc: JsonRpc, owner: string, authorization: Authorization[] ): Promise<Action[]> {
    return [ ...await rewards( rpc, owner, authorization ) ];
}