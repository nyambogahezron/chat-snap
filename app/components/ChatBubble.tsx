import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Message } from '../types';
import { formatTime } from '../utils/timeFormat';
import UserAvatar from './UserAvatar';
import Animated, { FadeIn, SlideInRight } from 'react-native-reanimated';

interface ChatBubbleProps {
	message: Message;
	isFromCurrentUser: boolean;
	showAvatar?: boolean;
	avatar?: string;
}

export default function ChatBubble({
	message,
	isFromCurrentUser,
	showAvatar = false,
	avatar,
}: ChatBubbleProps) {
	// Get message status icon
	const getStatusIcon = () => {
		switch (message.status) {
			case 'sending':
				return <Ionicons name='time-outline' size={14} color='#8E8E93' />;
			case 'sent':
				return <Ionicons name='checkmark' size={14} color='#8E8E93' />;
			case 'delivered':
				return <Ionicons name='checkmark-done' size={14} color='#8E8E93' />;
			case 'read':
				return (
					<Ionicons name='checkmark-done' size={14} color={Colors.primary} />
				);
			default:
				return null;
		}
	};

	return (
		<Animated.View
			entering={
				isFromCurrentUser ? SlideInRight.duration(300) : FadeIn.duration(300)
			}
			style={[
				styles.container,
				isFromCurrentUser ? styles.rightContainer : styles.leftContainer,
			]}
		>
			{showAvatar && (
				<UserAvatar uri={avatar} size={28} style={styles.avatar} />
			)}
			<View
				style={[
					styles.bubble,
					isFromCurrentUser ? styles.rightBubble : styles.leftBubble,
					!showAvatar && !isFromCurrentUser && styles.leftBubbleNoAvatar,
				]}
			>
				<Text
					style={[
						styles.text,
						isFromCurrentUser ? styles.rightText : styles.leftText,
					]}
				>
					{message.text}
				</Text>
				<View style={styles.timeContainer}>
					<Text style={styles.time}>{formatTime(message.createdAt)}</Text>
					{isFromCurrentUser && getStatusIcon()}
				</View>
			</View>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginVertical: 4,
		flexDirection: 'row',
		alignItems: 'flex-end',
	},
	leftContainer: {
		justifyContent: 'flex-start',
		marginRight: 80,
	},
	rightContainer: {
		justifyContent: 'flex-end',
		marginLeft: 80,
	},
	avatar: {
		marginRight: 8,
	},
	bubble: {
		borderRadius: 16,
		paddingHorizontal: 12,
		paddingVertical: 8,
		maxWidth: '100%',
	},
	leftBubble: {
		backgroundColor: Colors.grey,
		borderBottomLeftRadius: 4,
	},
	leftBubbleNoAvatar: {
		borderBottomLeftRadius: 16,
	},
	rightBubble: {
		backgroundColor: Colors.primary,
		borderBottomRightRadius: 4,
	},
	text: {
		fontSize: 16,
		lineHeight: 22,
	},
	leftText: {
		color: Colors.text,
	},
	rightText: {
		color: '#fff',
	},
	timeContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
		marginTop: 2,
	},
	time: {
		fontSize: 11,
		marginRight: 4,
		color: 'rgba(0, 0, 0, 0.5)',
	},
});
