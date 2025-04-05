import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Feather, Fontisto, MaterialCommunityIcons } from '@expo/vector-icons';

export default function Header() {
  return (
    <View className='flex-1 bg-primary items-center pb-2 w-full'>
      <View className='flex-row items-center justify-between my-4 w-full px-2'>
        <Text className='text-[20px] text-white font-semibold'>Chat Snap</Text>
        <View className='flex-row items-center'>
          <Feather name='camera' size={20} color='#fff' style={styles.icon} />
          <Fontisto name='search' size={20} color='#fff' style={styles.icon} />
          <MaterialCommunityIcons
            name='dots-vertical'
            size={21}
            color='#fff'
            style={styles.icon}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginLeft: 20,
  },
});
