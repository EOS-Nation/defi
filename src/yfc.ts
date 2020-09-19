import { JsonRpc } from 'eosjs';
import { Action, Authorization } from 'eosjs/dist/eosjs-serialize';

export async function get_all_claims( rpc: JsonRpc, owner: string, authorization: Authorization[] ): Promise<Action[]> {
    // params
    const code = "yfcfishponds";
    const scope = "yfcfishponds";
    const table = "ponds"

    // query
    const result = await rpc.get_table_rows({json: true, code, scope, table, limit: 500 });

    // results
    const actions = [];
    for ( const row of result.rows ) {
        // must supply must be less than max supply
        const supply = Number(row.supply.split(" ")[0]);
        const max_supply = Number(row.max_supply.split(" ")[0]);
        if ( supply >= max_supply ) continue;

        // claim action
        actions.push({
            account: "yfcfishponds",
            name: "claim",
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
    const claims: Action[] = [];
    for ( const action of await get_all_claims( rpc, owner, authorization )) {
        // params
        const code = "defisswapcnt";
        const scope = action.data.id;
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