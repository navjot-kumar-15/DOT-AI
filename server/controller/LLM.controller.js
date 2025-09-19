import LLMService from "../services/LLM.services.js";

export const send_message_to_llm = async (req, res) => {
  try {
    const { message } = req.body;
    const result = await LLMService.send_message_to_llm(message);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to send message to LLM" });
  }
};
