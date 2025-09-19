import { generate_message } from "../lib/LLM.lib.js";

const send_message_to_llm = async (message) => {
  const result = await generate_message({ query: message });
  return result;
};

export default {
  send_message_to_llm,
};
