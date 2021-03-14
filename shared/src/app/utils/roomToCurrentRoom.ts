import { CurrentRoom, Room } from "../..";

export const roomToCurrentRoom = (r: Room): CurrentRoom => {
  return {
    ...r,
    muteMap: {},
    users: [],
    activeSpeakerMap: {},
    autoSpeaker: false,
  };
};
