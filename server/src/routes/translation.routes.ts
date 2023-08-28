import { Router } from "express";

import { GetTranslationsController } from "../controllers/data/getTranslations/GetTranslationsController";
import { WatchTranslationController } from "../controllers/data/watchTranslation/WatchTranslationController";
import { DeleteTranslationController } from "../controllers/data/deleteTranslations/DeleteTranslationController";
import { EditTranslationController } from "../controllers/edit/editTranslation/EditTranslationController";
import { EditMultipleController } from "../controllers/edit/editMultiple/EditMultipleController";
import { TranslateController } from "../controllers/translations/translate/TranslateController";

const getTranslationsController = new GetTranslationsController();
const watchTranslationController = new WatchTranslationController();
const deleteTranslationController = new DeleteTranslationController();
const editTranslationController = new EditTranslationController();
const editMultipleController = new EditMultipleController();
const translateController = new TranslateController();

const translationRoutes = Router();

translationRoutes.get("/", getTranslationsController.handle);
translationRoutes.get("/watch", watchTranslationController.handle);
translationRoutes.put("/edit/:id", editTranslationController.handle);
translationRoutes.delete("/delete/:ids", deleteTranslationController.handle);
translationRoutes.put("/editMultiple", editMultipleController.handle);
translationRoutes.get("/translate/:id", translateController.handle);

export default translationRoutes;
