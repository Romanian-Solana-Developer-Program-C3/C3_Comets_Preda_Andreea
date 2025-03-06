import { Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { airdrop } from "./airdrop";
import { generateKeypair } from "./keygen";
import { enroll } from "./enroll";
import { getInput } from "./utils";

const KEYPAIR_FNAME = "keypair.json";
const ADMIN_PUBKEY = "42NYBuNKnAvLAB9zjftcqXavYLzM5NhNR4LH8ztJW8qM";

const connection = new Connection("https://api.devnet.solana.com");
//const connection = new Connection("https://solana-api.projectserum.com");


// Execute our enrollment transaction
(async () => {
  try {
    let kp = await generateKeypair(KEYPAIR_FNAME);

    // airdop
    await airdrop(connection, kp.publicKey, 1 * LAMPORTS_PER_SOL);

    const github = await getInput("Enter your github account name: ");

    // register
    await enroll(github, kp, ADMIN_PUBKEY);

    console.log(
      `🎉 Congratulations, ${github}! You're enrolled in our first Romanian Solana Builders Program`,
    );
  } catch (err) {
    console.error(`❌ Oops, something went wrong: ${err}`);
  }
})();
