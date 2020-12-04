export interface Token {
    symcode: string;
    precision: number;
    contract: string;
    defibox_pair_id?: number;
    dfs_mid?: number;
}

export const TAG: Token = {
    symcode: "TAG",
    contract: "tagtokenmain",
    precision: 8,
    defibox_pair_id: 602,
}

export const COW: Token = {
    symcode: "COW",
    contract: "cowtokencode",
    precision: 4,
    defibox_pair_id: 753,
}

export const MILK: Token = {
    symcode: "MILK",
    contract: "milktokencde",
    precision: 4,
    defibox_pair_id: 776,
}

export const CRL: Token = {
    symcode: "CRL",
    contract: "coralfitoken",
    precision: 10,
    defibox_pair_id: 504,
}

export const BOX: Token = {
    symcode: "BOX",
    contract: "token.defi",
    precision: 6,
    defibox_pair_id: 194,
}

export const DFS: Token = {
    symcode: "DFS",
    contract: "minedfstoken",
    precision: 4,
    dfs_mid: 39,
}

export const DMD: Token = {
    symcode: "DMD",
    contract: "eosdmdtokens",
    precision: 10,
    dfs_mid: 326,
}

export const DOP: Token = {
    symcode: "DOP",
    contract: "dolphintoken",
    precision: 8,
    dfs_mid: 408,
}

export const RAB: Token = {
    symcode: "RAB",
    contract: "rabbitstoken",
    precision: 4,
    defibox_pair_id: 544,
    dfs_mid: 345,
}

export const CRT: Token = {
    symcode: "CRT",
    contract: "carrotstoken",
    precision: 4,
    defibox_pair_id: 575,
    dfs_mid: 381,
}

export const DAD: Token = {
    symcode: "DAD",
    contract: "dadtoken1111",
    precision: 6,
    defibox_pair_id: 588,
}

export const WOOL: Token = {
    symcode: "WOOL",
    contract: "woolfintoken",
    precision: 4,
    dfs_mid: 370,
}

export const YFC: Token = {
    symcode: "YFC",
    contract: "woolfintoken",
    precision: 8,
    dfs_mid: 329,
}