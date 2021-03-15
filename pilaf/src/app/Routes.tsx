import React from "react";
import Login from "./pages/Login";
import { useTokenStore } from "./utils/useTokenStore";
import { createStackNavigator } from "@react-navigation/stack";
import { VolumeSlider } from "./components/VolumeSlider";
import Home from "./pages/Home";

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = () => {
	const hasTokens = useTokenStore((s) => !!s.accessToken && !!s.refreshToken);
	const Stack = createStackNavigator();

	if (hasTokens) {
		return (
			<Stack.Navigator>
				<Stack.Screen name="Home" component={Home} />
			</Stack.Navigator>
		);
	} else {
		return (
			<Stack.Navigator>
				<Stack.Screen name="SignIn" component={Login} />
			</Stack.Navigator>
		);
	}
};
