import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useGuestContext } from '../../context/GuestContext';
import { useRouter } from 'expo-router';

export default function AlertScreen() {
  const { state, dispatch, resolveEmergency } = useGuestContext();
  const router = useRouter();
  const emg = state.activeEmergency;

  if (!emg) return <View style={styles.container}><Text>No active alert</Text></View>;

  return (
    <SafeAreaView style={[styles.container, emg.severity === 'critical' ? styles.bgCritical : styles.bgWarning]}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.card}>
          <Text style={styles.icon}>⚠️</Text>
          <Text style={styles.title}>EMERGENCY ALERT</Text>
          <Text style={styles.message}>{emg.message}</Text>
          
          <TouchableOpacity 
            style={styles.btnSafe} 
            onPress={() => {
              dispatch({ type: 'UPDATE_STATUS', payload: 'safe' });
              // In this guest-facing app, we'll allow guests to clear simulations
              resolveEmergency();
            }}
          >
            <Text style={styles.btnSafeText}>I am Safe (Dismiss)</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.btnDanger} 
            onPress={() => dispatch({ type: 'SET_EMERGENCY_SUB_SCREEN', payload: 'sos' })}
          >
            <Text style={styles.btnDangerText}>I Need Help (SOS)</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.btnGhost} 
            onPress={() => dispatch({ type: 'SET_EMERGENCY_SUB_SCREEN', payload: 'guidance' })}
          >
            <Text style={styles.btnGhostText}>View Instructions</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  bgCritical: { backgroundColor: '#d32f2f' },
  bgWarning: { backgroundColor: '#f57c00' },
  scroll: { padding: 20, flex: 1, justifyContent: 'center' },
  card: { backgroundColor: '#fff', borderRadius: 20, padding: 32, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 20 },
  icon: { fontSize: 64, marginBottom: 16 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#d32f2f', marginBottom: 16 },
  message: { fontSize: 18, textAlign: 'center', color: '#333', marginBottom: 32, lineHeight: 28 },
  btnSafe: { backgroundColor: '#2e7d32', width: '100%', padding: 16, borderRadius: 8, alignItems: 'center', marginBottom: 16 },
  btnSafeText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  btnDanger: { backgroundColor: '#d32f2f', width: '100%', padding: 16, borderRadius: 8, alignItems: 'center', marginBottom: 16 },
  btnDangerText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  btnGhost: { width: '100%', padding: 16, alignItems: 'center' },
  btnGhostText: { color: '#666', fontSize: 16, fontWeight: 'bold' }
});
