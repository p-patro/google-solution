import { Stack } from 'expo-router';
import React from 'react';

export default function EmergencyLayout() {
  return (
    <Stack screenOptions={{
      headerStyle: { backgroundColor: '#ef4444' },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold' },
    }}>
      <Stack.Screen
        name="index"
        options={{ title: 'Responder Command' }}
      />
    </Stack>
  );
}
