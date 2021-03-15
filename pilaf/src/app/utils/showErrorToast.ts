import Toast from "react-native-toast-message";

export const showErrorToast = (m: string) => {
	Toast.show({
		type: "error",
		position: "top",
		text1: "Hello",
		text2: m,
		visibilityTime: 4000,
		autoHide: true,
	});
};
