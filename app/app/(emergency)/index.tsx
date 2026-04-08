import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function EmergencyDashboard() {
  const { auth, logout } = useAuth();
  
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#450a0a', '#0f172a']}
        style={styles.background}
      />
      
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <View>
              <Text style={styles.unitName}>Unit: Strike-Alpha</Text>
              <Text style={styles.responderName}>{auth.user?.name} Status: On-Duty</Text>
            </View>
            <View style={styles.statusBadge}>
              <View style={styles.pulse} />
              <Text style={styles.statusText}>LIVE</Text>
            </View>
          </View>

          <View style={styles.emergencyBanner}>
            <Ionicons name="warning" size={32} color="#fff" />
            <View style={styles.bannerText}>
              <Text style={styles.alertCount}>3 ACTIVE INCIDENTS</Text>
              <Text style={styles.alertSubtitle}>Immediate response required in Sector B</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Priority Dispatch</Text>
          
          <TouchableOpacity style={styles.incidentCard}>
            <View style={styles.incidentTag}>
              <Text style={styles.incidentTagText}>LEVEL 1 - CRITICAL</Text>
            </View>
            <Text style={styles.incidentTitle}>Fire Alarm: Room 302</Text>
            <Text style={styles.incidentLocation}>South Wing • Floor 3</Text>
            <View style={styles.incidentMeta}>
              <View style={styles.metaItem}>
                <Ionicons name="time-outline" size={14} color="#94a3b8" />
                <Text style={styles.metaText}>4m ago</Text>
              </View>
              <View style={styles.metaItem}>
                <Ionicons name="people-outline" size={14} color="#94a3b8" />
                <Text style={styles.metaText}>2 occupants</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.respondBtn}>
              <Text style={styles.respondBtnText}>ACCEPT DISPATCH</Text>
            </TouchableOpacity>
          </TouchableOpacity>

          <View style={styles.grid}>
            <GridItem icon="map" label="Layout" color="#38bdf8" />
            <GridItem icon="radio" label="Comms" color="#4ade80" />
            <GridItem icon="medkit" label="Medical" color="#fb7185" />
            <GridItem icon="flashlight" label="Tools" color="#fbbf24" />
          </View>

          <TouchableOpacity style={styles.broadcastBtn}>
            <Ionicons name="megaphone" size={24} color="#fff" />
            <Text style={styles.broadcastText}>VOICE BROADCAST</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <Ionicons name="power" size={20} color="#94a3b8" />
            <Text style={styles.logoutText}>End Shift & Sign Out</Text>
          </TouchableOpacity>
          
          <View style={{ height: 40 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function GridItem({ icon, label, color }: any) {
  return (
    <TouchableOpacity style={styles.gridItem}>
      <View style={[styles.gridIcon, { backgroundColor: color + '20' }]}>
        <Ionicons name={icon} size={28} color={color} />
      </View>
      <Text style={styles.gridLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  background: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 },
  scrollContent: { padding: 20 },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 10
  },
  unitName: { fontSize: 22, fontWeight: 'bold', color: '#f8fafc' },
  responderName: { fontSize: 13, color: '#94a3b8', marginTop: 4 },
  statusBadge: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: 'rgba(16, 185, 129, 0.1)', 
    paddingHorizontal: 10, 
    paddingVertical: 5, 
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)'
  },
  pulse: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#10b981', marginRight: 6 },
  statusText: { color: '#10b981', fontSize: 10, fontWeight: 'bold' },
  emergencyBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ef4444',
    padding: 20,
    borderRadius: 24,
    marginBottom: 32,
    shadowColor: '#ef4444',
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 10
  },
  bannerText: { marginLeft: 16 },
  alertCount: { color: '#fff', fontSize: 18, fontWeight: '800' },
  alertSubtitle: { color: 'rgba(255, 255, 255, 0.8)', fontSize: 12, marginTop: 2 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#f8fafc', marginBottom: 16 },
  incidentCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.6)',
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
    marginBottom: 24
  },
  incidentTag: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 12
  },
  incidentTagText: { color: '#ef4444', fontSize: 10, fontWeight: 'bold' },
  incidentTitle: { fontSize: 20, fontWeight: '700', color: '#f8fafc' },
  incidentLocation: { fontSize: 14, color: '#94a3b8', marginTop: 4 },
  incidentMeta: { flexDirection: 'row', gap: 16, marginTop: 16 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { color: '#64748b', fontSize: 12 },
  respondBtn: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20
  },
  respondBtnText: { color: '#0f172a', fontWeight: 'bold', fontSize: 14 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, marginBottom: 24 },
  gridItem: { 
    flex: 1, 
    minWidth: '45%', 
    backgroundColor: 'rgba(30, 41, 59, 0.4)', 
    padding: 20, 
    borderRadius: 20, 
    alignItems: 'center' 
  },
  gridIcon: { width: 56, height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  gridLabel: { color: '#cbd5e1', fontSize: 14, fontWeight: '600' },
  broadcastBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0f172a',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    gap: 12,
    marginBottom: 16
  },
  broadcastText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 8,
    marginTop: 8
  },
  logoutText: { color: '#64748b', fontWeight: '600', fontSize: 14 }
});
