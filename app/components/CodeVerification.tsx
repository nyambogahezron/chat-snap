import React, { useState, useRef, useEffect } from 'react';
import {
	View,
	TextInput,
	StyleSheet,
	Text,
	TouchableOpacity,
	Keyboard,
} from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withTiming,
	withSequence,
	withDelay,
	FadeIn,
} from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';

interface CodeVerificationProps {
	onComplete: (code: string) => void;
	length?: number;
}

export default function CodeVerification({
	onComplete,
	length = 6,
}: CodeVerificationProps) {
	const [code, setCode] = useState<string[]>(Array(length).fill(''));
	const inputRefs = useRef<TextInput[]>([]);
	const shake = useSharedValue(0);

	const handleChange = (text: string, index: number) => {
		if (text.length > 1) {
			// If user pastes a code
			const pastedCode = text.slice(0, length).split('');
			setCode((prevCode) => {
				const newCode = [...prevCode];
				for (let i = 0; i < pastedCode.length && i + index < length; i++) {
					newCode[i + index] = pastedCode[i];
				}
				return newCode;
			});

			// Focus on last input or submit if complete
			const focusIndex = Math.min(index + pastedCode.length, length - 1);
			if (focusIndex === length - 1 && pastedCode.length + index >= length) {
				inputRefs.current[focusIndex].blur();
				submitCode(
					[...code.slice(0, index), ...pastedCode].join('').slice(0, length)
				);
			} else {
				inputRefs.current[focusIndex].focus();
			}
		} else {
			// Normal single character input
			const newCode = [...code];
			newCode[index] = text;
			setCode(newCode);

			// Auto-advance to next input
			if (text && index < length - 1) {
				inputRefs.current[index + 1].focus();
			}

			// Check if code is complete
			if (index === length - 1 && text) {
				Keyboard.dismiss();
				const fullCode = newCode.join('');
				submitCode(fullCode);
			}
		}
	};

	const handleKeyPress = (e: any, index: number) => {
		// Handle backspace to move to previous input
		if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
			inputRefs.current[index - 1].focus();
		}
	};

	const submitCode = (fullCode: string) => {
		// For demo, we'll simulate a valid code as "123456"
		if (fullCode === '123456') {
			onComplete(fullCode);
		} else {
			// Shake animation for wrong code
			shake.value = withSequence(
				withTiming(-10, { duration: 50 }),
				withRepeat(withTiming(10, { duration: 100 }), 3, true),
				withTiming(0, { duration: 50 })
			);

			// Clear the code after wrong attempt
			setTimeout(() => {
				setCode(Array(length).fill(''));
				inputRefs.current[0].focus();
			}, 800);
		}
	};

	// Animated style for shake effect
	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: shake.value }],
		};
	});

	// Focus first input on mount
	useEffect(() => {
		setTimeout(() => {
			if (inputRefs.current[0]) {
				inputRefs.current[0].focus();
			}
		}, 500);
	}, []);

	return (
		<Animated.View
			style={[styles.container, animatedStyle]}
			entering={FadeIn.duration(500)}
		>
			{code.map((digit, index) => (
				<View key={index} style={styles.inputWrapper}>
					<TextInput
						ref={(ref) => {
							if (ref) inputRefs.current[index] = ref;
						}}
						style={[styles.input, digit ? styles.inputFilled : {}]}
						keyboardType='number-pad'
						maxLength={length}
						value={digit}
						onChangeText={(text) => handleChange(text, index)}
						onKeyPress={(e) => handleKeyPress(e, index)}
						caretHidden
						selectTextOnFocus
					/>
				</View>
			))}

			<TouchableOpacity
				style={[
					styles.verifyButton,
					code.every((d) => d) ? styles.verifyButtonActive : {},
				]}
				onPress={() => submitCode(code.join(''))}
				disabled={!code.every((d) => d)}
			>
				<Text style={styles.verifyButtonText}>Verify</Text>
			</TouchableOpacity>

			<Text style={styles.hint}>Hint: Enter "123456" to proceed</Text>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
		paddingHorizontal: 20,
		flexWrap: 'wrap',
	},
	inputWrapper: {
		marginBottom: 20,
	},
	input: {
		width: 50,
		height: 60,
		borderWidth: 1,
		borderColor: Colors.grey,
		borderRadius: 8,
		fontSize: 24,
		textAlign: 'center',
		color: Colors.text,
		backgroundColor: Colors.grey,
	},
	inputFilled: {
		borderColor: Colors.primary,
		backgroundColor: 'rgba(0, 132, 255, 0.1)',
	},
	verifyButton: {
		backgroundColor: Colors.primary,
		borderRadius: 8,
		paddingVertical: 15,
		alignItems: 'center',
		marginTop: 20,
		opacity: 0.6,
		width: '100%',
	},
	verifyButtonActive: {
		opacity: 1,
	},
	verifyButtonText: {
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold',
	},
	hint: {
		marginTop: 16,
		textAlign: 'center',
		color: '#8E8E93',
		width: '100%',
	},
});
