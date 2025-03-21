import "dotenv/config";

import {clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL} from "@solana/web3.js";
import {airdropIfRequired, getKeypairFromEnvironment} from "@solana-developers/helpers";

const keypair = getKeypairFromEnvironment("SECRET_KEY");
const connection = new Connection (clusterApiUrl("devnet"));

const pubkey = keypair.publicKey;

// await airdropIfRequired(connection, pubkey, LAMPORTS_PER_SOL, LAMPORTS_PER_SOL);

// TO BE DONE
// airdrop
// transaction 
// 2. Cream o instructiune
const balanceInLamports = await connection.getBalance(pubkey);


console.log(`${pubkey.toString()} has balance ${balanceInLamports}`);