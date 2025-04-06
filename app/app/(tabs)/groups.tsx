import React, { useEffect, useState, useRef } from 'react';
import {
	View,
	StyleSheet,
	FlatList,
	TextInput,
	TouchableOpacity,
	StatusBar,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import GroupListItem from '@/components/GroupListItem';
import StoriesRow from '@/components/StoriesRow';
import { getGroups } from '@/services/groupService';
import { Group } from '@/types';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';

export default function Groups() {
	const [groups, setGroups] = useState<Group[]>([]);
	const [searchQuery, setSearchQuery] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			const groupData = await getGroups();
			setGroups(groupData);
		};

		fetchData();
	}, []);

	const filteredGroups = groups.filter((group) =>
		group.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const handleGroupPress = (id: string) => {
		router.push(`/chat/${id}`);
	};

	return (
		<SafeAreaView style={styles.container} edges={['bottom']}>
			<StatusBar barStyle='dark-content' />

			<View style={styles.searchContainer}>
				<View style={styles.searchBar}>
					<Ionicons
						name='search'
						size={20}
						color={Colors.text}
						style={styles.searchIcon}
					/>
					<TextInput
						style={styles.searchInput}
						placeholder='Search'
						value={searchQuery}
						onChangeText={setSearchQuery}
					/>
				</View>
			</View>

			{/* Stories Row */}
			<StoriesRow />

			<FlatList
				data={filteredGroups}
				keyExtractor={(item) => item.id}
				renderItem={({ item, index }) => (
					<Animated.View
						entering={FadeInRight.delay(index * 100).duration(300)}
					>
						<GroupListItem
							group={item}
							onPress={() => handleGroupPress(item.id)}
						/>
					</Animated.View>
				)}
				contentContainerStyle={styles.chatList}
			/>

			<TouchableOpacity style={styles.fab}>
				<Ionicons name='people' size={24} color='#fff' />
			</TouchableOpacity>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.background,
	},
	searchContainer: {
		paddingHorizontal: 16,
		paddingVertical: 8,
	},
	searchBar: {
		flexDirection: 'row',
		backgroundColor: Colors.grey,
		borderRadius: 10,
		alignItems: 'center',
		paddingHorizontal: 10,
	},
	searchIcon: {
		marginRight: 8,
	},
	searchInput: {
		flex: 1,
		height: 40,
		fontSize: 16,
	},

	chatList: {
		paddingBottom: 16,
	},
	fab: {
		position: 'absolute',
		width: 60,
		height: 60,
		borderRadius: 30,
		backgroundColor: Colors.primary,
		justifyContent: 'center',
		alignItems: 'center',
		right: 20,
		bottom: 60,
		elevation: 5,
		shadowColor: '#000',
		shadowOpacity: 0.3,
		shadowRadius: 6,
		shadowOffset: { width: 0, height: 3 },
	},
});
