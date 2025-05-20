import { Feather, MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/common/Button';

export default function Home() {
  const router = useRouter();
  const [tripType, setTripType] = useState('one way');
  const [date, setDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [locations, setLocations] = useState([
    { type: 'Source', value: '' },
    { type: 'Destination', value: '' },
  ]);
  const [numberOfPeople, setNumberOfPeople] = useState('');

  // Function to format date input to DD-MM-YYYY
  const formatDateInput = (text, isReturnDate = false) => {
    const cleaned = text.replace(/\D/g, '');
    let formatted = '';
    if (cleaned.length > 0) {
      formatted += cleaned.substring(0, 2);
      if (cleaned.length >= 3) {
        formatted += '-' + cleaned.substring(2, 4);
      }
      if (cleaned.length >= 5) {
        formatted += '-' + cleaned.substring(4, 8);
      }
    }
    if (isReturnDate) {
      setReturnDate(formatted);
    } else {
      setDate(formatted);
    }
  };

  // Function to update a location
  const updateLocation = (text, index) => {
    const updatedLocations = [...locations];
    updatedLocations[index].value = text;
    setLocations(updatedLocations);
  };

  // Function to remove an intermediate stop
  const removeIntermediateStop = (index) => {
    setLocations(locations.filter((_, i) => i !== index));
  };

  // Function to navigate to AddStop screen with callback
  const handleAddStop = () => {
    router.push({
      pathname: '/addstop',
      params: {
        onAddStop: (newStops) => {
          const intermediateStops = newStops.map((stop) => ({
            type: 'Intermediate Stop',
            value: stop,
          }));
          setLocations([
            locations[0],
            ...intermediateStops,
            locations[locations.length - 1],
          ]);
        },
      },
    });
  };

  // Function to validate and handle Search Cabs
  const handleSearchCabs = () => {
    if (!locations[0].value.trim()) {
      Alert.alert('Error', 'Please enter a source location.');
      return;
    }
    if (!locations[locations.length - 1].value.trim()) {
      Alert.alert('Error', 'Please enter a destination location.');
      return;
    }
    console.log('Search Cabs button pressed', { tripType, locations, date, returnDate, numberOfPeople });
    // Example navigation: router.push('/search-results');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Map View (Background) */}
      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapText}>Map View (Placeholder)</Text>
        </View>
      </View>

      {/* Trip Planning Section */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.addLocationsContainer}>
          <Text style={styles.sectionTitle}>Plan Your Trip</Text>

          {/* Trip Type Picker */}
          <View style={styles.inputContainer}>
            <MaterialIcons name="directions" size={16} color="#000000" style={styles.icon} />
            <Picker
              selectedValue={tripType}
              onValueChange={(itemValue) => setTripType(itemValue)}
              style={styles.picker}
              itemStyle={styles.pickerItem}
            >
              <Picker.Item label="One Way" value="one way" />
              <Picker.Item label="Round Trip" value="round" />
            </Picker>
          </View>

          {/* Source, Destination, and Plus Icon */}
          <View style={styles.locationContainer}>
            <View style={styles.locationInputsWrapper}>
              {/* Source Input */}
              <View style={styles.locationInput}>
                <MaterialIcons name="my-location" size={16} color="#000000" style={styles.icon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Source"
                  placeholderTextColor="#9CA3AF"
                  value={locations[0].value}
                  onChangeText={(text) => updateLocation(text, 0)}
                />
              </View>

              {/* Destination Input */}
              <View style={styles.locationInput}>
                <MaterialIcons name="location-on" size={16} color="#000000" style={styles.icon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Destination"
                  placeholderTextColor="#9CA3AF"
                  value={locations[locations.length - 1].value}
                  onChangeText={(text) => updateLocation(text, locations.length - 1)}
                />
              </View>
            </View>

            <View style={styles.plusButtonWrapper}>
              <TouchableOpacity style={styles.plusButton} onPress={handleAddStop}>
                <Feather name="plus" size={24} color="#000000" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Intermediate Stops */}
          {locations.slice(1, -1).map((location, index) => (
            <View key={index + 1} style={styles.inputContainer}>
              <MaterialIcons name="stop-circle" size={16} color="#000000" style={styles.icon} />
              <TextInput
                style={styles.textInput}
                placeholder="Intermediate Stop"
                placeholderTextColor="#9CA3AF"
                value={location.value}
                onChangeText={(text) => updateLocation(text, index + 1)}
              />
              <TouchableOpacity onPress={() => removeIntermediateStop(index + 1)}>
                <Feather name="x" size={24} color="#000000" />
              </TouchableOpacity>
            </View>
          ))}

          {/* Date Field */}
          <View style={styles.inputContainer}>
            <MaterialIcons name="calendar-today" size={16} color="#000000" style={styles.icon} />
            <TextInput
              style={styles.textInput}
              placeholder="Date (DD-MM-YYYY)"
              placeholderTextColor="#9CA3AF"
              value={date}
              onChangeText={(text) => formatDateInput(text)}
              keyboardType="numeric"
              maxLength={10}
            />
          </View>

          {/* Return Date Field (Visible Only for Round Trip) */}
          {tripType === 'round' && (
            <View style={styles.inputContainer}>
              <MaterialIcons name="event" size={16} color="#000000" style={styles.icon} />
              <TextInput
                style={styles.textInput}
                placeholder="Return Date (DD-MM-YYYY)"
                placeholderTextColor="#9CA3AF"
                value={returnDate}
                onChangeText={(text) => formatDateInput(text, true)}
                keyboardType="numeric"
                maxLength={10}
              />
            </View>
          )}

          {/* Number of People */}
          <View style={styles.inputContainer}>
            <MaterialIcons name="person" size={16} color="#000000" style={styles.icon} />
            <Picker
              selectedValue={numberOfPeople}
              onValueChange={(itemValue) => setNumberOfPeople(itemValue)}
              style={styles.picker}
              itemStyle={styles.pickerItem}
            >
              <Picker.Item label="Select Number of Passengers" value="" color="#9CA3AF" />
              {[...Array(8)].map((_, index) => (
                <Picker.Item key={index + 1} label={`${index + 1}`} value={`${index + 1}`} />
              ))}
            </Picker>
          </View>

          {/* Search Cabs Button */}
          <CustomButton onPress={handleSearchCabs} title="Search" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapPlaceholder: {
    flex: 1,
    width: '100%',
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    color: '#6B7280',
    fontSize: 18,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  addLocationsContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 20,
  },
  locationContainer: {
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationInputsWrapper: {
    flex: 1,
    flexDirection: 'column',
    marginRight: 20,
  },
  locationInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 10,
  },
  icon: {
    marginRight: 10,
  },
  plusButtonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    color: '#000000',
    fontSize: 16,
    padding: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 10,
  },
  picker: {
    flex: 1,
    color: '#000000',
    backgroundColor: '#F3F4F6',
  },
  pickerItem: {
    color: '#000000',
    backgroundColor: '#F3F4F6',
  },
});