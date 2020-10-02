export interface Token {
    dapp: string;
    symcode: string;
    precision: number;
    contract: string;
    defibox_pair_id?: number;
    dfs_mid?: number;
}

export const CRL: Token = {
    dapp: "coral",
    symcode: "CRL",
    contract: "coralfitoken",
    precision: 10,
    defibox_pair_id: 504,
}

export const BOX: Token = {
    dapp: "defibox",
    symcode: "BOX",
    contract: "token.defi",
    precision: 6,
    defibox_pair_id: 194,
}

export const DFS: Token = {
    dapp: "dfs",
    symcode: "DFS",
    contract: "minedfstoken",
    precision: 4,
    dfs_mid: 39,
}

export const DMD: Token = {
    dapp: "dapp",
    symcode: "DMD",
    contract: "eosdmdtokens",
    precision: 10,
    dfs_mid: 326,
}

export const DOP: Token = {
    dapp: "dolphin",
    symcode: "DOP",
    contract: "dolphintoken",
    precision: 8,
    dfs_mid: 408,
}

export const RAB: Token = {
    dapp: "rabbit",
    symcode: "RAB",
    contract: "rabbitstoken",
    precision: 4,
    defibox_pair_id: 544,
    dfs_mid: 345,
}

export const CRT: Token = {
    dapp: "rabbit",
    symcode: "CRT",
    contract: "carrotstoken",
    precision: 4,
    defibox_pair_id: 575,
    dfs_mid: 381,
}

export const DAD: Token = {
    dapp: "superdad",
    symcode: "DAD",
    contract: "dadtoken1111",
    precision: 6,
    defibox_pair_id: 588,
}

export const WOOL: Token = {
    dapp: "wool",
    symcode: "WOOL",
    contract: "woolfintoken",
    precision: 4,
    dfs_mid: 370,
}

export const YFC: Token = {
    dapp: "yfc",
    symcode: "YFC",
    contract: "woolfintoken",
    precision: 8,
    dfs_mid: 329,
}