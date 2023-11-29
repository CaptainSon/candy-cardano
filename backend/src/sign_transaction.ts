import {Blockfrost, Lucid } from "lucid-cardano";
import { BLOCKFROST_URL, PROJECID, NETWORK } from "./util/constant";

async function sign_tx() {

    const lucid = await Lucid.new(
        new Blockfrost(
            BLOCKFROST_URL,
            PROJECID
        ),
        NETWORK,
    );

    const api = await window.cardano.nami.enable();
    const listapi = lucid.selectWallet(api)

    console.log(listapi)
}

sign_tx()