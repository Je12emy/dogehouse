"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiBaseUrl = exports.linkRegex = exports.__staging__ = exports.__prod__ = void 0;
var constants_1 = require("./constants");
Object.defineProperty(exports, "__prod__", { enumerable: true, get: function () { return constants_1.__prod__; } });
Object.defineProperty(exports, "__staging__", { enumerable: true, get: function () { return constants_1.__staging__; } });
Object.defineProperty(exports, "linkRegex", { enumerable: true, get: function () { return constants_1.linkRegex; } });
Object.defineProperty(exports, "apiBaseUrl", { enumerable: true, get: function () { return constants_1.apiBaseUrl; } });
