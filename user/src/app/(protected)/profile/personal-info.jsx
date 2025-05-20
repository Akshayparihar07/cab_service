import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import CustomButton from '../../../components/common/Button';
// import useHideHeader from '@/hooks/useHideHeader';

// Reusable RoleButton component
const RoleButton = ({ role, selectedRole, onSelect }) => {
  // useHideHeader(); // Custom hook to hide header
  return (
    <TouchableOpacity
      style={[
        styles.roleButton,
        role === selectedRole ? styles.roleButtonSelected : styles.roleButtonDefault
      ]}
      onPress={() => onSelect(role)}
    >
      <Text
        style={[
          styles.roleButtonText,
          role === selectedRole ? styles.roleButtonTextSelected : styles.roleButtonTextDefault
        ]}
      >
        {role}
      </Text>
    </TouchableOpacity>
  );
};

const PersonalInfoScreen = () => {
  // State for form fields
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Agent'); // Default role
  const [licenseNumber, setLicenseNumber] = useState('');
  const navigation = useNavigation();

  // List of available roles
  const roles = ['Agent', 'Owner', 'Driver'];

  // Handle role selection
  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
  };

  // Handle form submission (for the Update button)
  const handleUpdate = () => {
    console.log('Updated Info:', { name, location, companyName, email, role, licenseNumber });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.headerContainer, { elevation: 5 }]}>
            <Text style={styles.backText} onPress={() => navigation.goBack()}>
              Back
            </Text>
          </View>
          <View style={styles.content}>
            {/* Avatar */}
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: 'https://avatar.iran.liara.run/public/40' }}
                style={styles.avatar}
                resizeMode="cover"
              />
            </View>

            {/* Form Fields */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                value={name}
                onChangeText={setName}
                placeholder="Name"
                placeholderTextColor="#A9A9A9"
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                value={location}
                onChangeText={setLocation}
                placeholder="Location"
                placeholderTextColor="#A9A9A9"
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                value={companyName}
                onChangeText={setCompanyName}
                placeholder="Company Name"
                placeholderTextColor="#A9A9A9"
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                value={email}
                onChangeText={setEmail}
                placeholder="Email (Optional)"
                placeholderTextColor="#A9A9A9"
                keyboardType="email-address"
              />
            </View>

            {/* Role Selection */}
            <View style={styles.roleContainer}>
              {roles.map((roleItem) => (
                <RoleButton
                  key={roleItem}
                  role={roleItem}
                  selectedRole={role}
                  onSelect={handleRoleSelect}
                />
              ))}
            </View>

            <View style={styles.licenseInputContainer}>
              <TextInput
                style={styles.textInput}
                value={licenseNumber}
                onChangeText={setLicenseNumber}
                placeholder="License Number (Optional)"
                placeholderTextColor="#A9A9A9"
              />
            </View>

            {/* Update Button */}
            <CustomButton onPress={()=>alert('Personal Info Added')} title="Submit" />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6', // bg-gray-100
  },
  keyboardAvoidingView: {
    flex: 1, // flex-1
  },
  headerContainer: {
    backgroundColor: '#FFFFFF', // bg-white
    padding: 16, // p-4
  },
  backText: {
    fontSize: 16, // Default size for text
    color: '#1F2937', // text-gray-800 (assumed for consistency)
  },
  content: {
    padding: 20, // p-5
  },
  avatarContainer: {
    alignItems: 'center', // items-center
    marginBottom: 32, // mb-8
  },
  avatar: {
    width: 80, // w-20
    height: 80, // h-20
    borderRadius: 40, // rounded-full
  },
  inputContainer: {
    marginBottom: 24, // mb-6
  },
  textInput: {
    backgroundColor: '#FFFFFF', // bg-white
    borderRadius: 6, // rounded-md
    padding: 16, // p-4
    fontSize: 16, // text-base
    color: '#1F2937', // text-gray-800
    borderWidth: 1, // border
    borderColor: '#D1D5DB', // border-gray-300
  },
  roleContainer: {
    flexDirection: 'row', // flex-row
    justifyContent: 'space-between', // justify-between
    marginBottom: 24, // mb-6
  },
  roleButton: {
    flex: 1, // flex-1
    marginHorizontal: 2, // mx-1
    paddingVertical: 12, // py-3
    borderRadius: 6, // rounded-md
    borderWidth: 1, // border
    borderColor: '#D1D5DB', // border-gray-300
    alignItems: 'center', // To center text
  },
  roleButtonDefault: {
    backgroundColor: '#FFFFFF', // bg-white
  },
  roleButtonSelected: {
    backgroundColor: '#1F2937', // bg-gray-800
  },
  roleButtonText: {
    textAlign: 'center', // text-center
    fontWeight: 'bold', // font-bold
    fontSize: 16, // Implicit for button text
  },
  roleButtonTextDefault: {
    color: '#1F2937', // text-gray-800
  },
  roleButtonTextSelected: {
    color: '#FFFFFF', // text-white
  },
  licenseInputContainer: {
    marginBottom: 32, // mb-8
  },
  submitButton: {
    backgroundColor: '#10B981', // bg-green-500
    paddingVertical: 16, // py-4
    borderRadius: 6, // rounded-md
    marginTop: 16, // mt-4
    marginBottom: 40, // mb-10
    alignItems: 'center', // To center text
  },
  submitButtonText: {
    textAlign: 'center', // text-center
    color: '#FFFFFF', // text-white
    fontWeight: 'bold', // font-bold
    fontSize: 16, // text-base
  },
});

export default PersonalInfoScreen;