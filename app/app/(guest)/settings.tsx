import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useGuestContext } from '../../context/GuestContext';
import { useAuth } from '../../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const { state, dispatch } = useGuestContext();
  const { logout } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>Manage your session and preferences.</Text>
        </View>

        <Text style={styles.sectionTitle}>Session Information</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Session ID</Text>
            <Text style={styles.rowValue}>{state.guestSession.sessionId}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Property</Text>
            <Text style={styles.rowValue}>{state.guestSession.propertyName}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Room Number</Text>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="E.g. 402"
            value={state.guestSession.roomNumber || ''}
            onChangeText={(text) => dispatch({ type: 'SET_ROOM_NUMBER', payload: text })}
          />
          <Text style={styles.hint}>Used by responders to locate you</Text>
        </View>

        <Text style={styles.sectionTitle}>Location Status</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>GPS Coordinate</Text>
            <Text style={styles.rowValue}>{state.location.latitude ? 'Available ✅' : 'Unavailable ⚠️'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Location Sharing</Text>
            <Text style={styles.rowValue}>{state.isLocationSharing ? 'Active 🟢' : 'Inactive ⚪'}</Text>
          </View>
        </View>

        <View style={styles.privacy}>
          <Text style={styles.privacyTitle}>🔒 Privacy Notice</Text>
          <Text style={styles.privacyDesc}>Your location is strictly confidential and will exclusively be shared if you actively engage an SOS alarm.</Text>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Ionicons name="log-out-outline" size={24} color="#ef4444" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  scroll: { padding: 20 },
  header: { marginBottom: 32, marginTop: 40 },
  title: { fontSize: 28, fontWeight: 'bold' },
  subtitle: { fontSize: 16, color: '#666', marginTop: 8 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#666', marginBottom: 12, marginTop: 24 },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 16, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  rowLabel: { color: '#666', fontSize: 16 },
  rowValue: { fontWeight: '500', fontSize: 16 },
  input: { backgroundColor: '#f1f3f5', padding: 16, borderRadius: 8, fontSize: 16 },
  hint: { color: '#888', fontSize: 12, marginTop: 8 },
  privacy: { marginTop: 40, backgroundColor: '#eef2ff', padding: 20, borderRadius: 16 },
  privacyTitle: { fontWeight: 'bold', color: '#3730a3', marginBottom: 8, fontSize: 16 },
  privacyDesc: { color: '#4338ca', lineHeight: 20 },
  logoutButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginTop: 40, 
    marginBottom: 40,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#fee2e2'
  },
  logoutText: { color: '#ef4444', fontWeight: 'bold', fontSize: 16, marginLeft: 10 }
});
