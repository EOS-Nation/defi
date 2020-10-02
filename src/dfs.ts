import { JsonRpc } from 'eosjs';
import { Action, Authorization } from 'eosjs/dist/eosjs-serialize';
import { DFS, Token } from "./tokens";

export const tokens: Token[] = [ DFS ];

export async function liquidity( rpc: JsonRpc, owner: string, authorization: Authorization[] ): Promise<Action[]> {
    // params
    const code = "miningpool11";
    const scope = "miningpool11";
    const table = "weights"

    // query
    const result = await rpc.get_table_rows({json: true, code, scope, table, limit: 500 });

    // results
    const actions = [];
    for ( const row of result.rows ) {
        // must have DFS liquidity
        if ( !await is_liquidity( rpc, row.mid, owner ) ) continue;

        // claim action
        actions.push({
            account: "miningpool11",
            name: "claim",
            authorization,
            data: {
                user: owner,
                mid: row.mid,
            }
        })
    }
    return actions;
}

export async function is_liquidity( rpc: JsonRpc, mid: number, owner: string ): Promise<Boolean> {
    // params
    const code = "defisswapcnt";
    const scope = mid;
    const table = "liquidity"
    const lower_bound = owner;
    const upper_bound = owner;

    // query
    const result = await rpc.get_table_rows({json: true, code, scope, table, lower_bound, upper_bound });

    // empty table
    if (!result.rows.length) return false;

    // must have greater than 0 token
    if ( !result.rows[0].token ) return false;

    // account has liquidity
    return true;
}

export async function get_available_claims( rpc: JsonRpc, owner: string, authorization: Authorization[] ): Promise<Action[]> {
    return [...await liquidity( rpc, owner, authorization )];
}