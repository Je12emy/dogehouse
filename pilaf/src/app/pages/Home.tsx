import React, { useCallback } from "react";
import { Alert, Button, Linking, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { InAppBrowser } from "react-native-inappbrowser-reborn";
import ListItem from "../components/ListItem";
import Logo from "../components/Logo";

const Home: React.FC = () => {
	return (
		<>
			<SafeAreaView style={styles.content}>
				<Text>Welcome Home</Text>
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
