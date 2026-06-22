import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import { COLORS } from '../styles/colors';

export default function ProfileScreen({ navigation }) {
  const { user, userProfile, updateUserProfile, loading, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    fullName: userProfile?.fullName || userProfile?.username || '',
    email: userProfile?.email || user?.email || '',
    phone: userProfile?.phone || '',
    address: userProfile?.address || '',
    city: userProfile?.city || '',
    zipCode: userProfile?.zipCode || '',
  });

  // Update form data when userProfile loads
  useEffect(() => {
    console.log('[PROFILE SCREEN] userProfile:', userProfile);
    console.log('[PROFILE SCREEN] user:', user);
    
    if (userProfile) {
      setFormData({
        fullName: userProfile?.fullName || userProfile?.username || '',
        email: userProfile?.email || user?.email || '',
        phone: userProfile?.phone || '',
        address: userProfile?.address || '',
        city: userProfile?.city || '',
        zipCode: userProfile?.zipCode || '',
      });
    }
  }, [userProfile, user]);

  const handleSave = async () => {
    if (!formData.fullName.trim()) {
      Alert.alert('Error', 'Please enter your full name');
      return;
    }

    setSaving(true);
    try {
      console.log('[PROFILE SCREEN] Saving profile...');
      const result = await updateUserProfile(formData);
      console.log('[PROFILE SCREEN] Save result:', result);
      
      if (result.success) {
        setIsEditing(false);
        Alert.alert('Success', 'Profile updated successfully');
      } else {
        Alert.alert('Error', result.error || 'Failed to update profile');
      }
    } catch (error) {
      console.error('[PROFILE SCREEN] Save error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        {
          text: 'Logout',
          onPress: async () => {
            await logout();
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatar}>👤</Text>
            </View>
            <Text style={styles.name}>
              {loading ? 'Loading...' : (userProfile?.fullName || userProfile?.username || user?.displayName || 'User')}
            </Text>
            <Text style={styles.email}>{userProfile?.email || user?.email || ''}</Text>
          </View>

          {/* Profile Information */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Profile Information</Text>
              {!isEditing && (
                <TouchableOpacity onPress={() => setIsEditing(true)}>
                  <Text style={styles.editButton}>Edit</Text>
                </TouchableOpacity>
              )}
            </View>

            {isEditing ? (
              <>
                {/* Full Name */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Full Name</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.fullName}
                    onChangeText={(text) =>
                      setFormData({ ...formData, fullName: text })
                    }
                    placeholder="Enter full name"
                    editable={!saving}
                  />
                </View>

                {/* Phone */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Phone Number</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.phone}
                    onChangeText={(text) =>
                      setFormData({ ...formData, phone: text })
                    }
                    placeholder="Enter phone number"
                    keyboardType="phone-pad"
                    editable={!saving}
                  />
                </View>

                {/* Address */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Address</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.address}
                    onChangeText={(text) =>
                      setFormData({ ...formData, address: text })
                    }
                    placeholder="Enter address"
                    editable={!saving}
                  />
                </View>

                {/* City */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>City</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.city}
                    onChangeText={(text) =>
                      setFormData({ ...formData, city: text })
                    }
                    placeholder="Enter city"
                    editable={!saving}
                  />
                </View>

                {/* Zip Code */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Zip Code</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.zipCode}
                    onChangeText={(text) =>
                      setFormData({ ...formData, zipCode: text })
                    }
                    placeholder="Enter zip code"
                    editable={!saving}
                  />
                </View>

                {/* Action Buttons */}
                <View style={styles.buttonGroup}>
                  <TouchableOpacity
                    style={[styles.saveButton, saving && styles.disabledButton]}
                    onPress={handleSave}
                    disabled={saving}
                  >
                    {saving ? (
                      <ActivityIndicator color="#FFF" size="small" />
                    ) : (
                      <Text style={styles.saveButtonText}>Save Changes</Text>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => setIsEditing(false)}
                    disabled={saving}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                {/* Display Mode */}
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Phone</Text>
                  <Text style={styles.infoValue}>{formData.phone || 'Not provided'}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Address</Text>
                  <Text style={styles.infoValue}>{formData.address || 'Not provided'}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>City</Text>
                  <Text style={styles.infoValue}>{formData.city || 'Not provided'}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Zip Code</Text>
                  <Text style={styles.infoValue}>{formData.zipCode || 'Not provided'}</Text>
                </View>
              </>
            )}
          </View>

          {/* Quick Links */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Links</Text>
            <TouchableOpacity
              style={styles.linkItem}
              onPress={() => navigation.navigate('OrderHistory', { completedOnly: true })}
            >
              <Text style={styles.linkIcon}>📦</Text>
              <Text style={styles.linkText}>Order History</Text>
              <Text style={styles.linkArrow}>›</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.linkItem}
              onPress={() => navigation.navigate('Settings')}
            >
              <Text style={styles.linkIcon}>⚙️</Text>
              <Text style={styles.linkText}>Settings</Text>
              <Text style={styles.linkArrow}>›</Text>
            </TouchableOpacity>
          </View>

          {/* Logout Button */}
          {!isEditing && (
            <View style={styles.section}>
              <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
              >
                <Text style={styles.logoutButtonText}>LOGOUT</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#F9F9F9',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    fontSize: 50,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: COLORS.border,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  editButton: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: COLORS.text,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  saveButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: 'bold',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.border,
  },
  infoValue: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '500',
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  linkIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  linkText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
  },
  linkArrow: {
    fontSize: 18,
    color: COLORS.border,
  },
  logoutButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  logoutButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});
