import {Blockfrost, Lucid } from "lucid-cardano";

async function sing_tx() {

    const lucid = await Lucid.new(
        new Blockfrost(
            BLOCKFROST_URL,
            PROJECID
        ),
        NETWORK,
    );



    const api = await window.cardano.nami.enable();
    const listapi = Lucid.
}

const listapi = lucid