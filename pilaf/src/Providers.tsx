import React from "react";
import { QueryClientProvider } from "react-query";
import { ConfirmModal } from "./app/components/ConfirmModal";
import { queryClient } from "./app/queryClient";

interface ProvidersProps {}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ConfirmModal />
		</QueryClientProvider>
	);
};
