/* 
    genarate 3 key-pair :
        Owner
        Blob
        Alice
*/

import { Lucid } from "https://deno.land/x/lucid@0.8.3/mod.ts";
 
const lucid = await Lucid.new(undefined, "PreProd");

// Owner
const ownerPrivateKey = lucid.utils.generatePrivateKey();
await Deno.writeTextFile("address/owner.sk", ownerPrivateKey);
 
const ownerAddress = await lucid
  .selectWalletFromPrivateKey(ownerPrivateKey)
  .wallet.address();
await Deno.writeTextFile("address/owner.addr", ownerAddress);

// Alice
const alicePrivateKey = lucid.utils.generatePrivateKey();
await Deno.writeTextFile("address/alice.sk", alicePrivateKey);
 
const aliceAddress = await lucid
  .selectWalletFromPrivateKey(alicePrivateKey)
  .wallet.address();
await Deno.writeTextFile("address/alice.addr", aliceAddress);

// Bob
const bobPrivateKey = lucid.utils.generatePrivateKey();
await Deno.writeTextFile("address/bob.sk", bobPrivateKey);
 
const bobAddress = await lucid
  .selectWalletFromPrivateKey(bobPrivateKey)
  .wallet.address();
await Deno.writeTextFile("address/bob.addr", bobAddress);
