import React, { ReactNode } from "react";
import { StyleSheet, View, Image } from "react-native";

interface ListItemProps {
	style: any;
	children: ReactNode;
}

const ListItem: React.FC<ListItemProps> = (props: ListItemProps) => {
	return (
		<View style={[props.style, styles.container]}>
			<Image
				style={styles.image}
				source={require("../../assets/dogehouse.png")}
			/>
			{props.children}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
	},
	image: {
		width: 16,
		height: 16,
		marginRight: 16,
	},
});

export default ListItem;
