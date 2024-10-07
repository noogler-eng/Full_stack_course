import * as solanaweb3 from "@solana/web3.js";

const PING_PROGRAM_ADDRESS = 'ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa';
const PING_PROGRAM_DATA_ADDRESS = 'Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod'
const pingTheCount = async(connection: solanaweb3.Connection, payer: solanaweb3.Keypair)=>{
    try{

        const txn = await new solanaweb3.Transaction();
        const inst = new solanaweb3.TransactionInstruction({
            keys: [
                {
                    pubkey: new solanaweb3.PublicKey(PING_PROGRAM_DATA_ADDRESS),
                    isSigner: false,
                    isWritable: true
                }
            ], 
            programId: new solanaweb3.PublicKey(PING_PROGRAM_ADDRESS)
        })

        txn.add(inst);
        const signature = await solanaweb3.sendAndConfirmTransaction(connection, txn, [payer]);
        console.log('signature: ', signature);
        console.log('!!signature confirmed!!')
    }catch(error){
        console.log("error while pinging the count: ", pingTheCount);
        console.log(error);
    }
}

export default pingTheCount;