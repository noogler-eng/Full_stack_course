import * as solanaweb3 from "@solana/web3.js";
import { AccountInfo, PublicKey } from "@solana/web3.js";
import getAccountInfo from "./getAccountInfo";
import getAirdrop from "./getAirdrop";
import getBalance from "./getBalance";
import getTransferSol from "./getTransfer";
import getKeypair from "./getKeypair";
import program from "./program";
import bs58 from "bs58";
import pingTheCount from "./pingCounter";
import searilizeData from "./searilizingData";
import movieReviewTxn from "./getBuildTxn";
import dotenv from "dotenv";
dotenv.config();

const myPublicKey = "AuPefMfxYmzaXS5Jiv9SBkHWZ9P6gFDb35Y5NcnX9Wwd";

const main = async () => {
  let balance = await getBalance(myPublicKey);
  console.log("balance: SOL: ", balance);

  // 2 SOL at max will airdrop to any particualr account in 1 day
  await getAirdrop(myPublicKey);
  balance = await getBalance(myPublicKey);
  console.log("balance after airdrop: SOL: ", balance);

  // this my public key address account is not executable as it is wallet
  // programs are executable
  const info: AccountInfo<any> = await getAccountInfo(myPublicKey);
  console.log("my account executable info: ", info.executable);
  console.log("my account owner info: ", new PublicKey(info.owner).toString());

  // await getTransferSol({
  //   from: myPublicKey,
  //   to: "GJka613DnHoTgf6P6p2hPvonSQ7U87ktVZtJedaF4BaA",
  //   amount: 1,
  // });

  const keys = await getKeypair();
  console.log("keys: ", keys);
  // 7kwvw46uWxhiwirw6VV8rRoQQtAU3YwoR6YKLKXtBTh7
  // 4C3Y159Lnt88TanYrYdeoG25ggECAQkS8eQLW8ZU1Y2w12SBfRhexRYpmhEQWoyicV8eFbZdg2oECBtgo8Na9jhP
  // there is a seed phrase which is used to derive the secret key
  console.log("public key: ", new PublicKey(keys.public).toString());
  console.log("private key: ", bs58.encode(keys.private));

  const connection: solanaweb3.Connection = await new solanaweb3.Connection(solanaweb3.clusterApiUrl('devnet'));
  const signerKeypair = await getMyKeypair();
  // await program(connection, signerKeypair, new solanaweb3.PublicKey("GJka613DnHoTgf6P6p2hPvonSQ7U87ktVZtJedaF4BaA"))

  // await pingTheCount(connection, signerKeypair);

  // getting the serlized data
  const serializedData = await searilizeData();
  console.log("serializedData: ", serializedData);

  await movieReviewTxn(signerKeypair, new solanaweb3.PublicKey(myPublicKey));
};

main()
  .then(() => {
    console.log("main function runs successfully");
  })
  .catch((error) => {
    console.log("error: ", error);
  });


const getMyKeypair = async()=>{
  if(!process.env.PRIVATE_KEY) throw new Error("private key not found!");
  const keypair = await solanaweb3.Keypair.fromSecretKey(bs58.decode(process.env.PRIVATE_KEY));
  return keypair;
}