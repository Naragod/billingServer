import { createUsageRecord } from "apilibrary";

const main = async () => {
    const record = {
        customerId: "" as any,
        service: "newService",
        unitsConsumed: 10,
        pricePerUnit: 1.56,
    };
    const result = await createUsageRecord(record);
    console.log("Result:", result);
};

main();
