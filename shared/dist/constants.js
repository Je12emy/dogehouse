"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkRegex = exports.apiBaseUrl = exports.__staging__ = exports.__prod__ = void 0;
exports.__prod__ = process.env.NODE_ENV === "production";
exports.__staging__ = process.env.REACT_APP_IS_STAGING === "true";
exports.apiBaseUrl = process.env.REACT_APP_API_BASE_URL ||
    (exports.__prod__ ? "https://api.dogehouse.tv" : "http://192.168.1.165:4001");
exports.linkRegex = /(https?:\/\/)(www\.)?([-a-z0-9]{1,63}\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\.[a-z]{1,6}(\/[-\\w@\\+\\.~#\\?&/=%]*)?[^\s()]+/;
