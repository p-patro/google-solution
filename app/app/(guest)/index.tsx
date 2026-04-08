import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useGuestContext } from '../../context/GuestContext';
import { MOCK_EMERGENCIES } from '../../shared/data/mockEmergencies';
import { useRouter } from 'expo-router';

export default function NativeHomeScreen() {
  const { state, triggerEmergency, dispatch } = useGuestContext();
  const router = useRouter();

  const hasActiveAlert = state.mode === 'emergency' && state.activeEmergency;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>👋 Welcome Back!</Text>
          <Text style={styles.propertyText}>{state.guestSession.propertyName}</Text>
          <Text style={styles.sessionId}>ID: {state.guestSession.sessionId}</Text>
        </View>

        <View style={[styles.statusCard, hasActiveAlert ? styles.statusCardAlert : styles.statusCardSafe]}>
          <Text style={[styles.statusTitle, { color: hasActiveAlert ? '#d32f2f' : '#2e7d32' }]}>
            {hasActiveAlert ? '⚠️ ALERT ACTIVE' : '🛡️ ALL CLEAR'}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={[styles.actionCard, styles.sosCard]}
            onPress={() => dispatch({ type: 'TRIGGER_SOS_ONLY' })}
          >
            <Text style={styles.actionIcon}>🆘</Text>
            <Text style={[styles.actionLabel, { color: '#d32f2f' }]}>Emergency</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => router.push('/(tabs)/report')}
          >
            <Text style={styles.actionIcon}>📋</Text>
            <Text style={styles.actionLabel}>Report Issue</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Tap To Simulate Events</Text>
        <View style={styles.simulateContainer}>
          {MOCK_EMERGENCIES.slice(0, 4).map(emg => (
            <TouchableOpacity 
              key={emg.id} 
              style={styles.simButton}
              onPress={() => triggerEmergency(emg)}
            >
              <Text style={{ fontSize: 24 }}>
                {emg.type === 'fire' ? '🔥' : 
                 emg.type === 'evacuation' ? '🚨' :
                 emg.type === 'medical' ? '🏥' : '🔒'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  scroll: { padding: 20 },
  header: { marginBottom: 24, marginTop: 40 },
  welcomeText: { fontSize: 16, color: '#6c757d', marginBottom: 4 },
  propertyText: { fontSize: 28, fontWeight: 'bold', color: '#212529' },
  sessionId: { fontSize: 12, color: '#adb5bd', marginTop: 8 },
  statusCard: { 
    padding: 24, 
    borderRadius: 20, 
    marginBottom: 32,
    alignItems: 'center' 
  },
  statusCardSafe: { backgroundColor: '#e8f5e9' },
  statusCardAlert: { backgroundColor: '#ffebee' },
  statusTitle: { fontSize: 18, fontWeight: 'bold', letterSpacing: 1 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 16, color: '#343a40' },
  actionsContainer: { flexDirection: 'row', gap: 16, marginBottom: 32 },
  actionCard: { 
    flex: 1, 
    backgroundColor: '#fff', 
    padding: 20, 
    borderRadius: 20, 
    alignItems: 'center',
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 2, shadowOffset: { width: 0, height: 4 }
  },
  sosCard: { backgroundColor: '#fff5f5', borderColor: '#ffe3e3', borderWidth: 1 },
  actionIcon: { fontSize: 32, marginBottom: 12 },
  actionLabel: { fontWeight: '600', color: '#495057' },
  simulateContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  simButton: { 
    backgroundColor: '#fff', 
    borderRadius: 30, 
    alignItems: 'center', 
    justifyContent: 'center',
    width: 64, height: 64,
    shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 2, shadowOffset: { width: 0, height: 4 }
  }
});
