import express from "express";
import { createServer } from "node:http";

import { Server } from "socket.io";
import dotenv from "dotenv"; // ✅ Add this lin
import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js";

import cors from "cors";

import userRoutes from "./routes/users.routes.js";
dotenv.config();

const app = express();
const server = createServer(app);

const io = connectToSocket(server);


app.set("port", (process.env.PORT || 8000))
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);

const start = async () => {
  try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');

        server.listen(app.get("port"), () => {
            console.log(`Server listening on port ${app.get("port")}`);
        });
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err.message);
        process.exit(1);
    }


}



start();