"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const solanaweb3 = __importStar(require("@solana/web3.js"));
const borsh = __importStar(require("@project-serum/borsh"));
// 1. making an txn 
// 2. adding the instruction to txn
// 3. adding the system programme or another pprogramm address
// 4. adding this txn to on-chain
// making an txn for movie review app
const MOVIE_REVIEW_PROGRAM_ID = 'CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN';
const movieReviewTxn = (signer, myPublicKey) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = new solanaweb3.Connection(solanaweb3.clusterApiUrl('devnet'));
    const txn = new solanaweb3.Transaction();
    const data = borsh.struct([
        borsh.u8('variant'),
        borsh.str('title'),
        borsh.u8('rating'),
        borsh.str('content'),
    ]);
    const buffer = Buffer.alloc(1 + 300 + 1 + 3000);
    const publicKey = new solanaweb3.PublicKey(myPublicKey);
    const [pda] = yield solanaweb3.PublicKey.findProgramAddressSync([publicKey.toBuffer(), new TextEncoder().encode('3 idiots')], new solanaweb3.PublicKey(MOVIE_REVIEW_PROGRAM_ID));
    data.encode({ variant: 0, title: '3 idiots', rating: 10, content: 'good movie by amir khan' }, buffer);
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
    });
    txn.add(inst);
    const txid = yield solanaweb3.sendAndConfirmTransaction(connection, txn, [signer]);
    console.log(`Transaction submitted: https://explorer.solana.com/tx/${txid}?cluster=devnet`);
});
exports.default = movieReviewTxn;
