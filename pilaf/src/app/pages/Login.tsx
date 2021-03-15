import React, { useCallback } from "react";
import { Alert, Button, Linking, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { InAppBrowser } from "react-native-inappbrowser-reborn";
import ListItem from "../components/ListItem";
import Logo from "../components/Logo";

const Login: React.FC = () => {
	const signinWithGithub = async () => {
		try {
			const url =
				"https://doge-staging.stripcode.dev/auth/github/web?redirect_after_base=dogehouse://home";
			if (await InAppBrowser.isAvailable()) {
				const result = await InAppBrowser.open(url, {
					// iOS Properties
					dismissButtonStyle: "cancel",
					preferredBarTintColor: "rgba(30, 30, 30, 1)",
					preferredControlTintColor: "white",
					readerMode: false,
					animated: true,
					modalPresentationStyle: "fullScreen",
					modalTransitionStyle: "coverVertical",
					modalEnabled: true,
					enableBarCollapsing: false,
					// Android Properties
					showTitle: true,
					toolbarColor: "rgba(30, 30, 30, 1)",
					secondaryToolbarColor: "black",
					enableUrlBarHiding: true,
					enableDefaultShare: true,
					forceCloseOnRedirection: false,
					// Specify full animation resource identifier(package:anim/name)
					// or only resource name(in case of animation bundled with app).
					animations: {
						startEnter: "slide_in_right",
						startExit: "slide_out_left",
						endEnter: "slide_in_left",
						endExit: "slide_out_right",
					},
					headers: {
						"my-custom-header": "my custom header value",
					},
				});
			} else Linking.openURL(url);
		} catch (error) {
			Alert.alert(error.message);
		}
	};

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
				<Button title={"Sign in with Github"} onPress={signinWithGithub} />
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
