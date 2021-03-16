import AsyncStorage from "@react-native-async-storage/async-storage";
import create from "zustand";
import { combine } from "zustand/middleware";

export const MIC_KEY = "micId";

export const useMicIdStore = create(
	combine(
		{
			micId: AsyncStorage.getItem(MIC_KEY) || "",
		},
		(set) => ({
			loadMicId: async () => {
				try {
					const id = await AsyncStorage.getItem(MIC_KEY, "");
					set({ micId: id });
				} catch {}
			},
			setMicId: async (id: string) => {
				try {
					AsyncStorage.setItem(MIC_KEY, id);
				} catch {}
				set({ micId: id });
			},
		})
	)
);
