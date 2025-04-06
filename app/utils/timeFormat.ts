// Format time from ISO string to display format
export const formatTime = (isoString: string): string => {
  const date = new Date(isoString);
  const now = new Date();
  
  // Check if date is today
  if (date.toDateString() === now.toDateString()) {
    // Format as time only (e.g., "2:30 PM")
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  }
  
  // Check if date is yesterday
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  }
  
  // Check if date is within last 7 days
  const oneWeekAgo = new Date(now);
  oneWeekAgo.setDate(now.getDate() - 7);
  if (date > oneWeekAgo) {
    // Return day name (e.g., "Monday")
    return date.toLocaleDateString([], { weekday: 'short' });
  }
  
  // Otherwise, return date (e.g., "10/21")
  return date.toLocaleDateString([], { month: 'numeric', day: 'numeric' });
};
