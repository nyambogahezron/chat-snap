import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Modal } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import StoryCircle from './StoryCircle';
import StoryViewer from './StoryViewer';
import { Story } from '../types';
import { getStories, getStoriesByUser } from '../services/storyService';

export default function StoriesRow() {
	const [stories, setStories] = useState<Story[]>([]);
	const [storiesByUser, setStoriesByUser] = useState<{
		[userId: string]: Story[];
	}>({});
	const [userIds, setUserIds] = useState<string[]>([]);

	const [currentUserIndex, setCurrentUserIndex] = useState<number>(-1);
	const [currentStoryIndex, setCurrentStoryIndex] = useState<number>(0);
	const [modalVisible, setModalVisible] = useState(false);

	// Fetch stories
	useEffect(() => {
		const fetchStories = async () => {
			try {
				const fetchedStories = await getStories();
				const storiesByUserObj = await getStoriesByUser();

				setStories(fetchedStories);
				setStoriesByUser(storiesByUserObj);
				setUserIds(Object.keys(storiesByUserObj));
			} catch (error) {
				console.error('Error fetching stories:', error);
			}
		};

		fetchStories();
	}, []);

	// Handle opening a user's story
	const openUserStory = (userId: string) => {
		const userIndex = userIds.findIndex((id) => id === userId);

		if (userIndex !== -1) {
			setCurrentUserIndex(userIndex);
			setCurrentStoryIndex(0);
			setModalVisible(true);
		}
	};

	// Handle navigation between stories
	const goToNextStory = () => {
		if (!userIds.length) return;

		const currentUserStories = storiesByUser[userIds[currentUserIndex]];

		if (currentStoryIndex < currentUserStories.length - 1) {
			// Go to next story of the same user
			setCurrentStoryIndex(currentStoryIndex + 1);
		} else if (currentUserIndex < userIds.length - 1) {
			// Go to first story of the next user
			setCurrentUserIndex(currentUserIndex + 1);
			setCurrentStoryIndex(0);
		} else {
			// End of all stories
			setModalVisible(false);
		}
	};

	const goToPreviousStory = () => {
		if (!userIds.length) return;

		if (currentStoryIndex > 0) {
			// Go to previous story of the same user
			setCurrentStoryIndex(currentStoryIndex - 1);
		} else if (currentUserIndex > 0) {
			// Go to last story of the previous user
			const previousUserStories = storiesByUser[userIds[currentUserIndex - 1]];
			setCurrentUserIndex(currentUserIndex - 1);
			setCurrentStoryIndex(previousUserStories.length - 1);
		} else {
			// At the beginning, do nothing or close
			// setModalVisible(false);
		}
	};

	// Close the modal
	const closeStoryViewer = () => {
		setModalVisible(false);
	};

	// Get the current story being viewed
	const getCurrentStory = (): Story | null => {
		if (
			currentUserIndex >= 0 &&
			currentUserIndex < userIds.length &&
			userIds[currentUserIndex] &&
			storiesByUser[userIds[currentUserIndex]] &&
			currentStoryIndex >= 0 &&
			currentStoryIndex < storiesByUser[userIds[currentUserIndex]].length
		) {
			return storiesByUser[userIds[currentUserIndex]][currentStoryIndex];
		}

		return null;
	};

	// Get a representative story for a user (for the circle display)
	const getRepresentativeStory = (userId: string): Story | null => {
		const userStories = storiesByUser[userId];
		if (userStories && userStories.length > 0) {
			// Return the first unviewed story, or the first story if all are viewed
			const unviewedStory = userStories.find((story) => !story.viewed);
			return unviewedStory || userStories[0];
		}
		return null;
	};

	// Check if a user has any unviewed stories
	const hasUnviewedStories = (userId: string): boolean => {
		const userStories = storiesByUser[userId];
		if (userStories && userStories.length > 0) {
			return userStories.some((story) => !story.viewed);
		}
		return false;
	};

	// Add "Your Story" item at the beginning
	const renderItem = ({ item, index }: { item: string; index: number }) => {
		const story = getRepresentativeStory(item);

		if (!story) return null;

		return (
			<Animated.View entering={FadeInRight.delay(index * 100).duration(300)}>
				<StoryCircle
					avatar={story.userAvatar}
					name={index === 0 ? 'Your Story' : story.userName}
					hasUnseenStories={hasUnviewedStories(item)}
					onPress={() => openUserStory(item)}
				/>
			</Animated.View>
		);
	};

	if (userIds.length === 0) {
		return null;
	}

	return (
		<View style={styles.container}>
			<FlatList
				data={['currentUser', ...userIds.filter((id) => id !== 'currentUser')]}
				keyExtractor={(item) => item}
				renderItem={renderItem}
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.storiesList}
			/>

			{/* Story Viewer Modal */}
			<Modal visible={modalVisible} transparent={false} animationType='fade'>
				<View style={styles.modalContainer}>
					{getCurrentStory() && (
						<StoryViewer
							story={getCurrentStory()!}
							onNext={goToNextStory}
							onPrevious={goToPreviousStory}
							onClose={closeStoryViewer}
						/>
					)}
				</View>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: '#f0f0f0',
	},
	storiesList: {
		paddingHorizontal: 8,
	},
	modalContainer: {
		flex: 1,
		backgroundColor: '#000',
	},
});
