import * as solanaweb3 from "@solana/web3.js";
import * as borsh from "@project-serum/borsh";

// 1. making an txn 
// 2. adding the instruction to txn
// 3. adding the system programme or another pprogramm address
// 4. adding this txn to on-chain

// making an txn for movie review app
const MOVIE_REVIEW_PROGRAM_ID = 'CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN'

const movieReviewTxn = async(signer: solanaweb3.Keypair, myPublicKey: solanaweb3.PublicKey)=>{

    const connection: solanaweb3.Connection = new solanaweb3.Connection(solanaweb3.clusterApiUrl('devnet'));
    const txn = new solanaweb3.Transaction();

    const data = borsh.struct([
        borsh.u8('variant'),
        borsh.str('title'),
        borsh.u8('rating'),
        borsh.str('content'),
    ])
    const buffer = Buffer.alloc(1 + 300 + 1 + 3000);
    const publicKey = new solanaweb3.PublicKey(myPublicKey);
    const [pda] = await solanaweb3.PublicKey.findProgramAddressSync(
        [publicKey.toBuffer(), new TextEncoder().encode('3 idiots')],
        new solanaweb3.PublicKey(MOVIE_REVIEW_PROGRAM_ID)
    )

    console.log("programme data address: ",pda);

    data.encode({variant: 0, title: '3 idiots', rating: 10, content: 'good movie by amir khan'}, buffer);
    const seralizedData = buffer.slice(0, data.getSpan(buffer));

    const inst = new solanaweb3.TransactionInstruction({
        keys: [
            {
                pubkey: new solanaweb3.PublicKey(myPublicKey),
                isSigner: true,
                isWritable: true
            }, {
                pubkey: pda,
                isSigner: false,
                isWritable: true
            }, {
                pubkey: solanaweb3.SystemProgram.programId,
                isSigner: false,
                isWritable: false
            }
        ],

        programId: new solanaweb3.PublicKey(MOVIE_REVIEW_PROGRAM_ID),
        data: seralizedData
    })

    txn.add(inst);
    const txid = await solanaweb3.sendAndConfirmTransaction(connection, txn, [signer]);
    console.log(`Transaction submitted: https://explorer.solana.com/tx/${txid}?cluster=devnet`);
}

export default movieReviewTxn;


// Program - CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN
// Account #1WritableSigner	- AuPefMfxYmzaXS5Jiv9SBkHWZ9P6gFDb35Y5NcnX9Wwd
// Account #2Writable - 5VrgcGuyf1iHKcbfn1kCNLKCBC9k5Bh7NTYAE1oNwW1b
// Account #3 - System Program

// this is hex data of our instruction contains
// 000800000033206964696f74730a17000000676f6f64206d6f76696520627920616d6972206b68616e