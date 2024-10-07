# Read Data From Solana Network
 - Solana is public blockchain, so anyone can read data.
 - only private key holders can change the state of accounts.

## Accounts
 - are like the files in Solana's network ledger. 
 - All state data is stored in an account. 
 - Accounts can be used for many things, it can store SOL.
 - it can store custome data structre and executable code are programs.
 - 

## SOL and Lamports
 - SOL is the name of Solana's native token. 
 - Lamports are fractional part of SOL.
 - 

## Public Keys
 - often refereed as a address, it points to account on solana network.
 - secret key, performs certain specific actions within account.
 - anyone can read account data with public key.
 - public keys are of 256 bits(32 bytes) and base58 encodings.
 - base58 takes the number or string and compress them to bytes(after encoding there will be an 58 characters)
 - base64 is differ from base58 as base64 contains o, 0 .... confusing char which will not be in public key or base58 encoded string

## Json RPC URI
 - remote procdeure call.
 - all interactions with solana netwrok happens through this Json RPC URI.
 - this is basically an HTTP POST with json body.

## Web3js
 - @solana/web3.js is abstraction on Json RPC URI.
 - it allows us to work on solana with js and ts.
 - it can be used to query the balance of any solana account.

# Write Data to Solana Network
 - transactions in solana is sending or receiving SOL, writting data on-chain.
 - using solana scanner to view transactions.

## Keypair
 - refers to combination or pairing of public keys and private keys.
 - the secret key is used for sign transaction or identify the authority.

## Transactions
 - it is an bundel of instructions that envokes programme.
 - all the modification on on-chain data happens through transaction acc to programms.
 - an identifier of program you intend to invoke.
 - an array of accounts that will be read from or written to.
 - data structre as a byte array that is specified to program being invoked.
 - all the reading and writting done parellely of diff accounts.
 - in smae accounts the prev txn confirmed then next one execute.
 - 

# Interacting with wallet
 - wallet is handling our private keys and handel secure txn signing.

# Serlization Instruction Data
 - Transactions are made up of many instructions
 - any individual instruction targeting its own program
 - when txn submitted then solana runtime will arrange them in order and execute automatically
 - while txn is atomic in nature

 - every inst is made up of 3 component: 
    1. intended program id
    2. an array of accounts involved
    3. a byte buffer of inst data
 - every txn conatins 
    1. an array of all accounts which is using in read or write,
    2. one or more instructions, programId, signatures.
    3. it also conatins recent block hash.
 - in order to pass the data from client to txn / inst, it must be serialized into a byte buffer. for serilization we used BORSH.
 
