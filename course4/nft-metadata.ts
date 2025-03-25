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

const IMG_URI = "https://devnet.irys.xyz/xUPgNCP8uRsyy6hWKQEEhGUWaBQMWePRvvnLBAAxP72";

const METADATA_URI = "https://devnet.irys.xyz/CM4iojcx4crUixhPiNa5xkdPzruCg8iDdid4ktWnh34V";

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

    // console.log("Uploading image... ");
    // const img = await readFile(IMAGE_FILE);

    // const imgConverted = createGenericFile(new Uint8Array(img), "image/png");

    // const [myUri] = await umi.uploader.upload([imgConverted]);

    //console.log("Done with URI: ", metadataUri);

  } catch (err) {
    console.error("[uploadMetadata] Failed with error:", err);
  }
}

uploadMetadata();