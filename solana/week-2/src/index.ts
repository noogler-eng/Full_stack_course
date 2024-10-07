import getPDA from "./getPda";

const main = async()=>{
    // deal with PDA
    // Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod
    const pgmId = 'ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa';
    getPDA(pgmId);
}

main().then(()=>{
    console.log("program run successfully!");
}).catch((error)=>{
    console.log(error);
})