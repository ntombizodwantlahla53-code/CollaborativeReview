import express from "express";
import dotenv from "dotenv";
import {textDbConnection} from "./config/database"
import projectRoutes from "./routes/projectRoutes"
import authRoutes from "./routes/authRoutes"
import protectMembersRoutes from "./routes/protectMembersRoutes"
import submissionRoutes from "./routes/submissionRoutes"
import commentRoutes from "./routes/commentRoutes"
import reviewRoutes from "./routes/reviewRoutes"

dotenv.config();

const app = express()
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await textDbConnection();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api',projectRoutes);
app.use('/api', protectMembersRoutes);
app.use('/api', submissionRoutes);
app.use('/api', commentRoutes);
app.use('/api', reviewRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
}
startServer()