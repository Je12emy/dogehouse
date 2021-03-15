/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { StyleSheet, StatusBar, View, Linking } from "react-native";

import { Colors } from "react-native/Libraries/NewAppScreen";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./app/pages/Login";
import { VolumeSlider } from "./app/components/VolumeSlider";
import { InAppBrowser } from "react-native-inappbrowser-reborn";
import { useTokenStore } from "./app/utils/useTokenStore";
import queryString from "query-string";
import { useSaveTokensFromQueryParams } from "./app/utils/useSaveTokensFromQueryParams";

const App: React.FC = () => {
	const [accessToken, setAccessToken] = useState("");
	const [refreshToken, setRefreshToken] = useState("");

	if (!useTokenStore.getState().accessToken) {
		useTokenStore.getState().loadTokens();
	}
	useSaveTokensFromQueryParams();

	const hasTokens = useTokenStore((s) => !!s.accessToken && !!s.refreshToken);

	return (
		<NavigationContainer>
			<StatusBar barStyle="dark-content" />
			{!hasTokens && <Login />}
			{hasTokens && (
				<VolumeSlider volume={50} onVolume={(v) => console.log(v)} />
			)}
		</NavigationContainer>
	);
};

StyleSheet.create({
	scrollView: {
		backgroundColor: Colors.lighter,
	},
	engine: {
		position: "absolute",
		right: 0,
	},
	body: {
		backgroundColor: Colors.white,
	},
	sectionContainer: {
		marginTop: 32,
		paddingHorizontal: 24,
	},
	sectionTitle: {
		fontSize: 24,
		fontWeight: "600",
		color: Colors.black,
	},
	sectionDescription: {
		marginTop: 8,
		fontSize: 18,
		fontWeight: "400",
		color: Colors.dark,
	},
	highlight: {
		fontWeight: "700",
	},
	footer: {
		color: Colors.dark,
		fontSize: 12,
		fontWeight: "600",
		padding: 4,
		paddingRight: 12,
		textAlign: "right",
	},
});

export default App;
