export declare type Room = {
    id: string;
    name: string;
    description?: string;
    isPrivate: boolean;
    numPeopleInside: number;
    creatorId: string;
    peoplePreviewList: Array<{
        id: string;
        displayName: string;
        numFollowers: number;
    }>;
};
export declare type BaseUser = {
    username: string;
    online: boolean;
    lastOnline: Date;
    id: string;
    bio: string;
    displayName: string;
    avatarUrl: string;
    numFollowing: number;
    numFollowers: number;
    currentRoom?: Room;
};
export declare type PaginatedBaseUsers = {
    users: BaseUser[];
    nextCursor: number | null;
};
export declare type RoomPermissions = {
    askedToSpeak: boolean;
    isSpeaker: boolean;
    isMod: boolean;
};
export declare type UserWithFollowInfo = BaseUser & {
    followsYou?: boolean;
    youAreFollowing?: boolean;
};
export declare type RoomUser = {
    roomPermissions?: RoomPermissions | null;
} & UserWithFollowInfo;
export declare type CurrentRoom = Room & {
    users: RoomUser[];
    muteMap: Record<string, boolean>;
    activeSpeakerMap: Record<string, boolean>;
    autoSpeaker: boolean;
};
export declare type WsParam = {
    op: string;
    d: any;
};
export interface ScheduledRoom {
    roomId: string | null;
    description: string;
    scheduledFor: string;
    numAttending: number;
    name: string;
    id: string;
    creatorId: string;
    creator: BaseUser;
}
export interface ScheduledRoomsInfo {
    scheduledRooms: ScheduledRoom[];
    nextCursor?: string | null;
}
export interface PublicRoomsQuery {
    rooms: Room[];
    nextCursor: number | null;
}
