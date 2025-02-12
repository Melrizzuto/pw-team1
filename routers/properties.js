import { Router } from "express";
import {
    addProperty,
    searchProperties,
    getPropertyBySlug,
    contactOwner
} from "../controllers/PropertyController.js";
import { likeProperty } from "../controllers/PropertyController.js";
const router = Router();
// Rotte

// Ricerca proprietà
router.get("/", searchProperties);

// Dettagli proprietà
router.get("/:slug", getPropertyBySlug);

// Aggiunta proprietà
router.post("/", addProperty);

// Contattare il proprietario
router.post("/:slug/contact", contactOwner);

//Aggiungere un like
router.patch("/:slug/like", likeProperty);

// Export router
export default router;