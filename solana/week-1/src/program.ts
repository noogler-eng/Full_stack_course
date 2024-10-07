import * as solanaweb3 from "@solana/web3.js";
async function program(
  connection: solanaweb3.Connection,
  payer: solanaweb3.Keypair,
  receipent: solanaweb3.PublicKey
) {
  const txn = new solanaweb3.Transaction();

  // allocating some Buffer to the inst data
  const lamports = BigInt(solanaweb3.LAMPORTS_PER_SOL * 1);
  const instructionData: Buffer = Buffer.alloc(4 + 8);
  instructionData.writeUInt32LE(2, 0);
  instructionData.writeBigUint64LE(lamports, 4);

  const inst = new solanaweb3.TransactionInstruction({
    // list of accounts where read and write operations are running
    // the first signer will be paying the txn fees, so order maters
    keys: [
      {
        pubkey: new solanaweb3.PublicKey(payer.publicKey),
        isSigner: true,
        isWritable: true,
      },
      {
        pubkey: new solanaweb3.PublicKey(receipent),
        isSigner: false,
        isWritable: true,
      },
    ],
    programId: solanaweb3.SystemProgram.programId,
    data: instructionData,
  });

  try{
    const sig = await solanaweb3.sendAndConfirmTransaction(
      connection,
      new solanaweb3.Transaction().add(inst),
      [payer]
    );
  
    console.log("programme has been runned!");
  }catch(error){
    console.log("error while transfer txn, system programs");
    console.log(error);
  }
}

export default program;
