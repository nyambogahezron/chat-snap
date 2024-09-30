import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Community() {
  return (
    <SafeAreaProvider className='flex-1 bg-white items-center justify-center'>
      <Text>Community</Text>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({});
