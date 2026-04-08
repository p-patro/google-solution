import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MOCK_ALERTS = [
  { id: '1', type: 'Critical', location: 'Wing A, Floor 2', message: 'Smoke detector activated', time: '10 mins ago', status: 'pending' },
  { id: '2', type: 'Warning', location: 'Pool Area', message: 'Unauthorized entry after hours', time: '25 mins ago', status: 'investigating' },
  { id: '3', type: 'Info', location: 'Lobby', message: 'Elevator maintenance complete', time: '1 hour ago', status: 'closed' },
];

export default function AdminAlerts() {
  return (
    <View style={styles.container}>
      <FlatList
        data={MOCK_ALERTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.alertItem}>
            <View style={[styles.statusLine, { backgroundColor: getStatusColor(item.type) }]} />
            <View style={styles.alertContent}>
              <View style={styles.alertHeader}>
                <Text style={styles.alertType}>{item.type}</Text>
                <Text style={styles.alertTime}>{item.time}</Text>
              </View>
              <Text style={styles.alertLocation}>{item.location}</Text>
              <Text style={styles.alertMessage}>{item.message}</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#475569" />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

function getStatusColor(type: string) {
  if (type === 'Critical') return '#ef4444';
  if (type === 'Warning') return '#fbbf24';
  return '#3b82f6';
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  list: { padding: 15 },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    paddingRight: 15,
  },
  statusLine: { width: 4, height: '100%' },
  alertContent: { flex: 1, padding: 15 },
  alertHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  alertType: { fontWeight: 'bold', color: '#f1f5f9' },
  alertTime: { fontSize: 12, color: '#94a3b8' },
  alertLocation: { fontSize: 14, fontWeight: '600', color: '#38bdf8', marginBottom: 5 },
  alertMessage: { fontSize: 14, color: '#f1f5f9', marginBottom: 10 },
  statusBadge: { alignSelf: 'flex-start', backgroundColor: '#334155', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  statusText: { fontSize: 10, fontWeight: 'bold', color: '#94a3b8' }
});
