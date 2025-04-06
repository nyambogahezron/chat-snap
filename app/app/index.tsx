import React, { useState } from 'react';
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform,
	TouchableWithoutFeedback,
	Keyboard,
} from 'react-native';
import { router } from 'expo-router';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { useAuth } from '@/services/AuthContext';
import { Colors } from '@/constants/Colors';

export default function LoginScreen() {
	const [phoneNumber, setPhoneNumber] = useState('');
	const { login } = useAuth();

	const handleLogin = () => {
		if (phoneNumber.length >= 10) {
			login(phoneNumber);
			router.push('/verify-code');
		}
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={styles.container}
		>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={styles.inner}>
					<Animated.View
						entering={FadeIn.duration(800).delay(200)}
						style={styles.logoContainer}
					>
						<Text style={styles.logo}>ChatApp</Text>
						<Text style={styles.subtitle}>Connect with friends</Text>
					</Animated.View>

					<Animated.View
						entering={FadeInDown.duration(800).delay(400)}
						style={styles.formContainer}
					>
						<Text style={styles.label}>Enter your phone number</Text>
						<TextInput
							style={styles.input}
							value={phoneNumber}
							onChangeText={setPhoneNumber}
							placeholder='Phone number'
							keyboardType='phone-pad'
							autoFocus
							autoComplete='tel'
							textContentType='telephoneNumber'
						/>
						<TouchableOpacity
							style={[
								styles.button,
								phoneNumber.length < 10 ? styles.buttonDisabled : {},
							]}
							onPress={handleLogin}
							disabled={phoneNumber.length < 10}
						>
							<Text style={styles.buttonText}>Continue</Text>
						</TouchableOpacity>

						<Text style={styles.terms}>
							By continuing, you agree to our{' '}
							<Text style={styles.link}>Terms of Service</Text> and{' '}
							<Text style={styles.link}>Privacy Policy</Text>
						</Text>
					</Animated.View>
				</View>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.background,
	},
	inner: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
	},
	logoContainer: {
		alignItems: 'center',
		marginBottom: 60,
	},
	logo: {
		fontSize: 36,
		fontWeight: 'bold',
		color: Colors.primary,
		marginBottom: 10,
	},
	subtitle: {
		fontSize: 16,
		color: Colors.text,
		opacity: 0.7,
	},
	formContainer: {
		width: '100%',
	},
	label: {
		fontSize: 16,
		marginBottom: 8,
		color: Colors.text,
	},
	input: {
		backgroundColor: Colors.grey,
		borderRadius: 8,
		padding: 16,
		fontSize: 16,
		marginBottom: 20,
		width: '100%',
	},
	button: {
		backgroundColor: Colors.primary,
		borderRadius: 8,
		padding: 16,
		alignItems: 'center',
		marginBottom: 20,
	},
	buttonDisabled: {
		backgroundColor: Colors.primary,
		opacity: 0.6,
	},
	buttonText: {
		color: 'white',
		fontSize: 16,
		fontWeight: '600',
	},
	terms: {
		textAlign: 'center',
		fontSize: 12,
		color: Colors.text,
		opacity: 0.7,
	},
	link: {
		color: Colors.primary,
	},
});
