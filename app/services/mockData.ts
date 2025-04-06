import { Chat, Message, Group, Story, Media } from '../types';

// Helper functions to generate random data
const generateRandomMessages = (chatId: string, count: number = 10): Message[] => {
  const messages: Message[] = [];
  const now = new Date();
  const senders = ['currentUser', chatId];
  
  for (let i = 0; i < count; i++) {
    const minutesAgo = (count - i) * 3;
    const messageDate = new Date(now.getTime() - minutesAgo * 60000);
    
    const senderId = senders[i % 2];
    
    // Add media to some messages
    const hasMedia = i % 5 === 0;
    const mediaType = i % 6 === 0 ? 'video' as const : 'image' as const;
    const media = hasMedia ? [{
      id: `media_${chatId}_${i}`,
      url: `https://picsum.photos/500/300?random=${i}`,
      type: mediaType,
      thumbnailUrl: mediaType === 'video' ? `https://picsum.photos/200/120?random=${i}` : undefined,
      duration: mediaType === 'video' ? Math.floor(Math.random() * 60) + 10 : undefined
    }] : undefined;
    
    messages.push({
      id: `msg_${chatId}_${i}`,
      text: hasMedia 
        ? (i % 6 === 0 ? 'Check out this video!' : 'Here\'s a photo I wanted to share.')
        : `This is message ${i + 1} in conversation with chat ID ${chatId}. ${
          i % 3 === 0 ? 'How are you doing today?' : 
          i % 3 === 1 ? 'Let me know when you are free to meet.' : 
          'I was thinking about that project we discussed.'
        }`,
      createdAt: messageDate.toISOString(),
      senderId,
      status: senderId === 'currentUser' ? 'read' : undefined,
      media
    });
  }
  
  return messages;
};

// Individual chats
export const mockChats: Chat[] = [
  {
    id: '1',
    name: 'Emily Johnson',
    lastMessage: 'Are we still meeting tomorrow?',
    lastMessageTime: new Date(Date.now() - 5 * 60000).toISOString(), // 5 minutes ago
    lastMessageStatus: 'read',
    unreadCount: 0,
    isOnline: true,
    typing: false,
    avatar: '1',
    messages: generateRandomMessages('1', 15),
  },
  {
    id: '2',
    name: 'Michael Smith',
    lastMessage: 'I sent you the files you asked for',
    lastMessageTime: new Date(Date.now() - 25 * 60000).toISOString(), // 25 minutes ago
    lastMessageStatus: 'delivered',
    unreadCount: 2,
    isOnline: false,
    typing: false,
    avatar: '2',
    messages: generateRandomMessages('2', 8),
  },
  {
    id: '3',
    name: 'Sarah Williams',
    lastMessage: 'Thanks for your help! 🙌',
    lastMessageTime: new Date(Date.now() - 60 * 60000).toISOString(), // 1 hour ago
    lastMessageStatus: 'sent',
    unreadCount: 0,
    isOnline: true,
    typing: true,
    avatar: '3',
    messages: generateRandomMessages('3', 12),
  },
  {
    id: '4',
    name: 'David Brown',
    lastMessage: 'Let\'s catch up soon',
    lastMessageTime: new Date(Date.now() - 2 * 60 * 60000).toISOString(), // 2 hours ago
    lastMessageStatus: 'read',
    unreadCount: 0,
    isOnline: false,
    typing: false,
    avatar: '4',
    messages: generateRandomMessages('4', 10),
  },
  {
    id: '5',
    name: 'Jennifer Davis',
    lastMessage: 'Did you see the news today?',
    lastMessageTime: new Date(Date.now() - 5 * 60 * 60000).toISOString(), // 5 hours ago
    lastMessageStatus: 'read',
    unreadCount: 0,
    isOnline: true,
    typing: false,
    avatar: '5',
    messages: generateRandomMessages('5', 20),
  },
  {
    id: '8',
    name: 'James Anderson',
    lastMessage: 'Check out this link I found',
    lastMessageTime: new Date(Date.now() - 1 * 24 * 60 * 60000).toISOString(), // 1 day ago
    lastMessageStatus: 'read',
    unreadCount: 0,
    isOnline: true,
    typing: false,
    avatar: '8',
    messages: generateRandomMessages('8', 11),
  },
  {
    id: '9',
    name: 'Olivia Wilson',
    lastMessage: 'Happy birthday! 🎉🎂',
    lastMessageTime: new Date(Date.now() - 2 * 24 * 60 * 60000).toISOString(), // 2 days ago
    lastMessageStatus: 'read',
    unreadCount: 0,
    isOnline: false,
    typing: false,
    avatar: '9',
    messages: generateRandomMessages('9', 9),
  },
  {
    id: '10',
    name: 'Robert Taylor',
    lastMessage: 'Are you coming to the event?',
    lastMessageTime: new Date(Date.now() - 3 * 24 * 60 * 60000).toISOString(), // 3 days ago
    lastMessageStatus: 'read',
    unreadCount: 0,
    isOnline: false,
    typing: false,
    avatar: '10',
    messages: generateRandomMessages('10', 7),
  },
];

// Group conversations
export const mockGroups: Group[] = [
  {
    id: 'g1',
    name: 'Work Team',
    description: 'Project discussions and updates',
    lastMessage: 'Alex: We need to finish the project by Friday',
    lastMessageTime: new Date(Date.now() - 8 * 60000).toISOString(), // 8 minutes ago
    lastMessageStatus: 'delivered',
    unreadCount: 5,
    avatar: 'group1',
    members: ['1', '2', '3', '4', '5'],
    messages: generateRandomMessages('g1', 18),
    memberCount: 8
  },
  {
    id: 'g2',
    name: 'Family Group',
    description: 'Family chat for events and updates',
    lastMessage: 'Mom: Who\'s bringing dessert to dinner?',
    lastMessageTime: new Date(Date.now() - 10 * 60000).toISOString(), // 10 minutes ago
    lastMessageStatus: 'delivered',
    unreadCount: 3,
    avatar: 'group2',
    members: ['3', '6', '7', '8'],
    messages: generateRandomMessages('g2', 14),
    memberCount: 6
  },
  {
    id: 'g3',
    name: 'Hiking Club',
    description: 'Weekend hiking trip planning',
    lastMessage: 'Jessica: The weather looks perfect for Saturday!',
    lastMessageTime: new Date(Date.now() - 30 * 60000).toISOString(), // 30 minutes ago
    lastMessageStatus: 'delivered',
    unreadCount: 12,
    avatar: 'group3',
    members: ['2', '5', '8', '9'],
    messages: generateRandomMessages('g3', 22),
    memberCount: 15
  },
  {
    id: 'g4',
    name: 'Book Club',
    description: 'Monthly book discussions',
    lastMessage: 'Mark: What did everyone think of the ending?',
    lastMessageTime: new Date(Date.now() - 2 * 60 * 60000).toISOString(), // 2 hours ago
    lastMessageStatus: 'read',
    unreadCount: 0,
    avatar: 'group4',
    members: ['1', '4', '7', '10'],
    messages: generateRandomMessages('g4', 16),
    memberCount: 10
  },
  {
    id: 'g5',
    name: 'Tech Enthusiasts',
    description: 'Discussing latest tech news and gadgets',
    lastMessage: 'Sam: Did you see the new smartphone announcement?',
    lastMessageTime: new Date(Date.now() - 4 * 60 * 60000).toISOString(), // 4 hours ago
    lastMessageStatus: 'delivered',
    unreadCount: 7,
    avatar: 'group5',
    members: ['2', '3', '8', '10'],
    messages: generateRandomMessages('g5', 25),
    memberCount: 28
  }
];

// Generate random stories
const generateRandomStories = (): Story[] => {
  const stories: Story[] = [];
  const now = new Date();
  
  // User stories
  const userIds = ['1', '2', '3', '4', '5', '8', '9'];
  const userNames = ['Emily J.', 'Michael S.', 'Sarah W.', 'David B.', 'Jennifer D.', 'James A.', 'Olivia W.'];
  
  userIds.forEach((userId, index) => {
    // Each user has 1-3 stories
    const storyCount = Math.floor(Math.random() * 3) + 1;
    
    for (let i = 0; i < storyCount; i++) {
      const hoursAgo = Math.floor(Math.random() * 20);
      const createdAt = new Date(now.getTime() - hoursAgo * 60 * 60000);
      const expiresAt = new Date(createdAt.getTime() + 24 * 60 * 60000);
      
      // Determine media type (more images than videos)
      const isVideo = Math.random() < 0.3;
      const mediaType = isVideo ? 'video' as const : 'image' as const;
      
      const media: Media = {
        id: `story_media_${userId}_${i}`,
        url: `https://picsum.photos/400/800?random=${userId}${i}`,
        type: mediaType,
        thumbnailUrl: isVideo ? `https://picsum.photos/200/400?random=${userId}${i}` : undefined,
        duration: isVideo ? Math.floor(Math.random() * 15) + 5 : undefined
      };
      
      stories.push({
        id: `story_${userId}_${i}`,
        userId,
        userName: userNames[index],
        userAvatar: userId,
        createdAt: createdAt.toISOString(),
        expiresAt: expiresAt.toISOString(),
        viewed: Math.random() < 0.5,
        media
      });
    }
  });
  
  return stories;
};

export const mockStories = generateRandomStories();
