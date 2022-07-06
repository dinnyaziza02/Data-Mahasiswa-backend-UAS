const mysql=require("mysql");
const Connection = require("mysql/lib/Connection");
const dbConfig=require("../config/db.config.js");

const connection= mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
})

connection.connect(error=>{
    if(error) throw error;
    console.log("sukses terkoneksi");
})
module.exports=connection;