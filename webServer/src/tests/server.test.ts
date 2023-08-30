import supertest from "supertest";
import { app } from "../server";

jest.mock("pg", () => {
    return {
        Client: jest.fn(() => {
            return {
                connect: jest.fn(),
                query: () => {
                    return { rows: [] };
                },
                end: jest.fn(),
            };
        }),
    };
});

jest.mock("../main", () => {
    return {
        logger: {
            info: jest.fn(),
            error: jest.fn(),
        },
    };
});

describe("Test usageReport endpoint", () => {
    it("usage - Success", async () => {
        const payload = {
            customerId: 1,
            service: "dummyService",
            unitsConsumed: 1,
            pricePerUnit: 1.9,
        };
        const response = await supertest(app)
            .post("/usageReport")
            .send(payload)
            .set("Content-Type", "application/json");
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ success: "yes" });
    });

    it("usage - False", async () => {
        const err = JSON.stringify([{ input: "", key: "customerId", expectedType: "number" }]);
        const payload = {
            customerId: "", // error happens because this is a string instead of a number
            service: "dummyService",
            unitsConsumed: 1,
            pricePerUnit: 1.8,
        };
        const response = await supertest(app)
            .post("/usageReport")
            .send(payload)
            .set("Content-Type", "application/json");
        expect(response.body).toEqual({ success: "no", err });
        expect(response.statusCode).toBe(400);
    });
});
