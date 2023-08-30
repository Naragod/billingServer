import { logger } from "./main";
import { UsageRecordT } from "./UsageDTO";

// I am extracting the database concerns here, this allows us to replace the client
// with any specific db client implentation. It allows us to abstract logging and
// error handling to this class.
export class DatabaseService {
    constructor(private client: any) {
        this.client = client;
        this.client.connect();
    }

    private async saveRecord(record: UsageRecordT): Promise<void> {
        const { customerId, service, unitsConsumed, pricePerUnit } = record;
        const query = {
            text: "INSERT INTO usage_records VALUES($1, $2, $3, $4)",
            values: [customerId, service, unitsConsumed, pricePerUnit],
            rowMode: "array",
        };
        await this.client.query(query);
    }

    async doesRecordExist(customerId: number, service: string): Promise<boolean> {
        const query = {
            text: "SELECT COUNT(*) FROM usage_records where customerid = $1 and service = $2",
            values: [customerId, service],
            rowMode: "array",
        };
        const { rows } = await this.client.query(query);
        const [count] = rows.flat();
        return Number(count) > 0;
    }

    async saveUsageRecord(record: UsageRecordT): Promise<void> {
        const { customerId, service } = record;
        const recordExists = await this.doesRecordExist(customerId, service);

        if (recordExists) {
            logger.info(`Record already exists in the database ${customerId}, ${service}`);
            return;
        }
        await this.saveRecord(record);
        logger.info(`New record created in the database ${customerId}, ${service}`);
    }

    async close() {
        this.client.end();
    }
}
