export interface UsageRecord {
    customerId: number;
    service: string;
    unitsConsumed: number;
    pricePerUnit: number;
}

export const createUsageRecord = async (record: UsageRecord) => {
    const response = await fetch("http://localhost:1234/usageReport/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
    });
    return await response.json();
};
