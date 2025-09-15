import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import chatRouter from "./routes/chatRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import creditRouter from "./routes/creditRoutes.js";
import { stripeWebhooks } from "./controllers/webhooks.js";

const app = express();

// Database connectivity
await connectDB();

// Stripe Webhooks
app.post("/api/stripe", express.raw({ type: "application/json" }), stripeWebhooks)


//middleware
app.use(express.json());
app.use(cors());

// Routes

app.get("/", (req, res) => {
  res.send("Server is Live!");
});
app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message", messageRouter);
app.use("/api/credit", creditRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.warn(`Server is running on port ${PORT}`);
});
