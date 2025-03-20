import { createMint, mintTo } from "@solana/spl-token";
import "dotenv/config";
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import { getKeypairFromEnvironment, getExplorerLink,} from "@solana-developers/helpers";

import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

const MINT = new PublicKey("");

async function mintToken(amount: number, mint: PublicKey){
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