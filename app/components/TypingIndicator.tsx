import { Colors } from '@/constants/Colors';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withSequence,
	withTiming,
	withDelay,
	Easing,
} from 'react-native-reanimated';

export default function TypingIndicator() {
	// Create animated values for each dot
	const dot1Opacity = useSharedValue(0.3);
	const dot2Opacity = useSharedValue(0.3);
	const dot3Opacity = useSharedValue(0.3);

	// Start animations on component mount
	React.useEffect(() => {
		// Dot 1 animation
		dot1Opacity.value = withRepeat(
			withSequence(
				withTiming(1, { duration: 300, easing: Easing.ease }),
				withTiming(0.3, { duration: 300, easing: Easing.ease })
			),
			-1, // Infinite repeat
			true // Reverse
		);

		// Dot 2 animation (with delay)
		dot2Opacity.value = withDelay(
			150,
			withRepeat(
				withSequence(
					withTiming(1, { duration: 300, easing: Easing.ease }),
					withTiming(0.3, { duration: 300, easing: Easing.ease })
				),
				-1,
				true
			)
		);

		// Dot 3 animation (with more delay)
		dot3Opacity.value = withDelay(
			300,
			withRepeat(
				withSequence(
					withTiming(1, { duration: 300, easing: Easing.ease }),
					withTiming(0.3, { duration: 300, easing: Easing.ease })
				),
				-1,
				true
			)
		);
	}, []);

	// Create animated styles
	const dot1Style = useAnimatedStyle(() => {
		return {
			opacity: dot1Opacity.value,
		};
	});

	const dot2Style = useAnimatedStyle(() => {
		return {
			opacity: dot2Opacity.value,
		};
	});

	const dot3Style = useAnimatedStyle(() => {
		return {
			opacity: dot3Opacity.value,
		};
	});

	return (
		<View style={styles.container}>
			<Animated.View style={[styles.dot, dot1Style]} />
			<Animated.View style={[styles.dot, dot2Style]} />
			<Animated.View style={[styles.dot, dot3Style]} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		backgroundColor: Colors.grey,
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderRadius: 16,
		alignItems: 'center',
		alignSelf: 'flex-start',
		marginVertical: 4,
	},
	dot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: Colors.text,
		marginHorizontal: 2,
	},
});
