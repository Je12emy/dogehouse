import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCurrentRoomStore } from "../../webrtc/stores/useCurrentRoomStore";
import { useMuteStore } from "../../webrtc/stores/useMuteStore";
import { useCurrentRoomInfo } from "../atoms";
import { RoomUserNode } from "../components/RoomUserNode";
import { BaseUser } from "../types";
import { isUuid } from "../utils/isUuid";
import { useMeQuery } from "../utils/useMeQuery";

const Room: React.FC = ({ route, navigation }) => {
	const id = route.params.roomId;

	const [userProfileId, setUserProfileId] = useState("");
	const { currentRoom: room } = useCurrentRoomStore();
	const { muted } = useMuteStore();
	const { me } = useMeQuery();
	const {
		isMod: iAmMod,
		isCreator: iAmCreator,
		canSpeak: iCanSpeak,
	} = useCurrentRoomInfo();
	//const fullscreenChatOpen = useShouldFullscreenChat();
	const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);

	console.log(id);
	if (!isUuid(id)) {
		navigation.navigate("Home");
	}

	if (!room) {
		return <ActivityIndicator />;
	}

	const profile = room.users.find((x) => x.id === userProfileId);

	const speakers: BaseUser[] = [];
	const unansweredHands: BaseUser[] = [];
	const listeners: BaseUser[] = [];
	let canIAskToSpeak = false;

	room.users.forEach((u) => {
		if (u.id === room.creatorId || u.roomPermissions?.isSpeaker) {
			speakers.push(u);
		} else if (u.roomPermissions?.askedToSpeak) {
			unansweredHands.push(u);
		} else {
			canIAskToSpeak = true;
			listeners.push(u);
		}
	});

	return (
		<>
			<SafeAreaView style={styles.content}>
				<Text style={styles.textPrimary}>{"Speaker"}</Text>
				{speakers.map((u) => (
					<RoomUserNode
						key={u.id}
						room={room}
						u={u}
						muted={muted}
						setUserProfileId={setUserProfileId}
						me={me}
						profile={profile}
					/>
				))}
				<Text style={styles.textPrimary}>{"Listeners"}</Text>
				{listeners.map((u) => (
					<RoomUserNode
						key={u.id}
						room={room}
						u={u}
						muted={muted}
						setUserProfileId={setUserProfileId}
						me={me}
						profile={profile}
					/>
				))}
			</SafeAreaView>
		</>
	);
};

const styles = StyleSheet.create({
	content: {
		flex: 1,
		backgroundColor: "rgba(30, 30, 30, 1)",
		padding: 16,
	},
	textPrimary: {
		color: "white",
		fontSize: 24,
		fontWeight: "bold",
		textAlign: "center",
		marginTop: 16,
		marginBottom: 16,
	},
	listItem: {
		marginTop: 16,
		marginLeft: 16,
	},
	textSecondary: {
		color: "white",
		fontSize: 16,
	},
	logo: {
		alignSelf: "center",
	},
});

export default Room;
