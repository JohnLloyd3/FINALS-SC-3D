import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { COLORS } from '../styles/colors';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { sendReset } = useAuth();

  const validateEmail = () => {
    if (!email.trim()) {
      setError('Please enter your email');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleSendReset = async () => {
    setError('');
    if (!validateEmail()) return;
    setLoading(true);
    try {
      const result = await sendReset(email);
      if (result.success) {
        Alert.alert('Reset Link Sent', 'A password reset link has been sent to your email.', [{ text: 'OK', onPress: () => navigation.goBack() }]);
      } else {
        setError(result.error || 'Failed to send reset email');
        Alert.alert('Error', result.error || 'Failed to send reset email');
      }
    } catch (err) {
      setError(err.message || 'Failed to send reset email');
      Alert.alert('Error', err.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} disabled={loading}>
            <Text style={styles.backIcon}>← Back</Text>
          </TouchableOpacity>
          <View style={styles.header}>
            <Text style={styles.title}>Reset Password</Text>
            <Text style={styles.subtitle}>Enter your email to receive a reset link</Text>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput style={styles.input} placeholder="Enter your email" placeholderTextColor={COLORS.border} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" editable={!loading} />
            </View>
            {error ? <View style={styles.errorContainer}><Text style={styles.errorText}>{error}</Text></View> : null}
            <TouchableOpacity style={[styles.sendButton, loading && styles.disabledButton]} onPress={handleSendReset} disabled={loading}>
              {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.sendButtonText}>SEND</Text>}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  keyboardView: { flex: 1 },
  scrollContent: { flexGrow: 1, paddingHorizontal: 20, paddingVertical: 20 },
  backButton: { marginBottom: 20 },
  backIcon: { color: COLORS.primary, fontSize: 14, fontWeight: '600' },
  header: { marginBottom: 40 },
  title: { fontSize: 28, fontWeight: 'bold', color: COLORS.text, marginBottom: 12 },
  subtitle: { fontSize: 14, color: COLORS.border },
  formContainer: { flex: 1 },
  inputGroup: { marginBottom: 24 },
  label: { fontSize: 14, fontWeight: '600', color: COLORS.text, marginBottom: 8 },
  input: { backgroundColor: '#F5F5F5', borderWidth: 1, borderColor: COLORS.border, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 14, color: COLORS.text },
  errorContainer: { backgroundColor: '#FFE5E5', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 12, marginBottom: 16, borderLeftWidth: 4, borderLeftColor: COLORS.primary },
  errorText: { color: COLORS.primary, fontSize: 12, fontWeight: '500' },
  sendButton: { backgroundColor: COLORS.primary, borderRadius: 12, paddingVertical: 14, alignItems: 'center', marginBottom: 32 },
  disabledButton: { opacity: 0.6 },
  sendButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});
