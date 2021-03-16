import React, { useState } from "react";
import {
	ActivityIndicator,
	RefreshControl,
	StyleSheet,
	Text,
} from "react-native";
import { Button, Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { wsend, wsFetch } from "../../createWebsocket";
import { useCurrentRoomStore } from "../../webrtc/stores/useCurrentRoomStore";
import { useSocketStatus } from "../../webrtc/stores/useSocketStatus";
import { modalConfirm } from "../components/ConfirmModal";
import { RoomCard } from "../components/RoomCard";
import { CurrentRoom, PublicRoomsQuery, ScheduledRoom } from "../types";
import { useQuery, useQueryClient } from "react-query";
import { ScrollView } from "react-native-gesture-handler";
import Logo from "../components/Logo";
import { useNavigation } from "@react-navigation/core";
import { useMainWsHandler } from "../useMainWsHandler";

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
	const navigation = useNavigation();
	useMainWsHandler();
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
								navigation.navigate("Room", {
									roomId: r.id,
								});
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

	const [refreshing, setRefreshing] = React.useState(false);

	const wait = (timeout) => {
		return new Promise((resolve) => setTimeout(resolve, timeout));
	};

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		// TODO Refresh something for real
		wait(2000).then(() => setRefreshing(false));
	}, []);

	return (
		<>
			<SafeAreaView style={styles.content}>
				<Logo style={styles.dogehouseTitle} />
				<ScrollView
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={onRefresh}
							colors={["white"]}
							tintColor={"white"}
						/>
					}
				>
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
				</ScrollView>
				<Button
					containerStyle={styles.createRoomButton}
					buttonStyle={{ backgroundColor: "transparent" }}
					icon={<Icon name="add" size={24} color="white" />}
				/>
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
	dogehouseTitle: {
		alignSelf: "flex-start",
		marginBottom: 16,
	},
	createRoomButton: {
		position: "absolute",
		bottom: 16,
		right: 16,
		height: 48,
		width: 48,
		zIndex: 10,
		backgroundColor: "rgba(59,130,246,1)",
		borderRadius: 24,
		alignItems: "center",
		justifyContent: "center",
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
