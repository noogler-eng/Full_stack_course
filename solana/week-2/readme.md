## PDA(programe derived address)
 - address that do not have correspoding private key
 - allows for programme to sign for txns themselves and allowing for storing and locating data
 - derive pda using ``` findProgramAddress(seeds, programId) ```
 - getting array of all accounts belongs to program by ``` getProgramAccounts(programId) ```
 - data serilization is done by ``` @project-serum/borsh ```
 - everything is an account like programs, programs are executable accounts
 - progrms are stateless, they store state in another accounts
 - regular solana keypairs lies on ed2559 elliptical curve
 - pda dont lie on curve as not private key. it ensure that the programme is only valid signer
 - there is 50% chace that it is PDA or not so we decrease bump by 1

##  