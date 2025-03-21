import "dotenv/config";
import { base58, createGenericFile, createSignerFromKeypair, percentAmount, signerIdentity } from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { clusterApiUrl } from "@solana/web3.js";
import { readFile } from "fs/promises";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
import { sign } from "crypto";

const kp = getKeypairFromEnvironment("SECRET_KEY");
const umi = createUmi(clusterApiUrl("devnet"));

const keypair = umi.eddsa.createKeypairFromSecretKey(kp.secretKey);
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

const IMG_URI = "https://"; // You will need to provide the actual image URI
const METADATA_URI = "";

async function createMyNft() {
  
    try{

    const mint = generateSigner(umi);

    let tx = createNft( umi, {
    name: "Comets Road",
    mint,
    authority: signer,
    sellerFeeBasisPoints: percentAmount(5),
    isCollection: false,
    uri: METADATA_URI,
    });

    let result = await tx.sendAndConfirm(umi);
    const signature = base58.deserialize(result.signature);

    console.log(`Done! With sig: `, signature);

  } catch (err) {
    console.error("[uploadMyNft] Failed with error:", err);
  }
}

createMyNft();