import * as React from "react";
import { View } from "react-native";
import { ReloadInstructions } from "react-native/Libraries/NewAppScreen";
//import { useSoundEffectStore } from "../modules/sound-effects/useSoundEffectStore";
import { wsend } from "../../webrtc/createWebsocket";
import { useTypeSafeTranslation } from "../utils/useTypeSafeTranslation";

interface Props {}

type Fn = () => void;

export type JoinRoomModalType = "invite" | "someone_you_follow_created_a_room";

export type UserPreviewInfo = {
	username: string;
	displayName: string;
	avatarUrl: string;
};

type Options = {
	type: JoinRoomModalType;
	roomId: string;
	roomName: string;
	onConfirm: Fn;
} & UserPreviewInfo;

// const useConfirmModalStore = create(
// 	combine(
// 		{
// 			options: null as null | Options,
// 		},
// 		(set) => ({
// 			close: () => set({ options: null }),
// 			set,
// 		})
// 	)
// );

export const invitedToRoomConfirm = (
	options: Omit<Options, "onConfirm">,
	history: History
) => {
	/*useSoundEffectStore.getState().playSoundEffect("roomInvite");
	useConfirmModalStore.getState().set({
		options: {
			...options,
			onConfirm: () => {
				wsend({ op: "join_room", d: { roomId: options.roomId } });
				history.push("/room/" + options.roomId);
			},
		},
	});*/
};

export const InvitedToJoinRoomModal: React.FC<Props> = () => {
	return <View></View>;
};
