import React, { useState, useRef } from 'react';
import {
	View,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	Keyboard,
	Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withSpring,
	withTiming,
	Easing,
} from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';

interface ChatInputProps {
	onSend: (message: string) => void;
}

export default function ChatInput({ onSend }: ChatInputProps) {
	const [message, setMessage] = useState('');
	const inputRef = useRef<TextInput>(null);
	const scale = useSharedValue(1);
	const rotation = useSharedValue(0);

	const handleSend = () => {
		if (message.trim().length === 0) return;

		// Animation for send button
		scale.value = withSpring(1.2, { damping: 4 }, () => {
			scale.value = withTiming(1, { duration: 150, easing: Easing.ease });
		});

		rotation.value = withTiming(rotation.value + 360, {
			duration: 300,
			easing: Easing.ease,
		});

		onSend(message);
		setMessage('');
		Keyboard.dismiss();
	};

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ scale: scale.value }, { rotate: `${rotation.value}deg` }],
		};
	});

	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.button}>
				<Ionicons name='add-circle-outline' size={24} color={Colors.primary} />
			</TouchableOpacity>

			<View style={styles.inputContainer}>
				<TextInput
					ref={inputRef}
					style={styles.input}
					value={message}
					onChangeText={setMessage}
					placeholder='Message...'
					returnKeyType='send'
					onSubmitEditing={handleSend}
					multiline
					maxLength={1000}
				/>
			</View>

			{message.trim().length > 0 ? (
				<Animated.View style={animatedStyle}>
					<TouchableOpacity style={styles.sendButton} onPress={handleSend}>
						<Ionicons name='send' size={20} color='#fff' />
					</TouchableOpacity>
				</Animated.View>
			) : (
				<>
					<TouchableOpacity style={styles.button}>
						<Ionicons name='camera-outline' size={24} color={Colors.primary} />
					</TouchableOpacity>
					<TouchableOpacity style={styles.button}>
						<Ionicons name='mic-outline' size={24} color={Colors.primary} />
					</TouchableOpacity>
				</>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 10,
		paddingVertical: 8,
		backgroundColor: Colors.background,
		borderTopWidth: 1,
		borderTopColor: Colors.grey,
		marginBottom: 60,
	},
	button: {
		width: 36,
		height: 36,
		justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: 4,
	},
	inputContainer: {
		flex: 1,
		backgroundColor: Colors.grey,
		borderRadius: 20,
		paddingHorizontal: 12,
		marginHorizontal: 8,
		maxHeight: 100,
	},
	input: {
		fontSize: 16,
		paddingVertical: Platform.OS === 'ios' ? 10 : 6,
		maxHeight: 100,
	},
	sendButton: {
		width: 36,
		height: 36,
		borderRadius: 18,
		backgroundColor: Colors.primary,
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 4,
	},
});
