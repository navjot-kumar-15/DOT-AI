import express from "express";
import cors from "cors";
import { config } from "dotenv";
config();
import http from "http";
import { socketInitialize } from "./socket/socketInitialize.js";

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

socketInitialize(server);

server.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
