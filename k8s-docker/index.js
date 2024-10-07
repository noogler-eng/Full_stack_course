const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const server = express();

server.get('/', async(req, res)=>{
    res.send("server is running fine 💩💩");
})

const PORT = process.env.PORT || 8080;
server.listen(PORT, ()=>{
    console.log(`server is listening at: http://localhost:${PORT}`)
})