// Message status options
export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read' | undefined;

// Media type for stories and messages
export type MediaType = 'image' | 'video';

// Media model
export interface Media {
  id: string;
  url: string;
  type: MediaType;
  thumbnailUrl?: string; // For videos
  duration?: number; // Duration in seconds for videos
}

// Message model
export interface Message {
  id: string;
  text: string;
  createdAt: string; // ISO 8601 date string
  senderId: string; // userId or 'currentUser' for the current user
  status?: MessageStatus; // Only for messages sent by current user
  media?: Media[]; // Optional media attachments
}

// Chat model
export interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  lastMessageTime: string; // ISO 8601 date string
  lastMessageStatus: MessageStatus;
  unreadCount: number;
  isOnline: boolean;
  typing: boolean;
  avatar: string; // Just use IDs for our mock data
  messages: Message[];
  isGroup?: boolean;
}

// Group model
export interface Group {
  id: string;
  name: string;
  description?: string;
  lastMessage: string;
  lastMessageTime: string;
  lastMessageStatus: MessageStatus;
  unreadCount: number;
  avatar: string;
  members: string[]; // Array of member IDs
  messages: Message[];
  memberCount: number;
}

// Story model
export interface Story {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  createdAt: string;
  expiresAt: string; // 24 hours after creation
  viewed: boolean;
  media: Media;
}
