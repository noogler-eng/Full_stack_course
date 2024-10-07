import * as solanaweb3 from "@solana/web3.js";
import * as borsh from "@project-serum/borsh";
import bs58 from "bs58"

const getPDA = async (programId: string) => {
  try {
    // Buffer is similar to an array of integers
    const [PDA, bump] = await solanaweb3.PublicKey.findProgramAddressSync(
      [Buffer.from("GLOBAL_STATE")],
      new solanaweb3.PublicKey(programId)
    );
    console.log("PDA -> ", PDA.toBase58());
    console.log("bump -> ", bump);

    // GaKLqZP9UvPLUw12YjwywEY6Fh92GHXHE1TzJHUopWDA we got this
    const createdPDA = await solanaweb3.PublicKey.createProgramAddressSync(
      [Buffer.from("GLOBAL_STATE"), Buffer.from(["255"])],
      new solanaweb3.PublicKey(programId)
    );
    console.log("PDA -> ", createdPDA.toBase58());
    console.log(
      "is PDA on curve -> ",
      solanaweb3.PublicKey.isOnCurve(createdPDA)
    );
    console.log(
      "my wallet address is on curve or not -> ",
      solanaweb3.PublicKey.isOnCurve(
        new solanaweb3.PublicKey("AuPefMfxYmzaXS5Jiv9SBkHWZ9P6gFDb35Y5NcnX9Wwd")
      )
    );

    const connection = await new solanaweb3.Connection(
      solanaweb3.clusterApiUrl("devnet")
    );
    const associatedAccounts = await connection.getProgramAccounts(
      new solanaweb3.PublicKey("CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN")
    );
    // console.log('associatedAccounts: ', associatedAccounts);
    console.log(associatedAccounts[69].account.data.toString());
    const buffer = associatedAccounts[0].account.data;
    // console.log(buffer.toString('hex'));
    console.log("buffer length: ", buffer.length);

    const movieReviewSchema: borsh.struct = borsh.struct([
      borsh.u8("variant"),
      borsh.str("title"),
      borsh.u8("rating"),
      borsh.str("content"),
    ]);

    const { variant, title, rating, content } = await movieReviewSchema.decode(buffer);
    console.log('data as schema: ', variant, title, rating, content);

  } catch (error) {
    console.log("error while fetching the PDA", error);
  }
};

export default getPDA;
// when the seeds are same then the PDA will be same
