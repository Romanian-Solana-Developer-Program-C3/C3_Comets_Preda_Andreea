import { createMint, mintTo } from "@solana/spl-token";
import "dotenv/config";
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import { getKeypairFromEnvironment, getExplorerLink,} from "@solana-developers/helpers";

import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

const MINT = new PublicKey("EZE9Fws26RYE7ZYYdXzxgZt27qr72RDzAdoNAoRoRbTg");

async function mintToken(amount: number, mint: PublicKey){
    
    console.log(`Minting token ${mint.toBase58()}...`);

    const connection = new Connection(clusterApiUrl("devnet"));
    const kp = getKeypairFromEnvironment("SECRET_KEY");

    const ata = await getOrCreateAssociatedTokenAccount(
        connection,
        kp,
        mint,
        kp.publicKey,
    );

    const sig = await mintTo(connection, kp, mint, ata.address, kp, amount);

    const link = getExplorerLink("tx", sig, "devnet");

    console.log(`Done with link: ${link}`);
}

mintToken(10 * 10 ** 9, MINT);