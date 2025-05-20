import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import CustomButton from '../components/common/Button';

export default function AddStop() {
  const navigation = useNavigation();
  const route = useRoute();
  const { onAddStop } = route.params; // Callback to pass the new stops back to Home
  const [stops, setStops] = useState(['']); // Initial stop input

  // Function to add a new stop input field
  const addStopField = () => {
    if (stops.length < 3) {
      setStops([...stops, '']);
    }
  };

  // Function to update a stop
  const updateStop = (text, index) => {
    const updatedStops = [...stops];
    updatedStops[index] = text;
    setStops(updatedStops);
  };

  // Function to remove a stop
  const removeStop = (index) => {
    setStops(stops.filter((_, i) => i !== index));
  };

  // Function to handle "Done" button press
  const handleDone = () => {
    // Filter out empty stops
    const validStops = stops.filter((stop) => stop.trim() !== '');
    if (validStops.length > 0) {
      onAddStop(validStops); // Pass all valid stops back to Home
    }
    navigation.goBack();
  };

  // Function to handle "Cancel" action
  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Simulated Map View (Placeholder) */}
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapText}>Map View (Placeholder)</Text>
        </View>

        {/* Add Stops Section */}
        <View style={styles.addStopContainer}>
          <Text style={styles.sectionTitle}>Add Stops</Text>

          {stops.map((stop, index) => (
            <View key={index} style={styles.stopInputContainer}>
              <MaterialIcons name="stop-circle" size={16} color="#000000" style={styles.icon} />
              <TextInput
                style={styles.textInput}
                placeholder="Pick up location"
                placeholderTextColor="#9CA3AF"
                value={stop}
                onChangeText={(text) => updateStop(text, index)}
              />
              {stops.length > 1 && (
                <TouchableOpacity onPress={() => removeStop(index)}>
                  <Feather name="x" size={24} color="#000000" />
                </TouchableOpacity>
              )}
            </View>
          ))}

          {stops.length < 3 && (
            <TouchableOpacity style={styles.addStopButton} onPress={addStopField}>
              <Text style={styles.addStopText}>Add stop</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Done Button and Cancel Text */}
        <View style={styles.buttonContainer}>
          <CustomButton onPress={handleDone} title="Done" />
          <TouchableOpacity onPress={handleCancel}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
  },
  mapPlaceholder: {
    flex: 2,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    color: '#6B7280',
    fontSize: 18,
  },
  addStopContainer: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 20,
  },
  stopInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 10,
  },
  icon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    color: '#000000',
    fontSize: 16,
    padding: 4,
  },
  addStopButton: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
  },
  addStopText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '500',
  },
  buttonContainer: {
    padding: 20,
    alignItems: 'center',
  },
  cancelText: {
    color: '#FF0000',
    fontSize: 16,
    marginTop: 10,
  },
});