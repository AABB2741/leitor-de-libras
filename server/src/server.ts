import express from "express";
import cors from "cors";

import { router } from "./routes";

const app = express();
app.use(cors());
app.use(router);

app.listen(8000, () => {
    console.log("Servidor iniciado na porta 8000");
});
