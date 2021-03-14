import { CurrentRoom, Room } from "doge-core";

export const roomToCurrentRoom = (r: Room): CurrentRoom =>
  r
    ? {
        ...r,
        muteMap: {},
        users: [],
        activeSpeakerMap: {},
        autoSpeaker: false,
      }
    : r;
