import { JsonRpc } from 'eosjs';
import { Action, Authorization } from 'eosjs/dist/eosjs-serialize';

export function get_all_claims( owner: string, authorization: Authorization[] ): Action[] {
    return ["eosdmdpool1a", "eosdmdpool1b"].map( account => {
        return {
            account,
            name: "foo",
            authorization,
            data: {}
        }
    })
}

export async function get_available_claims( rpc: JsonRpc, owner: string, authorization: Authorization[] ): Promise<Action[]> {
    const claims: Action[] = [];
    for ( const action of get_all_claims( owner, authorization )) {
        if (false) continue;
        claims.push( action );
    }
    return claims;
}