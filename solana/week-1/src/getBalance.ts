import * as solanaWeb3 from "@solana/web3.js";

// 1. making the connection of our local machine with solana devnet network
// 2. getting balance of particular account by making public address string to public key
// 3. returning amount in SOL
const getBalance = async (address: string): Promise<Number> => {
  const connection = await new solanaWeb3.Connection(
    solanaWeb3.clusterApiUrl("devnet")
  );
  const balance = await connection.getBalance(
    new solanaWeb3.PublicKey(address)
  );
  return balance / solanaWeb3.LAMPORTS_PER_SOL;
};

export default getBalance;
