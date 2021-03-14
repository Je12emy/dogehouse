import { Struct } from "superstruct";
export declare const validateStruct: <T>(struct: Struct<T, unknown>) => (values: T) => Record<string, string>;
