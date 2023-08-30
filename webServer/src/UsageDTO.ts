import { match, isLeft } from "fp-ts/Either";
import { pipe } from "fp-ts/function";
import * as t from "io-ts";

export const UsageRecord = t.type({
    customerId: t.number,
    service: t.string,
    unitsConsumed: t.number,
    pricePerUnit: t.number,
});

export type UsageRecordT = t.TypeOf<typeof UsageRecord>;

const validate = <A>(validation: t.Validation<A>): Array<string> => {
    return pipe(
        validation,
        match(
            (errors: any) =>
                errors.map((err: any) => {
                    const context = err.context[1];
                    const { actual, key, type } = context;
                    return { input: actual ?? "undefined", key: key, expectedType: type.name };
                }),
            (v) => v
        )
    );
};

export const decodeDTO = <A, I>(decoder: t.Decoder<I, A>, payload: I): A => {
    const decoded = decoder.decode(payload);

    if (isLeft(decoded)) {
        const errorMessage = validate(decoded);
        throw new Error(JSON.stringify(errorMessage));
    }
    return decoded.right;
};
