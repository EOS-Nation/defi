import { JsonRpc } from 'eosjs';
import { Action, Authorization } from 'eosjs/dist/eosjs-serialize';

export function get_all_claims( owner: string, authorization: Authorization[] ): Action[] {
    return ["mine1.defi", "mine3.defi"].map( account => {
        return {
            account,
            name: "claim",
            authorization,
            data: {
                from: owner,
            }
        }
    })
}

export async function get_available_claims( rpc: JsonRpc, owner: string, authorization: Authorization[] ): Promise<Action[]> {
    const claims: Action[] = [];
    for ( const action of get_all_claims( owner, authorization )) {
        // params
        const code = action.account;
        const scope = action.account;
        const table = "dividends"
        const lower_bound = owner;
        const upper_bound = owner;

        // query
        const result = await rpc.get_table_rows({json: true, code, scope, table, lower_bound, upper_bound });

        // empty table
        if (!result.rows.length) continue;

        // must have greater than 0 BOX
        const amount = Number(result.rows[0].quantity.split(" ")[0]);
        if ( !amount ) continue;

        // approved claim
        claims.push( action );
    }
    return claims;
}