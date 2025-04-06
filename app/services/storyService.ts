import { Story } from '../types';
import { mockStories } from './mockData';

// Keep a local copy of the stories
let stories = [...mockStories];

// Get all stories
export const getStories = async (): Promise<Story[]> => {
  // Sort stories by creation time, newest first
  // Also filter out expired stories (older than 24 hours)
  const now = new Date();
  
  return Promise.resolve(
    stories
      .filter(story => new Date(story.expiresAt) > now)
      .sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
  );
};

// Get stories for a specific user
export const getUserStories = async (userId: string): Promise<Story[]> => {
  const now = new Date();
  
  return Promise.resolve(
    stories
      .filter(story => story.userId === userId && new Date(story.expiresAt) > now)
      .sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
  );
};

// Mark a story as viewed
export const markStoryAsViewed = async (storyId: string): Promise<void> => {
  const storyIndex = stories.findIndex(story => story.id === storyId);
  
  if (storyIndex !== -1) {
    stories[storyIndex].viewed = true;
  }
  
  return Promise.resolve();
};

// Get stories grouped by user
export const getStoriesByUser = async (): Promise<{ [userId: string]: Story[] }> => {
  const now = new Date();
  const validStories = stories.filter(story => new Date(story.expiresAt) > now);
  
  const result: { [userId: string]: Story[] } = {};
  
  validStories.forEach(story => {
    if (!result[story.userId]) {
      result[story.userId] = [];
    }
    
    result[story.userId].push(story);
  });
  
  // Sort each user's stories by creation time
  Object.keys(result).forEach(userId => {
    result[userId].sort((a, b) => 
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  });
  
  return Promise.resolve(result);
};