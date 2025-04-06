import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
} from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';

interface StoryCircleProps {
	avatar: string;
	name: string;
	hasUnseenStories: boolean;
	onPress: () => void;
	size?: 'small' | 'medium' | 'large';
}

export default function StoryCircle({
	avatar,
	name,
	hasUnseenStories,
	onPress,
	size = 'medium',
}: StoryCircleProps) {
	// Animation values
	const scale = useSharedValue(1);

	// Determine sizes based on the size prop
	const circleSize = size === 'small' ? 60 : size === 'medium' ? 70 : 80;
	const avatarSize = circleSize - 6;
	const borderWidth = hasUnseenStories ? 2 : 0;

	// Animated styles
	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ scale: scale.value }],
		};
	});

	// Handle press animation
	const handlePressIn = () => {
		scale.value = withTiming(0.95, { duration: 100 });
	};

	const handlePressOut = () => {
		scale.value = withTiming(1, { duration: 100 });
	};

	return (
		<TouchableOpacity
			onPress={onPress}
			onPressIn={handlePressIn}
			onPressOut={handlePressOut}
			style={styles.container}
		>
			<Animated.View style={[animatedStyle, styles.circleContainer]}>
				<View
					style={[
						styles.circle,
						{
							width: circleSize,
							height: circleSize,
							borderWidth,
							borderColor: hasUnseenStories ? Colors.primary : 'transparent',
						},
					]}
				>
					<Image
						source={{
							uri: `https://randomuser.me/api/portraits/${
								parseInt(avatar) % 2 === 0 ? 'men' : 'women'
							}/${parseInt(avatar) || 1}.jpg`,
						}}
						style={{
							width: avatarSize,
							height: avatarSize,
							borderRadius: avatarSize / 2,
						}}
						resizeMode='cover'
					/>
				</View>
				<Text style={styles.name} numberOfLines={1}>
					{name}
				</Text>
			</Animated.View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 8,
		alignItems: 'center',
	},
	circleContainer: {
		alignItems: 'center',
	},
	circle: {
		borderRadius: 100,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 2,
		backgroundColor: Colors.background,
	},
	name: {
		fontSize: 12,
		marginTop: 4,
		textAlign: 'center',
		maxWidth: 70,
	},
});
