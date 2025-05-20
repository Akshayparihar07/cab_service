import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import { useState } from 'react';
import CustomButton from '../../../components/common/Button';

// Reusable PaymentMethodButton component using TouchableOpacity
const PaymentMethodButton = ({ method, selectedMethod, onSelect }) => {
  return (
    <TouchableOpacity
      style={[
        styles.paymentMethodButton,
        method === selectedMethod ? styles.paymentMethodButtonSelected : styles.paymentMethodButtonDefault
      ]}
      onPress={() => onSelect(method)}
    >
      <Text
        style={[
          styles.paymentMethodText,
          method === selectedMethod ? styles.paymentMethodTextSelected : styles.paymentMethodTextDefault
        ]}
      >
        {method}
      </Text>
    </TouchableOpacity>
  );
};

const PaymentMethods = () => {
  // State for payment method and input
  const [paymentMethod, setPaymentMethod] = useState('UPI'); // Default payment method
  const [paymentDetail, setPaymentDetail] = useState('');

  // List of available payment methods
  const methods = ['UPI', 'BANK DETAILS'];

  // Handle payment method selection
  const handleMethodSelect = (selectedMethod) => {
    setPaymentMethod(selectedMethod);
    setPaymentDetail(''); // Reset input when switching methods
  };

  // Handle form submission (for the Update button)
  const handleUpdate = () => {
    console.log('Updated Payment Method:', { paymentMethod, paymentDetail });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Instruction Text */}
        <Text style={styles.instructionText}>
          Please select your payment method
        </Text>

        {/* Payment Method Selection */}
        <View style={styles.paymentMethodContainer}>
          {methods.map((method) => (
            <PaymentMethodButton
              key={method}
              method={method}
              selectedMethod={paymentMethod}
              onSelect={handleMethodSelect}
            />
          ))}
        </View>

        {/* Input Field */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={paymentDetail}
            onChangeText={setPaymentDetail}
            placeholder={paymentMethod === 'UPI' ? 'Enter UPI ID' : 'Enter Bank Details'}
            placeholderTextColor="#A9A9A9"
          />
        </View>

        {/* Description Text */}
        <Text style={styles.descriptionText}>
          Please enter required details. You will receive your commission in the
          same once booking has been ended.
        </Text>

        {/* Update Button */}
        <CustomButton
          title="SUBMIT"
          onPress={handleUpdate}
          style={styles.submitButton}
          textStyle={styles.submitButtonText}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6', // bg-gray-100
  },
  content: {
    padding: 20,
  },
  instructionText: {
    fontSize: 18,
    fontWeight: 600,
    color: '#1F2937',
    margin: 32,
    paddingBottom: 20
  },
  paymentMethodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32, // Kept increased gap
  },
  paymentMethodButton: {
    flex: 1,
    marginHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    alignItems: 'center',
  },
  paymentMethodButtonDefault: {
    backgroundColor: '#FFFFFF',
  },
  paymentMethodButtonSelected: {
    backgroundColor: '#1F2937',
  },
  paymentMethodText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  paymentMethodTextDefault: {
    color: '#1F2937',
  },
  paymentMethodTextSelected: {
    color: '#FFFFFF',
  },
  inputContainer: {
    marginBottom: 32, // Kept increased gap
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    padding: 16,
    fontSize: 16,
    color: '#1F2937',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  descriptionText: {
    fontSize: 14,
    color: '#1E40AF',
    marginBottom: 40, // Kept increased gap
  },
  submitButton: {
    backgroundColor: '#10B981',
    paddingVertical: 16,
    borderRadius: 6,
    marginTop: 24, // Kept increased gap
  },
  submitButtonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default PaymentMethods;