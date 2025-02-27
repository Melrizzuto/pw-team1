import express from "express";
import errorsHandler from "./middlewares/errorsHandler.js";
import notFound from "./middlewares/notFound.js";
import router from "./routers/properties.js";
import reviewsRouter from "./routers/reviews.js";
import property_type_Router from "./routers/property_types.js";
import cors from "cors";
import multer from "multer";
import path from "path";

const app = express(); // Creazione istanza dell'app express
const port = 3000;

// Abilita CORS per tutte le richieste
app.use(cors());

// Imposta una cartella statica "public" per servire file statici
app.use("/public", express.static(path.join(process.cwd(), "public")));

// Imposta il middleware per il parsing del corpo delle richieste in formato JSON
app.use(express.json());

app.use("/api", property_type_Router);

// Registra il router delle proprietà
app.use("/properties", router);

// Registra il router delle recensioni
app.use("/properties/:slug/reviews", reviewsRouter);

// Usa il middleware per la gestione degli errori globali
app.use(errorsHandler);

// Usa il middleware per gestire le richieste a rotte non definite
app.use(notFound);

// Avvia il server, ascoltando sulla porta definita
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
