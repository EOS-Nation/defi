import { JsonRpc } from 'eosjs';
import { Action, Authorization } from 'eosjs/dist/eosjs-serialize';
import { DAD, Token } from "./tokens";

export const tokens: Token[] = [ DAD ];

export async function liquidity( rpc: JsonRpc, owner: string, authorization: Authorization[] ): Promise<Action[]> {
    const contract = "dadtokenissu";

    // user must have dividends
    if ( !await is_claim( rpc, owner, contract ) ) return [];

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

export async function is_claim( rpc: JsonRpc, owner: string, contract: string ): Promise<Boolean> {
    // params
    const code = contract;
    const scope = contract;
    const table = "claimtab2"
    const lower_bound = owner;
    const upper_bound = owner;

    // query
    const result = await rpc.get_table_rows({json: true, code, scope, table, lower_bound, upper_bound });

    // empty table
    if (!result.rows.length) return false;

    // must have greater than 0 issue amount
    const amount = Number(result.rows[0].issuedamt.split(" ")[0]);
    if ( !amount ) return false;

    // account has dividends
    return true
}

export async function get_available_claims( rpc: JsonRpc, owner: string, authorization: Authorization[] ): Promise<Action[]> {
    return [ ...await liquidity( rpc, owner, authorization ) ];
}