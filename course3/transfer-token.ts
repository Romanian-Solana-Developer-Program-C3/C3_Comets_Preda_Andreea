import "dotenv/config";
import { 
    getExplorerLink, 
    getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import {  
    getAssociatedTokenAddressSync, 
    getOrCreateAssociatedTokenAccount, 
    transferChecked 
} from "@solana/spl-token";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

const MINT = new PublicKey("EZE9Fws26RYE7ZYYdXzxgZt27qr72RDzAdoNAoRoRbTg");
const SRC  = new PublicKey("2dQcqeBzSf5f1XfnD62m1pwVohYnPtKDg5dy61nd1qYQ");

const DST  = new PublicKey("2dQcqeBzSf5f1XfnD62m1pwVohYnPtKDg5dy61nd1qYQ");

async function transferToken(
    mint: PublicKey, 
    source: PublicKey, 
    dest: PublicKey,
    amount: number,
    )               {  

    console.log(`Transfering token ${mint.toBase58()}...`);

    const connection = new Connection(clusterApiUrl("devnet"));
    const kp = getKeypairFromEnvironment("SECRET_KEY");

    console.log("Using Keypair from SECRET_KEY:", kp.publicKey.toBase58());

    const sourceAta = getAssociatedTokenAddressSync(mint, source);
    console.log("Source ATA:", sourceAta.toBase58());

    const destAta = await getOrCreateAssociatedTokenAccount(
        connection, 
        kp, 
        mint, 
        dest,
    );
    console.log("Destination ATA:", destAta.address.toBase58());

    const sig = await transferChecked(
        connection, 
        kp, 
        sourceAta, 
        mint, 
        destAta.address, 
        kp, 
        amount, 
        9, // Token decimals
    );

    const link = getExplorerLink("tx", sig, "devnet");

    console.log(`Done with link: ${link}`);
}

transferToken(MINT, SRC, DST, 1 * 10 ** 9);
