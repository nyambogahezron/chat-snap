import { Tabs } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

function TabIcon({ focused, icon }: any) {
	return (
		<View className='size-full justify-center items-center mt-4 rounded-full'>
			<Feather name={icon} size={22} color={focused ? '#AB8BFF' : '#9CA4AB'} />
		</View>
	);
}

export default function TabsLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarShowLabel: false,
				tabBarItemStyle: {
					...styles.tabBarItem,
				},
				tabBarStyle: { ...styles.tabBar },
			}}
		>
			<Tabs.Screen
				name='index'
				options={{
					headerShown: true,
					title: 'Chats',
					headerLargeTitle: true,
					headerRight: () => (
						<Ionicons
							name='create-outline'
							size={24}
							color={Colors.primary}
							style={{ marginRight: 10 }}
						/>
					),
					tabBarIcon: ({ focused }: { focused: boolean }) => (
						<TabIcon focused={focused} icon={'home'} title='Home' />
					),
				}}
			/>

			<Tabs.Screen
				name='groups'
				options={{
					headerShown: true,
					title: 'Groups',
					headerLargeTitle: true,
					headerRight: () => (
						<Ionicons
							name='create-outline'
							size={24}
							color={Colors.primary}
							style={{ marginRight: 10 }}
						/>
					),

					tabBarIcon: ({ focused }: { focused: boolean }) => (
						<TabIcon focused={focused} icon={'users'} title='Groups' />
					),
				}}
			/>

			<Tabs.Screen
				name='status'
				options={{
					title: 'Status',
					headerShown: false,
					tabBarIcon: ({ focused }: { focused: boolean }) => (
						<TabIcon focused={focused} icon={'compass'} title='Status' />
					),
				}}
			/>
		</Tabs>
	);
}

const styles = StyleSheet.create({
	tabBar: {
		backgroundColor: '#f3f3f3',
		height: 55,
		position: 'absolute',
		overflow: 'hidden',
		elevation: 0,
		shadowOpacity: 0,
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowRadius: 0,
		shadowColor: 'transparent',
	},
	tabBarItem: {
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
});
