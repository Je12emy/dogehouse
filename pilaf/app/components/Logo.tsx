import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

interface LogoProps {
	style: any;
}

const Logo: React.FC<LogoProps> = (props: LogoProps) => {
	return (
		<View style={[props.style, styles.container]}>
			<Image
				style={styles.image}
				source={require("../../assets/dogehouse.png")}
			/>
			<Text style={styles.text}>DogeHouse</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		height: 68,
	},
	image: {
		width: 65,
		height: 58,
		alignSelf: "flex-start",
	},
	text: {
		color: "#6b6659",
		fontSize: 40,
		fontWeight: "bold",
		alignSelf: "flex-end",
	},
});

export default Logo;
