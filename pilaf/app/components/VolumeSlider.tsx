import React from "react";
import { Text } from "react-native";
import { Slider } from "react-native-elements/dist/slider/Slider";

interface VolumeSliderProps {
	label?: boolean;
	max?: number;
	volume: number;
	onVolume: (n: number) => void;
}

export const VolumeSlider: React.FC<VolumeSliderProps> = ({
	label,
	max = 100,
	volume,
	onVolume,
}) => {
	return (
		<>
			{label && <Text>Volume</Text>}
			<Text>{volume}</Text>
			<Slider
				value={volume}
				step={1}
				minimumValue={0}
				maximumValue={max}
				onValueChange={(value) => {
					onVolume(value);
				}}
			/>
		</>
	);
};
