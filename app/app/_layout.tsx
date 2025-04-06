import { Colors } from '@/constants/Colors';
import { AuthProvider } from '@/services/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import 'react-native-reanimated';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<AuthProvider>
			<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
				<Stack
					screenOptions={{
						headerStyle: {
							backgroundColor: Colors.background,
						},
						headerShadowVisible: false,
						headerTintColor: Colors.primary,
						headerTitleStyle: {
							fontWeight: 'bold',
						},
						animation: 'slide_from_right',
						animationDuration: 300,
					}}
				>
					<Stack.Screen
						name='(tabs)'
						options={{
							headerShown: false,
							headerTitle: '',
							animation: 'fade',
						}}
					/>
					<Stack.Screen
						name='chat/[id]'
						options={{
							title: '',
							headerBackTitle: 'Back',
							headerTintColor: Colors.primary,
							headerRight: () => (
								<Ionicons
									name='call-outline'
									size={24}
									color={Colors.primary}
									style={{ marginRight: 10 }}
								/>
							),
						}}
					/>
					<Stack.Screen
						name='index'
						options={{
							headerShown: false,
							animation: 'fade',
						}}
					/>
					<Stack.Screen
						name='verify-code'
						options={{
							headerShown: false,
							headerTitle: '',
							animation: 'fade',
						}}
					/>
					<Stack.Screen name='+not-found' />
				</Stack>
			</ThemeProvider>
		</AuthProvider>
	);
}
