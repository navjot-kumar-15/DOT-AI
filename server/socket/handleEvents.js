import { generate_message } from "../helper/LLM.helper.js";

export const handleEvents = (socket, io) => {
  console.log(socket.id, "connected");

  socket.on("send-message", async (data) => {
    // Set a timeout to send a processing message after 2 seconds
    const processingTimeout = setTimeout(() => {
      io.to(data.socketId).emit("send-message", {
        content:
          "Your request is taking longer than expected. Please wait a moment...",
        role: "Dot AI",
        isLoading: true,
        id: `loading-${Date.now()}`,
      });
    }, 2000);

    try {
      // Generate the actual response
      let result = await generate_message({ query: data.text });
      console.log("Result", result);

      // Clear the timeout to prevent sending the processing message if response is fast
      clearTimeout(processingTimeout);

      // Send the actual response
      io.to(data.socketId).emit("send-message", {
        ...result,
        id: Date.now(),
      });
    } catch (error) {
      // Clear the timeout in case of error
      clearTimeout(processingTimeout);

      // Send an error message to the client
      io.to(data.socketId).emit("send-message", {
        content: "Sorry, an error occurred while processing your request.",
        role: "Dot AI",
        id: Date.now(),
      });
      console.error("Error in generate_message:", error);
    }
  });
};
