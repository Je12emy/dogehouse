import React from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ListItem from "../components/ListItem";
import Logo from "../components/Logo";

const Login: React.FC = () => {
	return (
		<>
			<SafeAreaView style={styles.content}>
				<Logo style={styles.logo} />
				<Text style={styles.textPrimary}>
					Taking voice conversations to the moon 🚀
				</Text>
				<ListItem style={styles.listItem}>
					<Text style={styles.textSecondary}>Dark Theme</Text>
				</ListItem>
				<ListItem style={styles.listItem}>
					<Text style={styles.textSecondary}>Open Sign-Ups</Text>
				</ListItem>
				<ListItem style={styles.listItem}>
					<Text style={styles.textSecondary}>Cross-Platform Support</Text>
				</ListItem>
				<ListItem style={styles.listItem}>
					<Text style={styles.textSecondary}>Open Source</Text>
				</ListItem>
				<ListItem style={styles.listItem}>
					<Text style={styles.textSecondary}>Text Chat</Text>
				</ListItem>
				<ListItem style={styles.listItem}>
					<Text style={styles.textSecondary}>Powered by Doge</Text>
				</ListItem>
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

export default Login;
