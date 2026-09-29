import express from "express";
import dotenv from "dotenv";
import {textDbConnection} from "./config/database"
import projectRoutes from "./routes/projectRoutes"
import authRoutes from "./routes/authRoutes"

dotenv.config();

const app = express()
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await textDbConnection();
app.use(express.json());
app.use('/api/auth', authRoutes)
app.use('/api',projectRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
}
startServer()