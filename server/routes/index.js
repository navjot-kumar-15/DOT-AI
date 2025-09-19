import { Router } from "express";
import LLMRoutes from "./LLM.routes.js";

const router = Router();
router.use("/llm", LLMRoutes);

export default router;
