import React from "react";
import { Image } from "react-native";
import Login from "./pages/Login";
import { useTokenStore } from "./utils/useTokenStore";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { VolumeSlider } from "./components/VolumeSlider";
import Home from "./pages/Home";
import { Icon } from "react-native-elements";
import Schedule from "./pages/Schedule";
import Follow from "./pages/Follow";
import Profile from "./pages/Profile";
import { useMeQuery } from "./utils/useMeQuery";

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = () => {
	const hasTokens = useTokenStore((s) => !!s.accessToken && !!s.refreshToken);
	const { me } = useMeQuery();
	const Stack = createStackNavigator();
	const Tab = createBottomTabNavigator();
	if (hasTokens) {
		return (
			<Tab.Navigator
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						let iconName;

						if (route.name === "Home") {
							iconName = "home";
						} else if (route.name === "Schedule") {
							return <Icon name="calendar" type="ionicon" color={color} />;
						} else if (route.name === "Follow") {
							iconName = "group";
						} else if (route.name === "Profile") {
							return (
								<Image
									style={{ width: 24, height: 24, borderRadius: 12 }}
									source={{ uri: me.avatarUrl }}
								/>
							);
						}
						return <Icon name={iconName} size={size} color={color} />;
					},
				})}
				tabBarOptions={{
					activeTintColor: "tomato",
					inactiveTintColor: "gray",
					activeBackgroundColor: "rgba(30, 30, 30, 1)",
					inactiveBackgroundColor: "rgba(30, 30, 30, 1)",
				}}
			>
				<Tab.Screen name="Home" component={Home} options={{ title: "Home" }} />
				<Tab.Screen
					name="Schedule"
					component={Schedule}
					options={{ title: "Schedule" }}
				/>
				<Tab.Screen
					name="Follow"
					component={Follow}
					options={{ title: "Follow" }}
				/>
				<Tab.Screen name="Profile" component={Profile} options={{}} />
			</Tab.Navigator>
		);
	} else {
		return (
			<Stack.Navigator>
				<Stack.Screen name="SignIn" component={Login} />
			</Stack.Navigator>
		);
	}
};
