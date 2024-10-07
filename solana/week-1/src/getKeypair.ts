import * as solanaWeb3 from "@solana/web3.js";

const getKeypair = async () => {
  const keypair = await solanaWeb3.Keypair.generate();
  const keys = { public: keypair.publicKey, private: keypair.secretKey };
  return keys;
};

export default getKeypair;
