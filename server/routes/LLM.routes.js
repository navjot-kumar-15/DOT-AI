import { Router } from "express";
import { send_message_to_llm } from "../controller/LLM.controller.js";

const router = Router();

let endPoints = [
  {
    method: "post",
    path: "/send_message_to_llm",
    controller: send_message_to_llm,
    action: "send_message_to_llm",
  },
];

endPoints.forEach((endpoint) => {
  router[endpoint.method](endpoint.path, endpoint.controller);
});

export default router;
