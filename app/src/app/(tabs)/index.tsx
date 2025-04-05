import { View } from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import { StatusBar } from 'expo-status-bar';

export default function Chats() {
  return (
    <View className='flex-1 bg-white items-center justify-center '>
      <StatusBar backgroundColor='#0e806a' style='light' />
      <Header />
      <View className='bg-white flex-1'></View>
    </View>
  );
}
