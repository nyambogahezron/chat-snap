import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '@/constants/Colors';

interface UserAvatarProps {
	uri?: string;
	name?: string;
	size?: number;
	isOnline?: boolean;
	style?: ViewStyle;
}

export default function UserAvatar({
	uri,
	name,
	size = 40,
	isOnline = false,
	style,
}: UserAvatarProps) {
	// Get initials from name
	const getInitials = () => {
		if (!name) return '?';

		const names = name.split(' ');
		if (names.length === 1) return names[0].charAt(0).toUpperCase();

		return (
			names[0].charAt(0) + names[names.length - 1].charAt(0)
		).toUpperCase();
	};

	// Generate a deterministic color based on the name or uri
	const getColor = () => {
		const hash = (name || uri || '')
			.split('')
			.reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) % 100, 0);

		const colors = [
			'#FF6B6B',
			'#4ECDC4',
			'#FF9F1C',
			'#2A9D8F',
			'#E76F51',
			'#8338EC',
			'#3A86FF',
			'#FB5607',
			'#FFBE0B',
			'#06D6A0',
		];

		return colors[hash % colors.length];
	};

	return (
		<View style={[style, { position: 'relative', width: size, height: size }]}>
			<View
				style={[
					styles.avatar,
					{
						width: size,
						height: size,
						borderRadius: size / 2,
						backgroundColor: getColor(),
					},
				]}
			>
				<Text style={[styles.initials, { fontSize: size * 0.4 }]}>
					{getInitials()}
				</Text>
			</View>

			{isOnline && (
				<View
					style={[
						styles.statusDot,
						{
							width: size * 0.3,
							height: size * 0.3,
							borderRadius: size * 0.15,
							right: -size * 0.05,
							bottom: -size * 0.05,
							borderWidth: size * 0.05,
						},
					]}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	avatar: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.grey,
	},
	initials: {
		color: 'white',
		fontWeight: 'bold',
	},
	statusDot: {
		position: 'absolute',
		backgroundColor: Colors.status,
		borderColor: Colors.background,
	},
});
