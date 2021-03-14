"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.truncate = void 0;
const truncate = (string, max = 100) => string.length > max ? string.substring(0, max) + "..." : string;
exports.truncate = truncate;
