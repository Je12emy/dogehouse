import { useQuery } from "react-query";
import { auth_query } from "../../webrtc/createWebsocket";
import { BaseUser } from "../types";

export const useMeQuery = () => {
	const { data } = useQuery<{ user: BaseUser }>(auth_query, {
		notifyOnChangeProps: ["data"],
		enabled: false,
	});

	return { me: data?.user };
};
