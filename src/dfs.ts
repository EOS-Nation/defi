import { JsonRpc } from 'eosjs';
import { Action, Authorization } from 'eosjs/dist/eosjs-serialize';

export async function get_all_claims( rpc: JsonRpc, owner: string, authorization: Authorization[] ): Promise<Action[]> {
    // params
    const code = "miningpool11";
    const scope = "miningpool11";
    const table = "weights"

    // query
    const result = await rpc.get_table_rows({json: true, code, scope, table, limit: 500 });

    // results
    const actions = [];
    for ( const row of result.rows ) {
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

export async function get_available_claims( rpc: JsonRpc, owner: string, authorization: Authorization[] ): Promise<Action[]> {
    const claims: Action[] = [];
    for ( const action of await get_all_claims( rpc, owner, authorization )) {
        // params
        const code = "defisswapcnt";
        const scope = action.data.mid;
        const table = "liquidity"
        const lower_bound = owner;
        const upper_bound = owner;

        // query
        const result = await rpc.get_table_rows({json: true, code, scope, table, lower_bound, upper_bound });

        // empty table
        if (!result.rows.length) continue;

        // must have greater than 0 token
        const token = result.rows[0].token;
        if ( !token ) continue;

        // approved claim
        claims.push( action );
    }
    return claims;
}