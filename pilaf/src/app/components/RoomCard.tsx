import React from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { CurrentRoom, Room } from "../types";
import { useMeQuery } from "../utils/useMeQuery";

interface RoomProps {
	active?: boolean;
	onClick: () => void;
	room: Room | CurrentRoom;
	currentRoomId: string | undefined;
}

export const RoomCard: React.FC<RoomProps> = ({
	room,
	onClick,
	active,
	currentRoomId,
}) => {
	const { me } = useMeQuery();

	let n = room.numPeopleInside;
	const previewNodes = [];
	let userList = room.peoplePreviewList;
	if (currentRoomId === room.id && "users" in room) {
		n = room.users.length;
		userList = room.users;
	}
	for (let i = 0; i < Math.min(6, userList.length); i++) {
		const p = userList[i];
		if (p.id === me?.id && currentRoomId !== room.id) {
			n--;
			continue;
		}
		previewNodes.push(
			<Text style={styles.userName} key={p.id}>
				{p.displayName?.slice(0, 50)}
			</Text>
		);
		if (i >= 4 && previewNodes.length >= 5) {
			break;
		}
	}

	return (
		<TouchableOpacity onPress={onClick}>
			<View style={styles.card}>
				<Text style={styles.title}>{room.name?.slice(0, 100)}</Text>
				{previewNodes}
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	card: {
		backgroundColor: "rgba(51,51,51,1);",
		padding: 16,
		marginBottom: 16,
		borderRadius: 8,
	},
	title: {
		color: "white",
		marginBottom: 8,
		fontSize: 18,
	},
	userName: {
		color: "white",
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
