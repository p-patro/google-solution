import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function AdminDashboard() {
  const { auth, logout } = useAuth();
  
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0f172a', '#1e293b']}
        style={styles.background}
      />
      
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <View>
              <Text style={styles.welcome}>Admin Command</Text>
              <Text style={styles.role}>{auth.user?.name} • Head of Security</Text>
            </View>
            <TouchableOpacity style={styles.profileBtn}>
              <Ionicons name="person-circle" size={40} color="#fbbf24" />
            </TouchableOpacity>
          </View>

          {/* Quick Metrics */}
          <View style={styles.metricsContainer}>
            <View style={styles.metricsRow}>
              <MetricCard 
                label="Online Guests" 
                value="1,284" 
                icon="people" 
                color="#38bdf8" 
                trend="+12%" 
              />
              <MetricCard 
                label="Safety Rating" 
                value="98.2%" 
                icon="shield-checkmark" 
                color="#4ade80" 
                trend="Stable" 
              />
            </View>
            <View style={styles.metricsRow}>
              <MetricCard 
                label="Active Alerts" 
                value="3" 
                icon="warning" 
                color="#ef4444" 
                trend="High Priority" 
              />
              <MetricCard 
                label="Staff Units" 
                value="24" 
                icon="walk" 
                color="#fbbf24" 
                trend="8 active" 
              />
            </View>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>System Status</Text>
            <TouchableOpacity><Text style={styles.viewAll}>View Details</Text></TouchableOpacity>
          </View>

          <View style={styles.statusList}>
            <StatusTile title="CCTV Network" status="online" icon="videocam" />
            <StatusTile title="Fire Suppression" status="online" icon="flame" />
            <StatusTile title="Emergency Comms" status="warning" icon="radio" />
            <StatusTile title="Access Control" status="online" icon="lock-open" />
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <LinearGradient
              colors={['rgba(244, 63, 94, 0.1)', 'rgba(244, 63, 94, 0.05)']}
              style={styles.logoutGradient}
            >
              <Ionicons name="log-out-outline" size={20} color="#fb7185" />
              <Text style={styles.logoutText}>End Admin Session</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <View style={{ height: 40 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function MetricCard({ label, value, icon, color, trend }: any) {
  return (
    <View style={styles.metricCard}>
      <View style={[styles.metricIconBox, { backgroundColor: color + '15' }]}>
        <Ionicons name={icon} size={24} color={color} />
      </View>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={[styles.metricTrend, { color: color === '#ef4444' ? '#ef4444' : '#94a3b8' }]}>{trend}</Text>
    </View>
  );
}

function StatusTile({ title, status, icon }: any) {
  const isOnline = status === 'online';
  return (
    <View style={styles.statusTile}>
      <View style={styles.statusLeft}>
        <View style={styles.statusIconContainer}>
          <Ionicons name={icon} size={20} color="#94a3b8" />
        </View>
        <Text style={styles.statusTitleText}>{title}</Text>
      </View>
      <View style={[styles.statusIndicator, { backgroundColor: isOnline ? '#10b981' : '#f59e0b' }]}>
        <Text style={styles.indicatorText}>{status.toUpperCase()}</Text>
      </View>
    </View>
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
    marginBottom: 30,
    marginTop: 20
  },
  welcome: { fontSize: 28, fontWeight: '800', color: '#f8fafc' },
  role: { fontSize: 14, color: '#94a3b8', marginTop: 4 },
  profileBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  metricsContainer: { gap: 16, marginBottom: 32 },
  metricsRow: { flexDirection: 'row', gap: 16 },
  metricCard: {
    flex: 1,
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(71, 85, 105, 0.2)',
  },
  metricIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16
  },
  metricValue: { fontSize: 24, fontWeight: 'bold', color: '#f8fafc' },
  metricLabel: { fontSize: 13, color: '#94a3b8', marginTop: 4 },
  metricTrend: { fontSize: 11, fontWeight: '600', marginTop: 8 },
  sectionHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: 16 
  },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#f8fafc' },
  viewAll: { color: '#fbbf24', fontSize: 14, fontWeight: '600' },
  statusList: { gap: 12, marginBottom: 32 },
  statusTile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 41, 59, 0.3)',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(71, 85, 105, 0.1)',
  },
  statusLeft: { flexDirection: 'row', alignItems: 'center' },
  statusIconContainer: { marginRight: 12 },
  statusTitleText: { color: '#cbd5e1', fontWeight: '500' },
  statusIndicator: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  indicatorText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  logoutButton: {
    marginTop: 20,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(244, 63, 94, 0.2)',
  },
  logoutGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    gap: 10,
  },
  logoutText: { color: '#fb7185', fontWeight: 'bold', fontSize: 16 }
});
