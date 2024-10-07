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
function program(connection, payer, receipent) {
    return __awaiter(this, void 0, void 0, function* () {
        const txn = new solanaweb3.Transaction();
        // allocating some Buffer to the inst data
        const lamports = BigInt(solanaweb3.LAMPORTS_PER_SOL * 1);
        const instructionData = Buffer.alloc(4 + 8);
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
        try {
            const sig = yield solanaweb3.sendAndConfirmTransaction(connection, new solanaweb3.Transaction().add(inst), [payer]);
            console.log("programme has been runned!");
        }
        catch (error) {
            console.log("error while transfer txn, system programs");
            console.log(error);
        }
    });
}
exports.default = program;
