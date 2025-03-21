import "dotenv/config";
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { clusterApiUrl } from "@solana/web3.js";
import { readFile } from "fs/promises";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";

const kp = getKeypairFromEnvironment("SECRET_KEY");

const umi = createUmi(clusterApiUrl("devnet"));

const keypair = umi.eddsa.createKeypairFromSecretKey(kp.secretKey);
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

const IMG_URI = "https://"; // You will need to provide the actual image URI

async function uploadMetadata() {
  try {
    const metadata = {
      name: "Comets Road",
      symbol: "ROAD",
      description: "On the Stellar road",  // Fixed typo here
      image: IMG_URI,
      attributes: [
        { trait_type: "Color", value: "red" },
        { trait_type: "Material", value: "wool" },
        { trait_type: "Size", value: "very big" },
      ],
      properties: {
        files: [{ type: "image/png", uri: IMG_URI }],
      },
    };

    // Upload the metadata JSON
    const metadataUri = await umi.uploader.uploadJson(metadata);
    console.log("Metadata uploaded successfully! Metadata URI:", metadataUri);

  } catch (err) {
    console.error("[uploadMetadata] Failed with error:", err);
  }
}

uploadMetadata();