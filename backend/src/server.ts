import express from "express";
import userRoutes from "./routes/userRoutes";
import taskRoutes from "./routes/taskRoutes";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', taskRoutes);

app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`);
});
