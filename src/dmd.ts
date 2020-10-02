import { JsonRpc } from 'eosjs';
import { Action, Authorization } from 'eosjs/dist/eosjs-serialize';
import { DMD, Token } from "./tokens";

export const tokens: Token[] = [ DMD ];

export async function rewards( rpc: JsonRpc, owner: string, authorization: Authorization[] ): Promise<Action[]> {
    const actions: Action[] = [];

    for ( const contract of ["eosdmdpool15", "eosdmdpool1a", "eosdmdpool1b"]) {
        if (!await is_unclaimed( rpc, owner, contract )) continue;

        // approved claim
        actions.push({
            account: contract,
            name: "claim",
            authorization,
            data: {
                from: owner,
            }
        });
    }
    return actions;
}

export async function is_unclaimed( rpc: JsonRpc, owner: string, contract: string ) {
    // params
    const code = contract;
    const scope = contract;
    const table = "userstake"
    const lower_bound = owner;
    const upper_bound = owner;

    // query
    const result = await rpc.get_table_rows({json: true, code, scope, table, lower_bound, upper_bound });

    // empty table
    if (!result.rows.length) return false;

    // must have unclaimed
    const unclaimed = Number(result.rows[0].unclaimed.split(" ")[0]);
    if (!unclaimed) return false;

    return true;
}

export async function get_available_claims( rpc: JsonRpc, owner: string, authorization: Authorization[] ): Promise<Action[]> {
    return [...await rewards(rpc, owner, authorization)];
}