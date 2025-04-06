import { mockChats } from './mockData';
import { Chat, Message } from '../types';

// Get all chats
export const getChats = async (): Promise<Chat[]> => {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 500));
	return mockChats;
};

// Get a single chat by ID
export const getChatById = async (id: string): Promise<Chat> => {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 300));
	const chat = mockChats.find((chat) => chat.id === id);

	if (!chat) {
		throw new Error(`Chat with ID ${id} not found`);
	}

	return chat;
};

// Send a message
export const sendMessage = async (
	chatId: string,
	text: string
): Promise<Message> => {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 800));

	const newMessage: Message = {
		id: `msg_${Date.now()}`,
		text,
		createdAt: new Date().toISOString(),
		senderId: 'currentUser',
		status: 'sent',
	};

	// Find the chat and update it with the new message
	const chatIndex = mockChats.findIndex((chat) => chat.id === chatId);

	if (chatIndex !== -1) {
		// Add message to chat history
		mockChats[chatIndex].messages.push(newMessage);

		// Update last message fields
		mockChats[chatIndex].lastMessage = text;
		mockChats[chatIndex].lastMessageTime = newMessage.createdAt;
		mockChats[chatIndex].lastMessageStatus = 'sent';
	}

	// Simulate message status changes
	setTimeout(() => {
		newMessage.status = 'delivered';
		if (chatIndex !== -1) {
			mockChats[chatIndex].lastMessageStatus = 'delivered';
		}
	}, 1000);

	setTimeout(() => {
		newMessage.status = 'read';
		if (chatIndex !== -1) {
			mockChats[chatIndex].lastMessageStatus = 'read';
		}
	}, 2000);

	return newMessage;
};

// Mark all messages in a chat as read
export const markChatAsRead = async (chatId: string): Promise<void> => {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 200));

	const chatIndex = mockChats.findIndex((chat) => chat.id === chatId);

	if (chatIndex !== -1) {
		mockChats[chatIndex].unreadCount = 0;
	}
};
