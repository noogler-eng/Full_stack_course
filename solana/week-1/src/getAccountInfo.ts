import * as solanaWeb3 from "@solana/web3.js";

const getAccountInfo = async (address: string): Promise<any> => {
  const connection = await new solanaWeb3.Connection(
    solanaWeb3.clusterApiUrl("devnet")
  );
  const infoAccount = await connection.getAccountInfo(
    new solanaWeb3.PublicKey(address)
  );
  return infoAccount;
};

export default getAccountInfo;
