
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import batchRoutes from "./routes/batchRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/batches", batchRoutes);



// Test API
app.get("/", (req, res) => {
    res.send("Welcome to Claso Backend API");
});

// Server
const PORT = process.env.PORT || 5000;

// Connect Database and Start Server
const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Claso server running on port ${PORT}`);
    });
};

startServer();
