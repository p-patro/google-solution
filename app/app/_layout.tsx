import { useEffect } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { GuestProvider, useGuestContext } from '../context/GuestContext';
import { AuthProvider, useAuth } from '../context/AuthContext';

export const unstable_settings = {
  anchor: '(guest)',
};

function GlobalRouter() {
  const { auth } = useAuth();
  const { state } = useGuestContext();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    console.log('--- GlobalRouter Sync ---');
    console.log('Auth:', auth.isAuthenticated, 'Role:', auth.role);
    console.log('Pathname:', pathname);

    // 1. Handle Authentication Redirect
    if (!auth.isAuthenticated) {
      if (pathname !== '/login') {
        console.log('Not authenticated, redirecting to login');
        router.replace('/login');
      }
      return;
    }

    // 2. Handle Post-Login Redirect
    if (auth.isAuthenticated && (pathname === '/login' || pathname === '/')) {
      console.log('Authenticated, redirecting to dashboard');
      if (auth.role === 'admin') {
        router.replace('/(admin)');
      } else if (auth.role === 'emergency') {
        router.replace('/(emergency)');
      } else {
        router.replace('/(guest)');
      }
      return;
    }

    // 3. Keep existing Emergency Logic (primarily for Guests)
    if (auth.role === 'guest') {
      if (state.mode === 'emergency') {
        const targetPath = `/emergency/${state.emergencySubScreen}`;
        if (!pathname.startsWith('/emergency')) {
          router.push(targetPath as any);
        } else if (pathname !== targetPath) {
          router.replace(targetPath as any);
        }
      } else if (state.mode === 'resolved') {
        if (pathname !== '/resolved') {
          router.replace('/resolved');
        }
      } else if (state.mode === 'normal') {
        if (pathname.startsWith('/emergency') || pathname === '/resolved') {
          router.replace('/(guest)');
        }
      }
    }
  }, [auth.isAuthenticated, auth.role, state.mode, state.emergencySubScreen, pathname, router]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="(guest)" />
      <Stack.Screen name="(admin)" />
      <Stack.Screen name="(emergency)" />
      <Stack.Screen name="emergency/alert" options={{ presentation: 'fullScreenModal' }} />
      <Stack.Screen name="emergency/sos" options={{ presentation: 'fullScreenModal' }} />
      <Stack.Screen name="emergency/guidance" options={{ presentation: 'modal' }} />
      <Stack.Screen name="resolved" />
    </Stack>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <GuestProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <GlobalRouter />
          <StatusBar style="auto" />
        </ThemeProvider>
      </GuestProvider>
    </AuthProvider>
  );
}
