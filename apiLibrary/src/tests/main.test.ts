import { createUsageRecord } from "../main";

const mockResult = { json: () => Promise.resolve({ success: "somevalue" }) };
global.fetch = jest.fn(() => Promise.resolve({ json: mockResult.json })) as jest.Mock;

describe("Test Library", () => {
    it("createUsageRecord API - usage", async () => {
        const expectedValue = { success: "yes" };
        const record = { customerId: 2, service: "service", unitsConsumed: 10, pricePerUnit: 1.56 };

        jest.spyOn(mockResult, "json").mockImplementation(() => Promise.resolve(expectedValue));
        const result = await createUsageRecord(record);
        expect(result).toBe(expectedValue);
    });

    it("createUsageRecord API - wrong input", async () => {
        const error = [{ input: "", key: "customerId", expectedType: "number" }];
        const record: any = { customerId: "", service: "service", unitsConsumed: 10, pricePerUnit: 1.56 };
        const expectedValue = { success: "no", err: JSON.stringify(error) };

        jest.spyOn(mockResult, "json").mockImplementation(() => Promise.resolve(expectedValue));
        const result = await createUsageRecord(record);
        expect(result).toBe(expectedValue);
    });
});
