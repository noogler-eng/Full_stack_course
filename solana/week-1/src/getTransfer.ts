import * as solanaweb3 from "@solana/web3.js";
import dotenv from "dotenv";
import bs58 from "bs58";
dotenv.config();

// 0. creating connection from local machine to solana devnet network
// 1. creating an new solana transaction
// 2. wriiting some instruction for transaction 
// 3. it is system program so calling system program transfer inst
// 4. transferring the solana in its franction part lamports
// 5. after adding inst to transaction, we must sign it with both keys

const getTransferSol = async(payload: {
    from: string,
    to: string,
    amount: number
})=>{

    try{
        if(!process.env.PRIVATE_KEY) throw new Error("private key not found!")

    const connection = new solanaweb3.Connection(solanaweb3.clusterApiUrl('devnet'));
    const txn = new solanaweb3.Transaction();
    const keyPair = await solanaweb3.Keypair.fromSecretKey(bs58.decode(process.env.PRIVATE_KEY) || '');

    const solSendInst = solanaweb3.SystemProgram.transfer({
        fromPubkey: new solanaweb3.PublicKey(payload.from),
        toPubkey: new solanaweb3.PublicKey(payload.to),
        lamports: payload.amount * solanaweb3.LAMPORTS_PER_SOL
    })

    txn.add(solSendInst);
    const signature = await solanaweb3.sendAndConfirmTransaction(connection, txn, [keyPair]);
    console.log('txn signature: ', signature);
    }catch(error){
        console.log("error while transfering SOL, transaction")
        console.log(error);
    }
}

export default getTransferSol;

// output: 3gGpRpM2wC7EHpJHMH6SxPwsry2ZXzVLfgsCuBuQuLpqAXUb8mfS6hYT2SU9rbru7sMJY6kGSkTgmS8A8ygmjcTC