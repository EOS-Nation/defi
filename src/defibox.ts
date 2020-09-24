import { JsonRpc } from 'eosjs';
import { Action, Authorization } from 'eosjs/dist/eosjs-serialize';

export async function generation( rpc: JsonRpc, owner: string, authorization: Authorization[] ): Promise<Action[]> {
    const contract = "mine3.defi";

    // user must have dividends
    if ( !await is_dividends( rpc, owner, contract ) ) return [];

    // claim action
    return [{
        account: contract,
        name: "claim",
        authorization,
        data: {
            owner,
        }
    }]
}

export async function lptoken( rpc: JsonRpc, owner: string, authorization: Authorization[] ): Promise<Action[]> {
    const contract = "lptoken.defi";

    // user must have dividends
    if ( !await is_rewards( rpc, owner, contract )) return [];

    // claim action
    return [{
        account: contract,
        name: "claim",
        authorization,
        data: {
            owner,
        }
    }]
}

export async function is_rewards( rpc: JsonRpc, owner: string, contract: string ): Promise<Boolean> {
    // params
    const code = contract;
    const scope = contract;
    const table = "rewards"
    const lower_bound = owner;
    const upper_bound = owner;

    // query
    const result = await rpc.get_table_rows({json: true, code, scope, table, lower_bound, upper_bound });

    // empty table
    if (!result.rows.length) return false;

    // must have greater than 0 unclaimed
    const unclaimed = Number(result.rows[0].unclaimed);
    if ( !unclaimed ) return false;

    // account has dividends
    return true
}

export async function is_dividends( rpc: JsonRpc, owner: string, contract: string ): Promise<Boolean> {
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
    return [...await generation( rpc, owner, authorization ), ...await lptoken( rpc, owner, authorization )];
}