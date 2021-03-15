import React, { useState } from "react";
import { View, Image } from "react-native";

interface AvatarProps {
	src: string;
	size?: number;
	active?: boolean;
	circle?: boolean;
	usernameForErrorImg?: string;
	className?: string;
	isOnline?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({
	src,
	size = 70,
	active,
	circle,
	usernameForErrorImg,
	className,
	isOnline,
}) => {
	const [error, setError] = useState(false);
	const image =
		error && usernameForErrorImg
			? `https://ui-avatars.com/api/?name=${usernameForErrorImg}`
			: src;
	return (
		<View>
			<Image
				style={{ width: 24, height: 24, borderRadius: 12 }}
				source={{ uri: image }}
			/>
		</View>
		// <div className="relative inline-block">
		//   <img
		//     alt="avatar"
		//     onError={() => setError(true)}
		//     width={size}
		//     height={size}
		//     style={active ? { boxShadow: "0 0 0 3px #60A5FA" } : undefined}
		//     className={`${circle ? `rounded-full` : `rounded-3xl`} ${className}`}
		//     src={
		//       error && usernameForErrorImg
		//         ? `https://ui-avatars.com/api/?name=${usernameForErrorImg}`
		//         : src
		//     }
		//   />

		//   {isOnline ? (
		//     <span className="rounded-full w-4 h-4 bg-green-500 absolute right-0 bottom-0"></span>
		//   ) : null}
		// </div>
	);
};
