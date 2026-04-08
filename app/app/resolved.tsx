import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useGuestContext } from '../context/GuestContext';
import { useRouter } from 'expo-router';

export default function ResolvedScreen() {
  const { returnToNormal } = useGuestContext();
  const router = useRouter();

  const handleComplete = () => {
    returnToNormal();
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.icon}>✅</Text>
        <Text style={styles.title}>All Clear Issued</Text>
        <Text style={styles.desc}>The emergency event has been officially concluded. You may safely resume your normal routine.</Text>
        <TouchableOpacity style={styles.button} onPress={handleComplete}>
          <Text style={styles.btnText}>Return to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e8f5e9', justifyContent: 'center', padding: 20 },
  card: { backgroundColor: '#fff', padding: 40, borderRadius: 20, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 20, elevation: 5 },
  icon: { fontSize: 64, marginBottom: 24 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#2e7d32', marginBottom: 16 },
  desc: { fontSize: 16, color: '#555', textAlign: 'center', marginBottom: 40, lineHeight: 24 },
  button: { backgroundColor: '#2e7d32', padding: 16, width: '100%', borderRadius: 30, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 18 }
});
