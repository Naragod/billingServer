// Must be declared at the top, as const is not hoisted
const mockLogger = { info: jest.fn(), error: jest.fn() };

import { DatabaseService } from "../dbService";
import { UsageRecordT } from "../UsageDTO";

jest.mock("../main", () => ({ logger: mockLogger }));

const getMockClient = (queryResult = jest.fn()) => {
    return {
        connect: jest.fn(),
        query: queryResult,
        end: jest.fn(),
    };
};

describe("doesRecordExist", () => {
    const dummyUsageRecord: UsageRecordT = {
        customerId: 1,
        service: "dummyService",
        unitsConsumed: 1,
        pricePerUnit: 1.9,
    };
    let mClient = getMockClient();
    const dbService = new DatabaseService(mClient);

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("doesRecordExist usage", async () => {
        const { customerId, service } = dummyUsageRecord;
        jest.spyOn(mClient, "query").mockImplementation(() => {
            return { rows: [[1]] };
        });
        const doesRecordExist = await dbService.doesRecordExist(customerId, service);
        expect(mClient.query.mock.calls.length).toBe(1);
        expect(doesRecordExist).toBe(true);
    });

    it("saveUsageRecord -- record exists", async () => {
        jest.spyOn(mClient, "query").mockImplementation(() => {
            return { rows: [[1]] };
        });
        await dbService.saveUsageRecord(dummyUsageRecord);
        expect(mockLogger.info.mock.calls.length).toBe(1);
        expect(mClient.query.mock.calls.length).toBe(1);
    });

    it("saveUsageRecord -- record does not exists", async () => {
        jest.spyOn(mClient, "query").mockImplementation(() => {
            return { rows: [[0]] };
        });
        await dbService.saveUsageRecord(dummyUsageRecord);
        expect(mClient.query.mock.calls.length).toBe(2);
        expect(mockLogger.info.mock.calls.length).toBe(1);
    });

    it("Close client connection", async () => {
        await dbService.close();
        expect(mClient.end.mock.calls.length).toBe(1);
    });
});
