import express from "express";
import cors from "cors";
import { config } from "dotenv";
config();
import http from "http";
import routes from "./routes/index.js";

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
