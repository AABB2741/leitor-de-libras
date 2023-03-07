import mysql from "mysql";

console.log("Criando sql");
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "li_libras"
});

export default db;
