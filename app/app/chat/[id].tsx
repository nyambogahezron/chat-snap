import React, { useEffect, useState, useRef } from 'react';
import {
	View,
	StyleSheet,
	FlatList,
	ActivityIndicator,
	Text,
	KeyboardAvoidingView,
	Platform,
} from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import ChatBubble from '@/components/ChatBubble';
import ChatInput from '@/components/ChatInput';
import UserAvatar from '@/components/UserAvatar';
import TypingIndicator from '@/components/TypingIndicator';
import { getChatById, sendMessage } from '@/services/chatService';
import { Chat, Message } from '@/types';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';

export default function ChatScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const [chat, setChat] = useState<Chat | null>(null);
	const [messages, setMessages] = useState<Message[]>([]);
	const [isTyping, setIsTyping] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const flatListRef = useRef<FlatList>(null);
	const navigation = useNavigation();

	useEffect(() => {
		const loadChat = async () => {
			if (!id) return;

			const chatData = await getChatById(id);
			setChat(chatData);
			setMessages(chatData.messages);
			setIsLoading(false);

			// Set the chat title in the header
			navigation.setOptions({
				title: chatData.name,
				headerTitle: () => (
					<View style={styles.headerTitle}>
						<UserAvatar uri={chatData.avatar} size={32} />
						<Text style={styles.headerName}>{chatData.name}</Text>
					</View>
				),
			});
		};

		loadChat();
	}, [id, navigation]);

	const handleSend = async (text: string) => {
		if (!chat || !text.trim()) return;

		// Create new message object
		const newMessage: Message = {
			id: Date.now().toString(),
			text,
			createdAt: new Date().toISOString(),
			senderId: 'currentUser', // Current user always
			status: 'sending',
		};

		// Add to messages immediately for UI responsiveness
		setMessages((prevMessages) => [...prevMessages, newMessage]);

		// Scroll to bottom
		setTimeout(() => {
			flatListRef.current?.scrollToEnd({ animated: true });
		}, 100);

		// Simulate sending message
		const updatedMessage = await sendMessage(chat.id, text);

		// Update the message status after "sending"
		setMessages((prevMessages) =>
			prevMessages.map((msg) =>
				msg.id === newMessage.id ? { ...msg, status: 'sent' } : msg
			)
		);

		// Simulate typing indicator from the other person
		setTimeout(() => {
			setIsTyping(true);

			// After a delay, add the reply and hide typing indicator
			setTimeout(() => {
				setIsTyping(false);

				// Only add a reply if we're still on this screen
				if (chat) {
					const reply: Message = {
						id: Date.now().toString(),
						text: `Reply to: ${text}`,
						createdAt: new Date().toISOString(),
						senderId: chat.id, // From the other person
						status: 'read',
					};

					setMessages((prevMessages) => [...prevMessages, reply]);

					// Scroll to bottom again after reply
					setTimeout(() => {
						flatListRef.current?.scrollToEnd({ animated: true });
					}, 100);
				}
			}, 2500);
		}, 1500);
	};

	if (isLoading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size='large' color={Colors.primary} />
			</View>
		);
	}

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : undefined}
			style={styles.container}
			keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
		>
			<SafeAreaView edges={['bottom']} style={styles.safeArea}>
				<FlatList
					ref={flatListRef}
					data={messages}
					keyExtractor={(item) => item.id}
					renderItem={({ item, index }) => (
						<Animated.View entering={FadeInUp.delay(index * 50).duration(300)}>
							<ChatBubble
								message={item}
								isFromCurrentUser={item.senderId === 'currentUser'}
								showAvatar={item.senderId !== 'currentUser'}
								avatar={chat?.avatar}
							/>
						</Animated.View>
					)}
					contentContainerStyle={styles.messageList}
					onContentSizeChange={() =>
						flatListRef.current?.scrollToEnd({ animated: false })
					}
				/>

				{isTyping && (
					<View style={styles.typingContainer}>
						<UserAvatar uri={chat?.avatar} size={24} />
						<TypingIndicator />
					</View>
				)}

				<ChatInput onSend={handleSend} />
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.background,
		paddingBottom: 40,
	},
	safeArea: {
		flex: 1,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	messageList: {
		paddingHorizontal: 16,
		paddingTop: 10,
		paddingBottom: 40,
	},
	typingContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 16,
		paddingBottom: 8,
	},
	headerTitle: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	headerName: {
		marginLeft: 8,
		fontSize: 17,
		fontWeight: '600',
		color: Colors.text,
	},
});
