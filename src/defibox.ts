import { JsonRpc } from 'eosjs';
import { Action, Authorization } from 'eosjs/dist/eosjs-serialize';

export async function rewards( rpc: JsonRpc, owner: string, authorization: Authorization[] ): Promise<Action[]> {
    const actions: Action[] = [];
    for ( const contract of ["mine1.defi", "mine3.defi"] ) {
        // user must have dividends
        if ( !await is_dividends( rpc, owner, contract, authorization)) continue;

        // claim action
        actions.push({
            account: contract,
            name: "claim",
            authorization,
            data: {
                from: owner,
            }
        })
    }
    return actions;
}

export async function is_dividends( rpc: JsonRpc, owner: string, contract: string, authorization: Authorization[] ): Promise<Boolean> {
    // params
    const code = contract;
    const scope = contract;
    const table = "dividends"
    const lower_bound = owner;
    const upper_bound = owner;

    // query
    const result = await rpc.get_table_rows({json: true, code, scope, table, lower_bound, upper_bound });

    // empty table
    if (!result.rows.length) return false;

    // must have greater than 0 BOX
    const amount = Number(result.rows[0].quantity.split(" ")[0]);
    if ( !amount ) return false;

    // account has dividends
    return true
}

export async function get_available_claims( rpc: JsonRpc, owner: string, authorization: Authorization[] ): Promise<Action[]> {
    return [...await rewards( rpc, owner, authorization )];
}