import * as solanaWeb3 from "@solana/web3.js";

const getAirdrop = async (address: string): Promise<Boolean> => {
  try {
    const connection = await new solanaWeb3.Connection(
      solanaWeb3.clusterApiUrl("devnet")
    );
    await connection.requestAirdrop(
      new solanaWeb3.PublicKey(address),
      2 * solanaWeb3.LAMPORTS_PER_SOL
    );
    return true;
  } catch (error) {
    console.log("error while airdroping the SOL to particular address");
    return false;
  }
};

export default getAirdrop;
