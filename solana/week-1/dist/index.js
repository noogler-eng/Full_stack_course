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
const web3_js_1 = require("@solana/web3.js");
const getAccountInfo_1 = __importDefault(require("./getAccountInfo"));
const getAirdrop_1 = __importDefault(require("./getAirdrop"));
const getBalance_1 = __importDefault(require("./getBalance"));
const getKeypair_1 = __importDefault(require("./getKeypair"));
const bs58_1 = __importDefault(require("bs58"));
const searilizingData_1 = __importDefault(require("./searilizingData"));
const getBuildTxn_1 = __importDefault(require("./getBuildTxn"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const myPublicKey = "AuPefMfxYmzaXS5Jiv9SBkHWZ9P6gFDb35Y5NcnX9Wwd";
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    let balance = yield (0, getBalance_1.default)(myPublicKey);
    console.log("balance: SOL: ", balance);
    // 2 SOL at max will airdrop to any particualr account in 1 day
    yield (0, getAirdrop_1.default)(myPublicKey);
    balance = yield (0, getBalance_1.default)(myPublicKey);
    console.log("balance after airdrop: SOL: ", balance);
    // this my public key address account is not executable as it is wallet
    // programs are executable
    const info = yield (0, getAccountInfo_1.default)(myPublicKey);
    console.log("my account executable info: ", info.executable);
    console.log("my account owner info: ", new web3_js_1.PublicKey(info.owner).toString());
    // await getTransferSol({
    //   from: myPublicKey,
    //   to: "GJka613DnHoTgf6P6p2hPvonSQ7U87ktVZtJedaF4BaA",
    //   amount: 1,
    // });
    const keys = yield (0, getKeypair_1.default)();
    console.log("keys: ", keys);
    // 7kwvw46uWxhiwirw6VV8rRoQQtAU3YwoR6YKLKXtBTh7
    // 4C3Y159Lnt88TanYrYdeoG25ggECAQkS8eQLW8ZU1Y2w12SBfRhexRYpmhEQWoyicV8eFbZdg2oECBtgo8Na9jhP
    // there is a seed phrase which is used to derive the secret key
    console.log("public key: ", new web3_js_1.PublicKey(keys.public).toString());
    console.log("private key: ", bs58_1.default.encode(keys.private));
    const connection = yield new solanaweb3.Connection(solanaweb3.clusterApiUrl('devnet'));
    const signerKeypair = yield getMyKeypair();
    // await program(connection, signerKeypair, new solanaweb3.PublicKey("GJka613DnHoTgf6P6p2hPvonSQ7U87ktVZtJedaF4BaA"))
    // await pingTheCount(connection, signerKeypair);
    // getting the serlized data
    const serializedData = yield (0, searilizingData_1.default)();
    console.log("serializedData: ", serializedData);
    yield (0, getBuildTxn_1.default)(signerKeypair, new solanaweb3.PublicKey(myPublicKey));
});
main()
    .then(() => {
    console.log("main function runs successfully");
})
    .catch((error) => {
    console.log("error: ", error);
});
const getMyKeypair = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!process.env.PRIVATE_KEY)
        throw new Error("private key not found!");
    const keypair = yield solanaweb3.Keypair.fromSecretKey(bs58_1.default.decode(process.env.PRIVATE_KEY));
    return keypair;
});
