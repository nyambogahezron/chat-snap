import React, { useState, useEffect, useRef } from 'react';
import {
	View,
	Image,
	Text,
	StyleSheet,
	TouchableOpacity,
	Dimensions,
	ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	runOnJS,
} from 'react-native-reanimated';
import { Story } from '../types';
import { Colors } from '@/constants/Colors';
import { markStoryAsViewed } from '../services/storyService';

interface StoryViewerProps {
	story: Story;
	onNext: () => void;
	onPrevious: () => void;
	onClose: () => void;
}

const { width, height } = Dimensions.get('window');

export default function StoryViewer({
	story,
	onNext,
	onPrevious,
	onClose,
}: StoryViewerProps) {
	const [loading, setLoading] = useState(true);
	const progress = useSharedValue(0);
	const storyDuration =
		story.media.type === 'video' ? story.media.duration || 15 : 5;
	const storyTimeout = useRef<NodeJS.Timeout | null>(null);

	// Mark the story as viewed and start the progress bar
	useEffect(() => {
		setLoading(true);

		// Mark story as viewed
		markStoryAsViewed(story.id);

		// Start progress bar
		progress.value = 0;
		progress.value = withTiming(
			1,
			{ duration: storyDuration * 1000 },
			(finished) => {
				if (finished) {
					runOnJS(onNext)();
				}
			}
		);

		// Set timeout for auto-advancing
		storyTimeout.current = setTimeout(onNext, storyDuration * 1000);

		return () => {
			if (storyTimeout.current) {
				clearTimeout(storyTimeout.current);
			}
		};
	}, [story.id]);

	const handleImageLoad = () => {
		setLoading(false);
	};

	// Animated progress bar style
	const progressStyle = useAnimatedStyle(() => {
		return {
			width: `${progress.value * 100}%`,
		};
	});

	return (
		<View style={styles.container}>
			{/* Header */}
			<View style={styles.header}>
				<View style={styles.userInfo}>
					<Image
						source={{
							uri: `https://randomuser.me/api/portraits/${
								parseInt(story.userAvatar) % 2 === 0 ? 'men' : 'women'
							}/${parseInt(story.userAvatar) || 1}.jpg`,
						}}
						style={styles.avatar}
					/>
					<Text style={styles.username}>{story.userName}</Text>
					<Text style={styles.timestamp}>
						{new Date(story.createdAt).toLocaleTimeString([], {
							hour: '2-digit',
							minute: '2-digit',
						})}
					</Text>
				</View>
				<TouchableOpacity onPress={onClose}>
					<Ionicons name='close' size={28} color='#fff' />
				</TouchableOpacity>
			</View>

			{/* Progress Bar */}
			<View style={styles.progressContainer}>
				<Animated.View style={[styles.progressBar, progressStyle]} />
			</View>

			{/* Story Content */}
			<View style={styles.content}>
				{loading && (
					<View style={styles.loadingContainer}>
						<ActivityIndicator size='large' color={Colors.primary} />
					</View>
				)}

				{story.media.type === 'image' ? (
					<Image
						source={{ uri: story.media.url }}
						style={styles.media}
						onLoad={handleImageLoad}
						resizeMode='contain'
					/>
				) : (
					<View style={styles.videoContainer}>
						<Text style={styles.videoPlaceholder}>
							[Video Playback Placeholder]
						</Text>
						<Text style={styles.videoInfo}>
							{story.media.duration} seconds video
						</Text>
					</View>
				)}
			</View>

			{/* Touch Controls */}
			<View style={styles.touchControls}>
				<TouchableOpacity style={styles.previousTouch} onPress={onPrevious} />
				<TouchableOpacity style={styles.nextTouch} onPress={onNext} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000',
	},
	header: {
		position: 'absolute',
		top: 40,
		left: 0,
		right: 0,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 16,
		zIndex: 10,
	},
	userInfo: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	avatar: {
		width: 40,
		height: 40,
		borderRadius: 20,
		marginRight: 8,
		borderWidth: 2,
		borderColor: '#fff',
	},
	username: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 16,
	},
	timestamp: {
		color: '#ddd',
		fontSize: 12,
		marginLeft: 8,
	},
	progressContainer: {
		position: 'absolute',
		top: 20,
		left: 0,
		right: 0,
		height: 3,
		backgroundColor: 'rgba(255, 255, 255, 0.3)',
		zIndex: 10,
	},
	progressBar: {
		height: '100%',
		backgroundColor: '#fff',
	},
	content: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	loadingContainer: {
		...StyleSheet.absoluteFillObject,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	media: {
		width,
		height: height * 0.8,
	},
	videoContainer: {
		width,
		height: height * 0.8,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#222',
	},
	videoPlaceholder: {
		color: '#fff',
		fontSize: 18,
		marginBottom: 10,
	},
	videoInfo: {
		color: '#aaa',
		fontSize: 14,
	},
	touchControls: {
		...StyleSheet.absoluteFillObject,
		flexDirection: 'row',
	},
	previousTouch: {
		width: '30%',
		height: '100%',
	},
	nextTouch: {
		width: '70%',
		height: '100%',
	},
});
