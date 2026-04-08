import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useGuestContext } from '../../context/GuestContext';
import { useRouter } from 'expo-router';

export default function GuidanceScreen() {
  const { state, dispatch } = useGuestContext();
  const router = useRouter();
  
  let instructions = state.activeEmergency?.instructions || [];
  
  // Provide default instructions if no active system alert is present (e.g. manual SOS)
  if (instructions.length === 0) {
    instructions = [
      "Find a safe location and stay there",
      "Keep your phone with you at all times",
      "Do not attempt to exit if you feel unsafe",
      "Wait for responder communication",
      "Keep pathways clear for emergency personnel"
    ];
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Emergency Guidance</Text>
        <TouchableOpacity onPress={() => dispatch({ type: 'SET_EMERGENCY_SUB_SCREEN', payload: 'alert' })}>
          <Text style={styles.btnBack}>Back</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        {instructions.map((step, idx) => {
          const isDone = state.guidanceStepsCompleted.includes(idx);
          return (
            <TouchableOpacity 
              key={idx} 
              style={[styles.stepCard, isDone && styles.stepDone]} 
              onPress={() => dispatch({ type: 'TOGGLE_GUIDANCE_STEP', payload: idx })}
            >
              <View style={[styles.checkbox, isDone && styles.checkboxActive]}>
                {isDone && <Text style={styles.checkIcon}>✓</Text>}
              </View>
              <Text style={[styles.stepText, isDone && styles.stepTextDone]}>{step}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 40, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
  title: { fontSize: 20, fontWeight: 'bold' },
  btnBack: { color: '#1976d2', fontWeight: 'bold', fontSize: 16 },
  scroll: { padding: 20, gap: 12 },
  stepCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 16, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5 },
  stepDone: { backgroundColor: '#f1f8e9', opacity: 0.7 },
  checkbox: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: '#ccc', marginRight: 12, justifyContent: 'center', alignItems: 'center' },
  checkboxActive: { backgroundColor: '#2e7d32', borderColor: '#2e7d32' },
  checkIcon: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  stepText: { flex: 1, fontSize: 16, color: '#333' },
  stepTextDone: { textDecorationLine: 'line-through', color: '#666' }
});
