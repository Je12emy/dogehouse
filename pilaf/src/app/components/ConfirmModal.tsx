import * as React from "react";
import { Modal, Text, View } from "react-native";
import { Button } from "react-native-elements";
import create from "zustand";
import { combine } from "zustand/middleware";

interface Props {}

type Fn = () => void;

const useConfirmModalStore = create(
	combine(
		{
			message: "",
			onConfirm: undefined as undefined | Fn,
		},
		(set) => ({
			close: () => set({ onConfirm: undefined, message: "" }),
			set,
		})
	)
);

export const modalConfirm = (message: string, onConfirm: Fn) => {
	useConfirmModalStore.getState().set({ onConfirm, message });
};

export const ConfirmModal: React.FC<Props> = () => {
	const { onConfirm, message, close } = useConfirmModalStore();
	return (
		<Modal visible={!!onConfirm} onRequestClose={() => close()}>
			<Text>{message}</Text>
			<Button title={"cancel"} onPress={close} />
			<Button
				title={"yes"}
				onPress={() => {
					close();
					onConfirm?.();
				}}
			/>
		</Modal>
	);
};
