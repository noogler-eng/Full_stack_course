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
const borsh = __importStar(require("@project-serum/borsh"));
const bn_js_1 = require("bn.js");
// 1. we alloacte a new buffer that has larger size then needed
// 2. we encode the data into that buffer
// 3. slice down the buffer as much as we need
const searilizeData = () => __awaiter(void 0, void 0, void 0, function* () {
    // total size of this is 19 bytes as 8 bits + 16 bits + 128 bits
    // 1 byte = 8 bits
    const quipPlayersSchema = borsh.struct([
        borsh.u8('variant'),
        borsh.u16('playerId'),
        borsh.u128('itemId'),
    ]);
    const buffer = Buffer.alloc(1000);
    // here mapping should be correct
    quipPlayersSchema.encode({ variant: 2, playerId: 1002, itemId: new bn_js_1.BN(123, 10) }, buffer);
    const instBuffer = buffer.slice(0, quipPlayersSchema.getSpan(buffer));
    return instBuffer;
});
exports.default = searilizeData;
