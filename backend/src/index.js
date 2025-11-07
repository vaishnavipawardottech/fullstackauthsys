import dotenv from "dotenv";
import { app } from "./app.js";
import { checkConnection } from "./db/index.js";
import { createTable } from "./utils/database.js";

const PORT = process.env.PORT || 3000;

dotenv.config({
    path: "./.env"
})

app.listen(PORT, async () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
    try {
        await checkConnection();
        await createTable();
    } catch (error) {
        console.log("failed to initialiaze the database: ", error);
    }
})