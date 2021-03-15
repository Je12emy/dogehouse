import React from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Follow: React.FC = () => {
	return (
		<>
			<SafeAreaView style={styles.content}>
				<Text style={styles.textPrimary}>{"Follow"}</Text>
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

export default Follow;
