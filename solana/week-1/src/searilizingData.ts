import * as borsh from "@project-serum/borsh";
import { BN } from "bn.js";

// 1. we alloacte a new buffer that has larger size then needed
// 2. we encode the data into that buffer
// 3. slice down the buffer as much as we need
const searilizeData = async()=>{
    // total size of this is 19 bytes as 8 bits + 16 bits + 128 bits
    // 1 byte = 8 bits
    const quipPlayersSchema: borsh.struct = borsh.struct([
        borsh.u8('variant'),
        borsh.u16('playerId'),
        borsh.u128('itemId'),
    ])

    const buffer = Buffer.alloc(1000);
    // here mapping should be correct
    quipPlayersSchema.encode({ variant: 2, playerId: 1002, itemId: new BN(123, 10) }, buffer);
    const instBuffer = buffer.slice(0, quipPlayersSchema.getSpan(buffer));
    return instBuffer;
}

export default searilizeData;