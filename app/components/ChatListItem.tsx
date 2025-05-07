import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import UserAvatar from './UserAvatar';
import { Colors } from '@/constants/Colors';
import { Chat } from '../types';
import { formatTime } from '../utils/timeFormat';

interface ChatListItemProps {
	chat: Chat;
	onPress: () => void;
}

export default function ChatListItem({ chat, onPress }: ChatListItemProps) {
	const getStatusIcon = () => {
		if (chat.unreadCount > 0) {
			return (
				<View style={styles.badge}>
					<Text style={styles.badgeText}>{chat.unreadCount}</Text>
				</View>
			);
		}

		switch (chat.lastMessageStatus) {
			case 'sending':
				return <Ionicons name='time-outline' size={16} color='#8E8E93' />;
			case 'sent':
				return <Ionicons name='checkmark' size={16} color='#8E8E93' />;
			case 'delivered':
				return <Ionicons name='checkmark-done' size={16} color='#8E8E93' />;
			case 'read':
				return (
					<Ionicons name='checkmark-done' size={16} color={Colors.primary} />
				);
			default:
				return null;
		}
	};

	return (
		<TouchableOpacity style={styles.container} onPress={onPress}>
			<UserAvatar
				uri={chat.avatar}
				size={56}
				isOnline={chat.isOnline}
				style={styles.avatar}
			/>

			<View style={styles.content}>
				<View style={styles.topRow}>
					<Text numberOfLines={1} style={styles.name}>
						{chat.name}
					</Text>
					<Text style={styles.time}>{formatTime(chat.lastMessageTime)}</Text>
				</View>

				<View style={styles.bottomRow}>
					<Text numberOfLines={1} style={styles.message}>
						{chat.typing ? 'Typing...' : chat.lastMessage}
					</Text>
					<View style={styles.statusContainer}>{getStatusIcon()}</View>
				</View>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 12,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: Colors.grey,
	},
	avatar: {
		marginRight: 12,
	},
	content: {
		flex: 1,
		justifyContent: 'center',
	},
	topRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 4,
	},
	name: {
		fontSize: 16,
		fontWeight: '600',
		color: Colors.text,
		flex: 1,
		marginRight: 8,
	},
	time: {
		fontSize: 12,
		color: '#8E8E93',
	},
	bottomRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	message: {
		fontSize: 14,
		// color: (chat) => (chat.typing ? Colors.primary : '#8E8E93'),
		flex: 1,
		marginRight: 8,
	},
	statusContainer: {
		width: 24,
		alignItems: 'center',
	},
	badge: {
		backgroundColor: Colors.primary,
		borderRadius: 12,
		minWidth: 20,
		height: 20,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 5,
	},
	badgeText: {
		color: '#fff',
		fontSize: 12,
		fontWeight: 'bold',
	},
});
