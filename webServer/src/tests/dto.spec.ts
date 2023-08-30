import * as t from "io-ts";
import { decodeDTO } from "../UsageDTO";

const DummyObj = t.type({
    firstProp: t.string,
    secondProp: t.number,
});

describe("Decode DTO", () => {
    it("usage", () => {
        let payload = { firstProp: "a", secondProp: 1 };
        const result = decodeDTO(DummyObj, payload);
        expect(result).toBe(payload);
    });

    it("usage - wrong payload", () => {
        let payload = { firstProp: 2, secondProp: 1 };
        const expectedErr = [{ input: 2, key: "firstProp", expectedType: "string" }];
        expect(() => {
            decodeDTO(DummyObj, payload);
        }).toThrow(JSON.stringify(expectedErr));
    });
});
