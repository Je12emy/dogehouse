import { useQuery } from "react-query";
import { auth_query } from "../../createWebsocket";
import { BaseUser } from "doge-core";

export const useMeQuery = () => {
  const { data } = useQuery<{ user: BaseUser }>(auth_query, {
    notifyOnChangeProps: ["data"],
    enabled: false,
  });

  return { me: data?.user };
};
