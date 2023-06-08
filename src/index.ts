import * as dotenv from "dotenv";
dotenv.config();
import express from 'express';
import { router } from "./routes/routes";

const app = express();

app.use(express.json());

app.use("/joyas", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`);
}
);