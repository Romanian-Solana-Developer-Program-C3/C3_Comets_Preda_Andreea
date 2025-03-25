import "dotenv/config";
import { createGenericFile, createSignerFromKeypair, generateSigner, percentAmount, signerIdentity } from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { clusterApiUrl } from "@solana/web3.js";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
import {createNft, mplTokenMetadata} from "@metaplex-foundation/mpl-token-metadata";
import {base58} from "@metaplex-foundation/umi/serializers";

const kp = getKeypairFromEnvironment("SECRET_KEY");

const umi = createUmi(clusterApiUrl("devnet"));

const keypair = umi.eddsa.createKeypairFromSecretKey(kp.secretKey);
const signer = createSignerFromKeypair(umi, keypair);

umi.use(mplTokenMetadata());
//umi.use(irysUploader());
umi.use(signerIdentity(signer));

const IMG_URI = "https://devnet.irys.xyz/xUPgNCP8uRsyy6hWKQEEhGUWaBQMWePRvvnLBAAxP72";

const METADATA_URI = "https://devnet.irys.xyz/CM4iojcx4crUixhPiNa5xkdPzruCg8iDdid4ktWnh34V";

//npm
async function createMyNft() {
  try {

    const mint = generateSigner(umi);

    let tx = createNft (umi, {
      name: "Comets Road",
      mint,
      authority: signer,
      sellerFeeBasisPoints: percentAmount(100),
      isCollection: false,
      uri: METADATA_URI, 
    });

    let result = await tx.sendAndConfirm(umi);

    const signature = base58.deserialize(result.signature);

    console.log('Done! with sig: ', signature);

  } catch (err) {
    console.error("[createMyNft] Failed with error:", err);
  }
}

createMyNft();