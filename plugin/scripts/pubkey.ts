import { ec } from "starknet";

const names = process.argv.slice(2);
if (names.length === 0) {
  console.log("Usage: npm run pubkey -- priv1 [priv2 ...]");
  process.exit(1);
}

names.forEach((pk) => {
  let keypair = ec.getKeyPair(pk);
  let publicKey = ec.getStarkKey(keypair);

  console.log(
    "--------------------------------------------------------------------------------"
  );
  console.log(`privatekey: ${pk}`);
  console.log(`publickey:  ${publicKey}`);
  console.log(
    "--------------------------------------------------------------------------------"
  );
});
