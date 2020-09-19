import { JsonRpc } from 'eosjs';
import { Action, Authorization } from 'eosjs/dist/eosjs-serialize';

export async function rewards( rpc: JsonRpc, owner: string, authorization: Authorization[] ): Promise<Action[]> {
    // results
    const actions = [];

    for ( const contract of ["woolfilppool", "woolfinfarms"]) {
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

export async function get_pools( rpc: JsonRpc, contract: string ): Promise<number[]> {
    // params
    const code = contract;
    const scope = contract;
    const table = "pools"

    // query
    const result = await rpc.get_table_rows({json: true, code, scope, table, limit: 500 });
    return result.rows.map((row: any) => row.id);
}

export async function is_unclaimed( rpc: JsonRpc, owner: string, contract: string, pool_id: number ): Promise<Boolean> {
    // params
    const code = contract;
    const scope = pool_id;
    const table = "miners"
    const lower_bound = owner;
    const upper_bound = owner;

    // query
    const result = await rpc.get_table_rows({json: true, code, scope, table, lower_bound, upper_bound });

    // empty table
    if (!result.rows.length) return false;

    // must have greater than 0 unclaimed
    const amount = Number(result.rows[0].unclaimed.split(" ")[0]);
    if ( !amount ) return false;

    // account has unclaimed
    return true;
}

export async function get_available_claims( rpc: JsonRpc, owner: string, authorization: Authorization[] ): Promise<Action[]> {
    return [ ...await rewards( rpc, owner, authorization ) ];
}