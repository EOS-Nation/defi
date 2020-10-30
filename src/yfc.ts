import { JsonRpc } from 'eosjs';
import { Action, Authorization } from 'eosjs/dist/eosjs-serialize';
import * as dfs from './dfs';
import { YFC, Token } from "./tokens";

export const contracts = ["yfcfishponds"];
export const tokens: Token[] = [ YFC ];

export async function liquidity( rpc: JsonRpc, owner: string, authorization: Authorization[] ): Promise<Action[]> {
    // params
    const code = contracts[0];
    const scope = "yfcfishponds";
    const table = "ponds"

    // query
    const result = await rpc.get_table_rows({json: true, code, scope, table, limit: 500 });

    // results
    const actions = [];
    for ( const row of result.rows ) {
        // end epoch time must not exceed current time
        const now = Math.round(new Date().getTime() / 1000);
        const end = Math.round(new Date(row.end + "Z").getTime() / 1000);
        if ( now >= end ) continue;

        // must have DFS liquidity
        if ( !await dfs.is_liquidity( rpc, row.id, owner ) ) continue;

        // claim action
        actions.push({
            account: contracts[0],
            name: "fishing",
            authorization,
            data: {
                id: row.id,
                user: owner,
            }
        })
    }
    return actions;
}

export async function get_available_claims( rpc: JsonRpc, owner: string, authorization: Authorization[] ): Promise<Action[]> {
    return [...await liquidity( rpc, owner, authorization )];
}