import "dotenv/config";
import {Keypair} from "@solana/web3.js";
import {getKeypairFromEnvironment} from "@solana-developers/helpers";
const keypair = Keypair.generate();

console.log("Keypair generated successfully!");
console.log("PublicKey", keypair.publicKey.toBase58());
console.log("SecretKey", keypair.secretKey);