import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import CodeVerification from '../components/CodeVerification';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useAuth } from '@/services/AuthContext';
import { Colors } from '@/constants/Colors';

export default function VerifyCodeScreen() {
	const { phoneNumber, verifyCode } = useAuth();

	const handleVerification = (code: string) => {
		verifyCode(code);
		router.replace('/(tabs)');
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
				<Ionicons name='arrow-back' size={24} color={Colors.text} />
			</TouchableOpacity>

			<Animated.View entering={FadeIn.duration(800)} style={styles.content}>
				<Text style={styles.title}>Verification Code</Text>
				<Text style={styles.description}>
					We've sent a verification code to{'\n'}
					{phoneNumber}
				</Text>

				<CodeVerification onComplete={handleVerification} />

				<TouchableOpacity style={styles.resendButton}>
					<Text style={styles.resendText}>Resend Code</Text>
				</TouchableOpacity>
			</Animated.View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.background,
		paddingTop: 60,
		paddingHorizontal: 20,
	},
	backButton: {
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 20,
	},
	content: {
		flex: 1,
		alignItems: 'center',
		paddingTop: 40,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 12,
		color: Colors.text,
	},
	description: {
		fontSize: 16,
		textAlign: 'center',
		marginBottom: 40,
		color: Colors.text,
		opacity: 0.6,
	},
	resendButton: {
		marginTop: 30,
		padding: 10,
	},
	resendText: {
		color: Colors.primary,
		fontSize: 16,
	},
});
