import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import errorHandler from "./middlewares/errorHandler";
dotenv.config();

import { router } from "./routes";
import { AppError } from "./errors/AppError";

import log from "./utils/log";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Serve static files from the "public/uploads" folder
app.use("/uploads", express.static(path.resolve(__dirname, "../uploads")));

app.use(router);

app.use(errorHandler);

export const server = app.listen(8000, () => {
	console.log("Servidor rodando na porta 8000");
});

app.get("/", (req, res) => {
	res.json({
		message: "Olá, munde!",
	});
});
