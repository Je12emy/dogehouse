"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomToCurrentRoom = void 0;
const roomToCurrentRoom = (r) => r
    ? Object.assign(Object.assign({}, r), { muteMap: {}, users: [], activeSpeakerMap: {}, autoSpeaker: false }) : r;
exports.roomToCurrentRoom = roomToCurrentRoom;
