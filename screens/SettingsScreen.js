import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../styles/colors';

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedDarkMode = await AsyncStorage.getItem('darkMode');
      if (savedDarkMode !== null) {
        setDarkMode(JSON.parse(savedDarkMode));
      }
    } catch (error) {
      console.error('[SETTINGS] Error loading dark mode:', error);
    }
  };

  const handleDarkModeToggle = async () => {
    try {
      const newValue = !darkMode;
      setDarkMode(newValue);
      await AsyncStorage.setItem('darkMode', JSON.stringify(newValue));
      
      Alert.alert(
        darkMode ? '☀️ Light Mode' : '🌙 Dark Mode',
        darkMode 
          ? 'Light mode activated. App will use light theme.'
          : 'Dark mode activated. App will use dark theme.',
        [{ text: 'OK' }]
      );
    } catch (error) {
      console.error('[SETTINGS] Error saving dark mode:', error);
      Alert.alert('❌ Error', 'Failed to save dark mode setting');
    }
  };

  const getStorageSize = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      let totalSize = 0;
      
      for (const key of keys) {
        const value = await AsyncStorage.getItem(key);
        if (value) {
          totalSize += new Blob([value]).size;
        }
      }
      
      // Convert to KB
      const sizeInKB = (totalSize / 1024).toFixed(2);
      return `${sizeInKB} KB`;
    } catch (error) {
      console.error('[SETTINGS] Storage size error:', error);
      return 'Unknown';
    }
  };

  const handleViewStorage = async () => {
    try {
      const size = await getStorageSize();
      const keys = await AsyncStorage.getAllKeys();
      
      Alert.alert(
        '💾 Storage Info',
        `Total Size: ${size}\nTotal Items: ${keys.length} keys\n\nKeys stored:\n${keys.join('\n')}`,
        [{ text: 'OK' }]
      );
    } catch (error) {
      Alert.alert('❌ Error', 'Failed to get storage info');
    }
  };

  const handleResetSettings = async () => {
    Alert.alert(
      '⚠️ Reset App Settings',
      'Are you sure you want to reset all settings to default? This will:\n\n• Turn off dark mode\n• Clear all preferences\n• Keep your orders and profile',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          onPress: async () => {
            try {
              // Reset dark mode
              setDarkMode(false);
              await AsyncStorage.setItem('darkMode', JSON.stringify(false));
              
              // Remove other settings if any
              await AsyncStorage.removeItem('appSettings');
              
              Alert.alert('✅ Success', 'Settings reset to default');
            } catch (error) {
              console.error('[SETTINGS] Reset error:', error);
              Alert.alert('❌ Error', 'Failed to reset settings');
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  const handleClearData = () => {
    Alert.alert(
      '⚠️ Clear All Data',
      'This will delete ALL app data including orders, cache, and settings. This action CANNOT be undone!\n\nYour account will remain active but all local data will be removed.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear Everything',
          onPress: async () => {
            try {
              // Get list of all keys
              const keys = await AsyncStorage.getAllKeys();
              console.log('[SETTINGS] Clearing all keys:', keys);
              
              // Clear everything except user authentication
              const keysToRemove = keys.filter(key => 
                !key.includes('firebase') && 
                !key.includes('auth')
              );
              
              await AsyncStorage.multiRemove(keysToRemove);
              
              // Reset dark mode
              setDarkMode(false);
              await AsyncStorage.setItem('darkMode', JSON.stringify(false));
              
              Alert.alert('✅ Success', 'All app data cleared successfully');
              console.log('[SETTINGS] All data cleared');
            } catch (error) {
              console.error('[SETTINGS] Clear data error:', error);
              Alert.alert('❌ Error', 'Failed to clear data: ' + error.message);
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  const handleHelpCenter = () => {
    Alert.alert(
      '🆘 Help Center',
      'Frequently Asked Questions:\n\n' +
      '1. How do I place an order?\n' +
      '   - Browse food items and tap "Add to Cart"\n\n' +
      '2. How do I track my order?\n' +
      '   - Go to Orders tab to see active orders\n\n' +
      '3. How do I update my profile?\n' +
      '   - Go to Profile tab and tap "Edit"\n\n' +
      '4. How do I change my password?\n' +
      '   - Use "Forgot Password" on login screen\n\n' +
      'Need more help? Contact us!',
      [{ text: 'Close' }]
    );
  };

  const handleContactUs = () => {
    Alert.alert(
      '📞 Contact Us',
      'Get in touch with our support team:\n\n' +
      '📧 Email: support@foodordering.com\n' +
      '📱 Phone: +63 123 456 7890\n' +
      '⏰ Hours: Mon-Fri, 9AM-6PM\n\n' +
      'We typically respond within 24 hours!',
      [
        { text: 'Close' },
        { 
          text: 'Send Email', 
          onPress: () => Alert.alert('Info', 'Email app would open here')
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Display Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎨 Display</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Dark Mode</Text>
              <Text style={styles.settingDescription}>
                {darkMode ? 'Dark theme is active' : 'Light theme is active'}
              </Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={handleDarkModeToggle}
              trackColor={{ false: '#E0E0E0', true: COLORS.primary }}
              thumbColor="#FFF"
            />
          </View>
        </View>

        {/* Data & Storage Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💾 Data & Storage</Text>
          
          <TouchableOpacity
            style={styles.dataItem}
            onPress={handleViewStorage}
          >
            <View style={styles.dataInfo}>
              <Text style={styles.dataLabel}>Total App Data</Text>
              <Text style={styles.dataValue}>Tap to view storage info</Text>
            </View>
            <Text style={styles.dataArrow}>›</Text>
          </TouchableOpacity>

          <Text style={styles.dataDescription}>
            Manage App Data:
          </Text>

          <View style={styles.categoryItem}>
            <Text style={styles.categoryName}>App Settings</Text>
            <TouchableOpacity onPress={handleResetSettings}>
              <Text style={styles.clearButton}>Reset</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🆘 Support</Text>
          
          <TouchableOpacity style={styles.supportItem} onPress={handleHelpCenter}>
            <View>
              <Text style={styles.supportTitle}>Help Center</Text>
              <Text style={styles.supportDescription}>
                View FAQ or support articles
              </Text>
            </View>
            <Text style={styles.supportArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.supportItem} onPress={handleContactUs}>
            <View>
              <Text style={styles.supportTitle}>Contact Us</Text>
              <Text style={styles.supportDescription}>
                Send us a message or email
              </Text>
            </View>
            <Text style={styles.supportArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Danger Zone */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚠️ Danger Zone</Text>
          
          <TouchableOpacity
            style={styles.dangerButton}
            onPress={handleClearData}
          >
            <Text style={styles.dangerButtonText}>Clear All Data</Text>
          </TouchableOpacity>
        </View>

        {/* Version Info */}
        <View style={styles.section}>
          <View style={styles.versionInfo}>
            <Text style={styles.versionLabel}>App Version</Text>
            <Text style={styles.versionNumber}>1.0.0</Text>
          </View>
          <View style={styles.versionInfo}>
            <Text style={styles.versionLabel}>Build Number</Text>
            <Text style={styles.versionNumber}>2024.06.15</Text>
          </View>
        </View>

        <View style={styles.footer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingInfo: {
    flex: 1,
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  settingDescription: {
    fontSize: 12,
    color: COLORS.border,
    marginTop: 4,
  },
  changeButton: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '600',
  },
  dataItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  dataInfo: {
    flex: 1,
  },
  dataLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  dataValue: {
    fontSize: 12,
    color: COLORS.border,
    marginTop: 4,
  },
  dataArrow: {
    fontSize: 18,
    color: COLORS.border,
  },
  dataDescription: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: 12,
    marginBottom: 8,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 13,
    color: COLORS.text,
  },
  clearButton: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  supportItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  supportTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  supportDescription: {
    fontSize: 12,
    color: COLORS.border,
    marginTop: 4,
  },
  supportArrow: {
    fontSize: 18,
    color: COLORS.border,
  },
  dangerButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginVertical: 8,
  },
  dangerButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  versionInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  versionLabel: {
    fontSize: 13,
    color: COLORS.border,
  },
  versionNumber: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
  },
  footer: {
    height: 40,
  },
});
