import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, Text } from "react-native";
import { Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { wsend, wsFetch } from "../../webrtc/createWebsocket";
import { useCurrentRoomStore } from "../../webrtc/stores/useCurrentRoomStore";
import { useSocketStatus } from "../../webrtc/stores/useSocketStatus";
import { modalConfirm } from "../components/ConfirmModal";
import { RoomCard } from "../components/RoomCard";
import { CurrentRoom, PublicRoomsQuery, ScheduledRoom } from "../types";
import { useQuery, useQueryClient } from "react-query";

interface HomeProps {}

const get_top_public_rooms = "get_top_public_rooms";

const Page = ({
	currentRoom,
	cursor,
	isLastPage,
	isOnlyPage,
}: {
	currentRoom: CurrentRoom | null;
	cursor: number;
	isLastPage: boolean;
	isOnlyPage: boolean;
	onLoadMore: (o: number) => void;
}) => {
	const { status } = useSocketStatus();
	const { isLoading, data } = useQuery<PublicRoomsQuery>(
		[get_top_public_rooms, cursor],
		() =>
			wsFetch<any>({
				op: get_top_public_rooms,
				d: { cursor },
			}),
		{
			staleTime: Infinity,
			enabled: status === "auth-good",
			refetchOnMount: "always",
		}
	);

	if (isLoading) {
		return <ActivityIndicator />;
	}

	if (!data) {
		return null;
	}

	if (isOnlyPage && data.rooms.length === 0) {
		return null;
	}

	return (
		<>
			{data.rooms.map((r) =>
				r.id === currentRoom?.id ? null : (
					<RoomCard
						key={r.id}
						onClick={() => {
							const joinRoom = () => {
								wsend({ op: "join_room", d: { roomId: r.id } });
								//history.push("/room/" + r.id);
							};
							currentRoom
								? modalConfirm(
										`Leave room '${currentRoom.name}' and join room '${r.name}'?`,
										joinRoom
								  )
								: joinRoom();
						}}
						room={r}
						currentRoomId={currentRoom?.id}
					/>
				)
			)}
			{isLastPage && data.nextCursor ? (
				<Button
					onPress={() =>
						wsend({
							op: "get_top_public_rooms",
							d: { cursor: data.nextCursor },
						})
					}
				>
					{"load more"}
				</Button>
			) : null}
		</>
	);
};

const get_my_scheduled_rooms_about_to_start =
	"get_my_scheduled_rooms_about_to_start";

export type GetMyScheduledRoomsAboutToStartQuery = {
	scheduledRooms: ScheduledRoom[];
};

const Home: React.FC = () => {
	const { currentRoom } = useCurrentRoomStore();
	const [cursors, setCursors] = useState([0]);
	const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);
	const queryClient = useQueryClient();
	const { status } = useSocketStatus();
	const { data } = useQuery<GetMyScheduledRoomsAboutToStartQuery>(
		get_my_scheduled_rooms_about_to_start,
		() => wsFetch<any>({ op: get_my_scheduled_rooms_about_to_start, d: {} }),
		{
			staleTime: Infinity,
			enabled: status === "auth-good",
			refetchOnMount: "always",
		}
	);

	return (
		<>
			<SafeAreaView style={styles.content}>
				{cursors.map((cursor, i) => (
					<Page
						key={cursor}
						currentRoom={currentRoom}
						cursor={cursor}
						isOnlyPage={cursors.length === 1}
						onLoadMore={(c) => setCursors([...cursors, c])}
						isLastPage={i === cursors.length - 1}
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

export default Home;
