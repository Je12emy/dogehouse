import create from "zustand";
import { combine } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { __prod__ } from "../constants";

const accessTokenKey = "@toum/token" + (__prod__ ? "" : "dev");
const refreshTokenKey = "@toum/refresh-token" + (__prod__ ? "" : "dev");

const getDefaultValues = async () => {
	try {
		const accessToken = await AsyncStorage.getItem(accessTokenKey);
		const refreshToken = await AsyncStorage.getItem(refreshTokenKey);
		return {
			accessToken: accessToken || "",
			refreshToken: refreshToken || "",
		};
	} catch {
		return {
			accessToken: "",
			refreshToken: "",
		};
	}
};

export const useTokenStore = create(
	combine({ accessToken: undefined, refreshToken: undefined }, (set) => ({
		setTokens: (x: { accessToken: string; refreshToken: string }) => {
			try {
				localStorage.setItem(accessTokenKey, x.accessToken);
				localStorage.setItem(refreshTokenKey, x.refreshToken);
			} catch {}

			set(x);
		},
		loadTokens: async () => {
			const defaultValues = await getDefaultValues();
			set(defaultValues);
		},
	}))
);

// export const useTokenStore = create((set) => ({
// 	getTokensAsync: async () => await getDefaultValues(),
// 	setTokens: async (x: { accessToken: string; refreshToken: string }) => {
// 		try {
// 			AsyncStorage.setItem(accessTokenKey, x.accessToken);
// 			AsyncStorage.setItem(refreshTokenKey, x.refreshToken);
// 		} catch {}

// 		set(x);
// 	},
// }));
