import * as defi from "..";

(() => {
    for ( const token of Object.keys(defi.eos.tokens)) {
        console.log( defi.eos.tokens[token] );
    }
})()