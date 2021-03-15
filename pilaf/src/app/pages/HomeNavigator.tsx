import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Home from "./Home";
import Room from "./Room";

const HomeNavigator: React.FC = () => {
	const Stack = createStackNavigator();

	return (
		<>
			<Stack.Navigator>
				<Stack.Screen
					name="Home"
					component={Home}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Room"
					component={Room}
					options={({ route }) => ({ title: route.params.roomId })}
				/>
			</Stack.Navigator>
		</>
	);
};

export default HomeNavigator;
