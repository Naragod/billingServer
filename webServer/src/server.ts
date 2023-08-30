import { Client } from "pg";
import { logger } from "./main";
import { DatabaseService } from "./dbService";
import { UsageRecord, decodeDTO } from "./UsageDTO";
import express, { Request, Response } from "express";

export const port = 1234;
// TODO: Extract these values to a config file, something more secure
const databaseConfig = { host: "localhost", port: 5432, user: "postgres", database: "billing_records" };

//variables
//* ************************************************************************ */
export const app = express();
const dbClient = new Client(databaseConfig);
const dbService = new DatabaseService(dbClient);

// parses incoming JSON payloads
app.use(express.json());

app.post("/usageReport", async (req: Request, res: Response) => {
    try {
        const result = decodeDTO(UsageRecord, req.body);
        await dbService.saveUsageRecord(result);
        return res.json({ success: "yes" });
    } catch (err: any) {
        // TODO: implement proper error handling
        logger.error(err.message);
        return res.status(400).json({ success: "no", err: err.message });
    }
});
