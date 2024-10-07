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
const PING_PROGRAM_ADDRESS = 'ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa';
const PING_PROGRAM_DATA_ADDRESS = 'Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod';
const pingTheCount = (connection, payer) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const txn = yield new solanaweb3.Transaction();
        const inst = new solanaweb3.TransactionInstruction({
            keys: [
                {
                    pubkey: new solanaweb3.PublicKey(PING_PROGRAM_DATA_ADDRESS),
                    isSigner: false,
                    isWritable: true
                }
            ],
            programId: new solanaweb3.PublicKey(PING_PROGRAM_ADDRESS)
        });
        txn.add(inst);
        const signature = yield solanaweb3.sendAndConfirmTransaction(connection, txn, [payer]);
        console.log('signature: ', signature);
        console.log('!!signature confirmed!!');
    }
    catch (error) {
        console.log("error while pinging the count: ", pingTheCount);
        console.log(error);
    }
});
exports.default = pingTheCount;
