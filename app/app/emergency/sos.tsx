import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useGuestContext } from '../../context/GuestContext';
import { useRouter } from 'expo-router';

export default function SOSScreen() {
  const { state, dispatch, sendSOS, cancelSOS, returnToNormal } = useGuestContext();
  const router = useRouter();

  const handleHelp = () => {
    sendSOS('medical', 'need_help');
  };

  const handleBack = () => {
    if (state.activeEmergency) {
      dispatch({ type: 'SET_EMERGENCY_SUB_SCREEN', payload: 'alert' });
    } else {
      returnToNormal();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        {state.sosActive ? (
          <View style={styles.activeState}>
            <Text style={styles.title}>SOS Sent!</Text>
            <Text style={styles.desc}>Responders have been notified of your location.</Text>
            
            <View style={styles.locationBadge}>
              <Text style={styles.locationTitle}>📍 Current Tracking</Text>
              <Text style={styles.locationCoords}>
                {state.location.latitude ? `${state.location.latitude.toFixed(4)}, ${state.location.longitude?.toFixed(4)}` : 'Gps searching...'}
              </Text>
            </View>

            <TouchableOpacity style={styles.btnCancel} onPress={cancelSOS}>
              <Text style={styles.btnCancelText}>Cancel SOS</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnBack} onPress={handleBack}>
              <Text style={styles.btnBackText}>Go Back</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.inactiveState}>
            <Text style={styles.warnText}>Tap below to send immediate distress signal</Text>
            <TouchableOpacity style={styles.sosButton} onPress={handleHelp}>
              <Text style={styles.sosText}>SOS</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnBack} onPress={handleBack}>
              <Text style={styles.btnBackText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  inner: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  activeState: { alignItems: 'center' },
  inactiveState: { alignItems: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#fff', marginBottom: 16 },
  desc: { fontSize: 18, color: '#ccc', textAlign: 'center', marginBottom: 40 },
  warnText: { fontSize: 18, color: '#ffb74d', marginBottom: 40, textAlign: 'center' },
  sosButton: { width: 200, height: 200, borderRadius: 100, backgroundColor: '#d32f2f', justifyContent: 'center', alignItems: 'center', marginBottom: 40, borderWidth: 8, borderColor: 'rgba(211, 47, 47, 0.3)' },
  sosText: { color: '#fff', fontSize: 48, fontWeight: 'bold' },
  btnCancel: { backgroundColor: '#333', padding: 16, paddingHorizontal: 32, borderRadius: 30, marginBottom: 16 },
  btnCancelText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  btnBack: { padding: 16 },
  btnBackText: { color: '#888', fontSize: 16, fontWeight: 'bold' },
  locationBadge: { backgroundColor: '#333', padding: 20, borderRadius: 16, marginBottom: 40, alignItems: 'center', width: '100%' },
  locationTitle: { color: '#888', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
  locationCoords: { color: '#00B894', fontSize: 24, fontWeight: 'bold', fontFamily: 'monospace' }
});
