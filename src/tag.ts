import { JsonRpc } from 'eosjs';
import { Action, Authorization } from 'eosjs/dist/eosjs-serialize';
import { TAG, Token } from "./tokens";

export const contracts = ["tagtokenfarm"];
export const tokens: Token[] = [ TAG ];


export async function is_farmer( rpc: JsonRpc, owner: string ): Promise<boolean> {
    // params
    const code = "tagtokenfarm";
    const scope = "tagtokenfarm";
    const table = "farmers";
    const upper_bound = owner;
    const lower_bound = owner;

    // query
    const result = await rpc.get_table_rows({json: true, code, scope, table, limit: 1, upper_bound, lower_bound });
    return Boolean(result.rows.length);
}

export async function rewards( rpc: JsonRpc, owner: string, authorization: Authorization[] ): Promise<Action[]> {
    // results
    const actions = [];

    if ( await is_farmer( rpc, owner ) ) {
        // claim action
        actions.push({
            account: contracts[0],
            name: "harvest",
            authorization,
            data: {
                farmer: owner,
            }
        })
    }
    return actions;
}

export async function get_available_claims( rpc: JsonRpc, owner: string, authorization: Authorization[] ): Promise<Action[]> {
    return [ ...await rewards( rpc, owner, authorization ) ];
}