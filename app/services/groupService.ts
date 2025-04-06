import { Group, Message } from '../types';
import { mockGroups } from './mockData';

// Keep a local copy of the groups
let groups = [...mockGroups];

// Get all groups
export const getGroups = async (): Promise<Group[]> => {
  return Promise.resolve(groups);
};

// Get a specific group by ID
export const getGroupById = async (id: string): Promise<Group> => {
  const group = groups.find(g => g.id === id);
  
  if (!group) {
    throw new Error(`Group with id ${id} not found`);
  }
  
  return Promise.resolve(group);
};

// Send a message to a group
export const sendGroupMessage = async (
  groupId: string,
  message: string
): Promise<Message> => {
  const group = groups.find(g => g.id === groupId);
  
  if (!group) {
    throw new Error(`Group with id ${groupId} not found`);
  }
  
  const newMessage: Message = {
    id: `msg_${groupId}_${Date.now()}`,
    text: message,
    createdAt: new Date().toISOString(),
    senderId: 'currentUser',
    status: 'sending',
  };
  
  // Add the message to the group
  group.messages.push(newMessage);
  
  // Update the last message
  group.lastMessage = `You: ${message}`;
  group.lastMessageTime = newMessage.createdAt;
  group.lastMessageStatus = 'sending';
  
  // Simulate message being sent
  setTimeout(() => {
    newMessage.status = 'sent';
    group.lastMessageStatus = 'sent';
    
    // Simulate message being delivered
    setTimeout(() => {
      newMessage.status = 'delivered';
      group.lastMessageStatus = 'delivered';
      
      // Simulate a reply after 5 seconds in 50% of cases
      if (Math.random() > 0.5) {
        setTimeout(() => {
          const randomMember = group.members[Math.floor(Math.random() * group.members.length)];
          const randomName = ['Alex', 'Jessica', 'Mark', 'Sam', 'Lisa'][Math.floor(Math.random() * 5)];
          
          const reply: Message = {
            id: `msg_${groupId}_${Date.now()}`,
            text: [
              'Thanks for the update!',
              'Got it, will check later.',
              'Nice! When is the next meeting?',
              'I\'ll be there soon.',
              'Can everyone see this message?'
            ][Math.floor(Math.random() * 5)],
            createdAt: new Date().toISOString(),
            senderId: randomMember,
          };
          
          group.messages.push(reply);
          group.lastMessage = `${randomName}: ${reply.text}`;
          group.lastMessageTime = reply.createdAt;
          group.unreadCount += 1;
        }, 5000);
      }
    }, 1000);
  }, 1000);
  
  return Promise.resolve(newMessage);
};

// Mark a group as read
export const markGroupAsRead = async (groupId: string): Promise<void> => {
  const group = groups.find(g => g.id === groupId);
  
  if (!group) {
    throw new Error(`Group with id ${groupId} not found`);
  }
  
  group.unreadCount = 0;
  
  // Mark all messages as read
  group.messages.forEach(message => {
    if (message.senderId !== 'currentUser') {
      message.status = 'read';
    }
  });
  
  return Promise.resolve();
};