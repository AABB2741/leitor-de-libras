import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    })

const app = express();
app.use(cors());

app.listen(8000, () => {
    console.log("Servidor rodando!");
});

interface User {
    name: string;
}

app.post<null, null, User>("/signup", (req, res) => {
    req.body.name
});
