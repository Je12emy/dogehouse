"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateStruct = void 0;
const validateStruct = (struct) => (values) => {
    let errors = {};
    const [result] = struct.validate(values);
    for (const failure of (result === null || result === void 0 ? void 0 : result.failures()) || []) {
        errors[failure.path[0]] = failure.message;
    }
    return errors;
};
exports.validateStruct = validateStruct;
