import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useGuestContext } from '../../context/GuestContext';
import type { IssueCategory } from '../../shared/data/mockEmergencies';

const CATEGORIES: { key: IssueCategory; icon: string; label: string; desc: string }[] = [
  { key: 'fire', icon: '🔥', label: 'Fire / Smoke', desc: 'Report visible fire or smoke' },
  { key: 'medical', icon: '🏥', label: 'Medical Event', desc: 'Request medical assistance' },
  { key: 'safety', icon: '⚠️', label: 'Safety Threat', desc: 'Report a security or safety issue' },
  { key: 'assistance', icon: '🙋', label: 'Assistance Needed', desc: 'General help or support' },
];

export default function ReportScreen() {
  const { submitReport } = useGuestContext();
  const [selected, setSelected] = useState<IssueCategory | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (cat: IssueCategory) => {
    setSelected(cat);
    setConfirming(true);
  };

  const handleConfirm = () => {
    if (selected) {
      submitReport(selected);
      setSubmitted(true);
      setTimeout(() => { setSubmitted(false); setConfirming(false); setSelected(null); }, 3000);
    }
  };

  const handleCancel = () => { setConfirming(false); setSelected(null); };

  const selectedCat = CATEGORIES.find((c) => c.key === selected);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.title}>Report an Issue</Text>
          <Text style={styles.subtitle}>Select the category of the incident you are experiencing.</Text>
        </View>

        {!confirming && !submitted && (
          <View style={styles.grid}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity key={cat.key} style={styles.card} onPress={() => handleSelect(cat.key)}>
                <Text style={styles.cardIcon}>{cat.icon}</Text>
                <Text style={styles.cardLabel}>{cat.label}</Text>
                <Text style={styles.cardDesc}>{cat.desc}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {confirming && !submitted && (
          <View style={styles.confirmCard}>
            <Text style={styles.confirmIcon}>{selectedCat?.icon}</Text>
            <Text style={styles.confirmTitle}>{selectedCat?.label}</Text>
            <Text style={styles.confirmDesc}>Are you sure you want to submit a report for this category? This will alert staff immediately.</Text>
            
            <View style={styles.actions}>
              <TouchableOpacity style={styles.btnDanger} onPress={handleConfirm}>
                <Text style={styles.btnDangerText}>Submit Alert</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnGhost} onPress={handleCancel}>
                <Text style={styles.btnGhostText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {submitted && (
          <View style={styles.success}>
            <Text style={styles.successIcon}>✅</Text>
            <Text style={styles.successTitle}>Report Received!</Text>
            <Text style={styles.successDesc}>The team has been alerted.</Text>
          </View>
        )}
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
  grid: { gap: 16 },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 16, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  cardIcon: { fontSize: 32, marginBottom: 8 },
  cardLabel: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  cardDesc: { fontSize: 14, color: '#666' },
  confirmCard: { backgroundColor: '#fff', padding: 32, borderRadius: 16, alignItems: 'center' },
  confirmIcon: { fontSize: 48, marginBottom: 16 },
  confirmTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  confirmDesc: { textAlign: 'center', color: '#666', marginBottom: 32 },
  actions: { width: '100%', gap: 12 },
  btnDanger: { backgroundColor: '#d32f2f', padding: 16, borderRadius: 8, alignItems: 'center' },
  btnDangerText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  btnGhost: { padding: 16, borderRadius: 8, alignItems: 'center' },
  btnGhostText: { color: '#555', fontWeight: 'bold', fontSize: 16 },
  success: { alignItems: 'center', marginTop: 40 },
  successIcon: { fontSize: 64, marginBottom: 16 },
  successTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 8, color: '#2e7d32' },
  successDesc: { fontSize: 16, color: '#666' }
});
