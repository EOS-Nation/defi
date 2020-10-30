import { JsonRpc } from 'eosjs';
import { Action, Authorization } from 'eosjs/dist/eosjs-serialize';
import { get_pools, is_unclaimed } from "./wool";
import { COW, MILK, Token } from "./tokens";

export const contracts: string[] = [ "milkpoolcode", "cowpoolscode" ];
export const tokens: Token[] = [ COW, MILK ];

export async function rewards( rpc: JsonRpc, owner: string, authorization: Authorization[] ): Promise<Action[]> {
    const actions: Action[] = [];

    for ( const contract of contracts) {
        for ( const pool_id of await get_pools( rpc, contract ) ) {
            if (!await is_unclaimed( rpc, owner, contract, pool_id, "miners" )) continue;

            // approved claim
            actions.push({
                account: contract,
                name: "claim",
                authorization,
                data: {
                    owner,
                    pool_id,
                }
            });
        }
    }
    return actions;
}

export async function get_available_claims( rpc: JsonRpc, owner: string, authorization: Authorization[] ): Promise<Action[]> {
    return [...await rewards(rpc, owner, authorization)];
}