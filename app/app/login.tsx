import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  TextInput, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView
} from 'react-native';
import { useAuth, UserRole } from '../context/AuthContext';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function LoginScreen() {
  const { login } = useAuth();
  const [activeTab, setActiveTab] = useState<UserRole>('guest');
  
  // Guest Form State
  const [propertyName, setPropertyName] = useState('');
  const [adminId, setAdminId] = useState('');

  // Staff Form State
  const [staffName, setStaffName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // For mock UI, we just call login with the active role
    // In a real app, we would validate inputs here
    login(activeTab);
  };

  const getThemeColor = () => {
    if (activeTab === 'admin') return '#fbbf24';
    if (activeTab === 'emergency') return '#ef4444';
    return '#38bdf8';
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#0f172a', '#1e293b', '#0f172a']}
        style={styles.background}
      />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <View style={[styles.logoContainer, { borderColor: getThemeColor() + '40' }]}>
              <Ionicons 
                name={activeTab === 'guest' ? "people" : activeTab === 'admin' ? "settings" : "shield-half"} 
                size={50} 
                color={getThemeColor()} 
              />
            </View>
            <Text style={styles.title}>SecureStay</Text>
            <Text style={styles.subtitle}>
              {activeTab === 'guest' 
                ? "Guest Safety Portal" 
                : activeTab === 'admin' 
                  ? "Property Administration" 
                  : "Emergency Force Command"}
            </Text>
          </View>

          {/* Role Toggle */}
          <View style={styles.toggleContainer}>
            <TouchableOpacity 
              style={[styles.toggleBtn, activeTab === 'guest' && styles.toggleBtnActive]} 
              onPress={() => setActiveTab('guest')}
            >
              <Text style={[styles.toggleText, activeTab === 'guest' && styles.toggleTextActive]}>Guest</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.toggleBtn, activeTab === 'admin' && styles.toggleBtnActive]} 
              onPress={() => setActiveTab('admin')}
            >
              <Text style={[styles.toggleText, activeTab === 'admin' && styles.toggleTextActive]}>Admin</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.toggleBtn, activeTab === 'emergency' && styles.toggleBtnActive]} 
              onPress={() => setActiveTab('emergency')}
            >
              <Text style={[styles.toggleText, activeTab === 'emergency' && styles.toggleTextActive]}>Unit</Text>
            </TouchableOpacity>
          </View>

          {/* Form Area */}
          <View style={styles.formContainer}>
            {activeTab === 'guest' ? (
              <View>
                <InputGroup 
                  icon="business" 
                  placeholder="Property Name (e.g. Grand Azure)" 
                  value={propertyName}
                  onChangeText={setPropertyName}
                />
                <InputGroup 
                  icon="key" 
                  placeholder="Admin Verification ID" 
                  value={adminId}
                  onChangeText={setAdminId}
                  description="Your property admin will provide this ID for verification."
                />
              </View>
            ) : (
              <View>
                <InputGroup 
                  icon="person" 
                  placeholder="Staff ID / Username" 
                  value={staffName}
                  onChangeText={setStaffName}
                />
                <InputGroup 
                  icon="lock-closed" 
                  placeholder="Access Password" 
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>
            )}

            <TouchableOpacity 
              style={[styles.loginButton, { backgroundColor: getThemeColor() }]} 
              onPress={handleLogin}
              activeOpacity={0.8}
            >
              <Text style={styles.loginButtonText}>
                {activeTab === 'guest' ? "Verify & Enter" : "Authorize Access"}
              </Text>
              <Ionicons name="arrow-forward" size={20} color="#000" />
            </TouchableOpacity>

            <Text style={styles.footerNote}>
              {activeTab === 'guest' 
                ? "By entering, you agree to our safety protocols." 
                : "Authorized personnel only. Access is monitored."}
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function InputGroup({ icon, placeholder, value, onChangeText, secureTextEntry, description }: any) {
  return (
    <View style={styles.inputWrapper}>
      <View style={styles.inputContainer}>
        <Ionicons name={icon} size={20} color="#94a3b8" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#64748b"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          autoCapitalize="none"
        />
      </View>
      {description && <Text style={styles.inputDescription}>{description}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  scrollContent: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 30,
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1.5,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#f8fafc',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 8,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderRadius: 16,
    padding: 6,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: 'rgba(71, 85, 105, 0.3)',
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
  },
  toggleBtnActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  toggleText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#64748b',
  },
  toggleTextActive: {
    color: '#f8fafc',
  },
  formContainer: {
    gap: 20,
  },
  inputWrapper: {
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(71, 85, 105, 0.3)',
    paddingHorizontal: 16,
    height: 60,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: '#f1f5f9',
    fontSize: 16,
  },
  inputDescription: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 8,
    paddingHorizontal: 4,
    lineHeight: 18,
  },
  loginButton: {
    flexDirection: 'row',
    height: 60,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
  },
  footerNote: {
    fontSize: 13,
    color: '#475569',
    textAlign: 'center',
    marginTop: 20,
  },
});
