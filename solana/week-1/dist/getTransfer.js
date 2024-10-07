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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const solanaweb3 = __importStar(require("@solana/web3.js"));
const dotenv_1 = __importDefault(require("dotenv"));
const bs58_1 = __importDefault(require("bs58"));
dotenv_1.default.config();
// 0. creating connection from local machine to solana devnet network
// 1. creating an new solana transaction
// 2. wriiting some instruction for transaction 
// 3. it is system program so calling system program transfer inst
// 4. transferring the solana in its franction part lamports
// 5. after adding inst to transaction, we must sign it with both keys
const getTransferSol = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!process.env.PRIVATE_KEY)
            throw new Error("private key not found!");
        const connection = new solanaweb3.Connection(solanaweb3.clusterApiUrl('devnet'));
        const txn = new solanaweb3.Transaction();
        const keyPair = yield solanaweb3.Keypair.fromSecretKey(bs58_1.default.decode(process.env.PRIVATE_KEY) || '');
        const solSendInst = solanaweb3.SystemProgram.transfer({
            fromPubkey: new solanaweb3.PublicKey(payload.from),
            toPubkey: new solanaweb3.PublicKey(payload.to),
            lamports: payload.amount * solanaweb3.LAMPORTS_PER_SOL
        });
        txn.add(solSendInst);
        const signature = yield solanaweb3.sendAndConfirmTransaction(connection, txn, [keyPair]);
        console.log('txn signature: ', signature);
    }
    catch (error) {
        console.log("error while transfering SOL, transaction");
        console.log(error);
    }
});
exports.default = getTransferSol;
// output: 3gGpRpM2wC7EHpJHMH6SxPwsry2ZXzVLfgsCuBuQuLpqAXUb8mfS6hYT2SU9rbru7sMJY6kGSkTgmS8A8ygmjcTC
