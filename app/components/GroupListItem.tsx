import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
} from 'react-native-reanimated';
import { Group } from '../types';
import { Colors } from '@/constants/Colors';
import { formatTime } from '../utils/timeFormat';

interface GroupListItemProps {
	group: Group;
	onPress: () => void;
}

export default function GroupListItem({ group, onPress }: GroupListItemProps) {
	// Animation setup
	const scale = useSharedValue(1);

	// Animated styles
	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ scale: scale.value }],
		};
	});

	// Press handlers
	const handlePressIn = () => {
		scale.value = withTiming(0.98, { duration: 100 });
	};

	const handlePressOut = () => {
		scale.value = withTiming(1, { duration: 100 });
	};

	return (
		<TouchableOpacity
			onPress={onPress}
			onPressIn={handlePressIn}
			onPressOut={handlePressOut}
			activeOpacity={0.8}
		>
			<Animated.View style={[styles.container, animatedStyle]}>
				<View style={styles.avatarContainer}>
					<Image
						source={{ uri: `https://picsum.photos/200?random=${group.id}` }}
						style={styles.avatar}
					/>
					<View style={styles.memberCountBadge}>
						<Text style={styles.memberCountText}>{group.memberCount}</Text>
					</View>
				</View>

				<View style={styles.contentContainer}>
					<View style={styles.header}>
						<Text style={styles.name} numberOfLines={1}>
							{group.name}
						</Text>
						<Text style={styles.time}>{formatTime(group.lastMessageTime)}</Text>
					</View>

					<View style={styles.messageContainer}>
						<Text
							style={[
								styles.message,
								group.unreadCount > 0 && styles.unreadMessage,
							]}
							numberOfLines={1}
						>
							{group.lastMessage}
						</Text>

						<View style={styles.indicators}>
							{group.unreadCount > 0 ? (
								<View style={styles.badge}>
									<Text style={styles.badgeText}>{group.unreadCount}</Text>
								</View>
							) : (
								<Ionicons
									name={
										group.lastMessageStatus === 'sent'
											? 'checkmark'
											: group.lastMessageStatus === 'delivered'
											? 'checkmark-done'
											: group.lastMessageStatus === 'read'
											? 'checkmark-done'
											: 'time'
									}
									size={16}
									color={
										group.lastMessageStatus === 'read' ? Colors.primary : '#888'
									}
								/>
							)}
						</View>
					</View>
				</View>
			</Animated.View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		padding: 16,
		backgroundColor: Colors.background,
		borderBottomWidth: 1,
		borderBottomColor: '#f0f0f0',
	},
	avatarContainer: {
		position: 'relative',
		marginRight: 12,
	},
	avatar: {
		width: 56,
		height: 56,
		borderRadius: 28,
	},
	memberCountBadge: {
		position: 'absolute',
		bottom: -2,
		right: -2,
		backgroundColor: '#4CAF50',
		borderRadius: 10,
		width: 20,
		height: 20,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: Colors.background,
	},
	memberCountText: {
		color: 'white',
		fontSize: 10,
		fontWeight: 'bold',
	},
	contentContainer: {
		flex: 1,
		justifyContent: 'center',
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 4,
	},
	name: {
		fontSize: 16,
		fontWeight: 'bold',
		flex: 1,
		marginRight: 8,
	},
	time: {
		fontSize: 12,
		color: '#888',
	},
	messageContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	message: {
		fontSize: 14,
		color: '#888',
		flex: 1,
		marginRight: 8,
	},
	unreadMessage: {
		fontWeight: 'bold',
		color: Colors.text,
	},
	indicators: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	badge: {
		backgroundColor: Colors.primary,
		borderRadius: 10,
		minWidth: 20,
		height: 20,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 4,
	},
	badgeText: {
		color: 'white',
		fontSize: 11,
		fontWeight: 'bold',
	},
});
