import { router } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../../components/common/Button';

const Profile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <View style={styles.headerContent}>
              <Image
              source={{ uri: 'https://avatar.iran.liara.run/public/40' }}
              resizeMode="cover"
              style={styles.avatar}
            />
            
            <View style={styles.profileTextContainer}>
              <Text style={styles.greetingText}>Hi👋🏻 John!</Text>
              <Text style={styles.phoneText}>23409185786</Text>
            </View>
          </View>
        </View>

        {/* Status Section */}
        <View style={styles.statusSection}>
          <Text style={styles.upgradePrompt}>
            You can only take 2 more bookings as a FREE User.
          </Text>
          <CustomButton
            title="Upgrade Now"
            onPress={() => {} /* Add your onPress logic here */}
            style={styles.upgradeButton}
            textStyle={styles.badgeText}
          />
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/profile/personal-info")}
          >
            <Text style={styles.menuText}>Personal Information</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>My Network</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Offers & Contest</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Manage Drivers</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Manage Vehicles</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/profile/payment-methods")}
          >
            <Text style={styles.menuText}>Payment Methods</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Language</Text>
            <View style={styles.languageContainer}>
              <Text style={styles.languageText}>English</Text>
              <Text style={styles.arrow}>›</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Transactions</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* General Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General</Text>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>About us</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Privacy Policy</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Booking Management Software</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.menuItem, styles.logoutContainer]}>
            <Text style={[styles.menuText, styles.logoutText]}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerSection: {
    padding: 28, // Increased padding for more space around elements
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  headerContent: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    marginTop: 20, // Added gap below the profile elements
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 100,
    marginRight: 20, // Increased gap between avatar and text
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  profileTextContainer: {
    flex: 1, // Ensures text takes remaining space
  },
  greetingText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1C2526',
    marginBottom: 12, // Increased gap between greeting and phone number
  },
  phoneText: {
    fontSize: 20,
    color: '#616161',
  },
  statusSection: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  upgradeButton: {
    width: '100%', // Full width for the button
    backgroundColor: '#000000',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  upgradePrompt: {
    color: '#1E90FF',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    paddingVertical: 12,
    marginBottom: 16, // Added gap between text and button
  },
  upgradeLink: {
    textDecorationLine: 'underline',
  },
  section: {
    margin: 18,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#000000',
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 0,
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 20,
    marginBottom: 30,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'grey',
  },
  arrow: {
    fontSize: 24,
    color: '#666666',
  },
  languageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageText: {
    fontSize: 16,
    color: '#666666',
    marginRight: 8,
  },
  logoutContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoutText: {
    color: '#FF0000',
  },
});

export default Profile;