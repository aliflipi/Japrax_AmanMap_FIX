import * as Location from 'expo-location';
import { Stack } from 'expo-router';
import { initializeApp } from "firebase/app";
import { getDatabase, push, ref } from "firebase/database";
import React, { useState } from 'react';
import { Alert, Button, Linking, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


const App = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [accuration, setAccuration] = useState('');

  // Get current location
  const getCoordinates = async () => {
    // Check if location services are enabled
    const servicesEnabled = await Location.hasServicesEnabledAsync();
    if (!servicesEnabled) {
      Alert.alert(
        'Location Services Disabled',
        'Please enable location services in your device settings to get current location.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: () => Linking.openSettings() }
        ]
      );
      return;
    }

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
      return;
    }

    try {
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      const coords = location.coords.latitude + ',' + location.coords.longitude;
      setLocation(coords);

      const accuracy = location.coords.accuracy;
      setAccuration(accuracy + ' m');
    } catch (error) {
      if (error && typeof error === 'object' && 'code' in error && error.code === 2) {
        Alert.alert('Location Unavailable', 'Location services may be disabled or GPS signal is weak. Please enable location services and try again in an open area.');
      } else {
        Alert.alert('Error', 'Unable to get current location. Please check your settings and try again.');
      }
      console.error('Location error:', error);
    }
  };

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyA7tRu7FVoKkFCCFf5S_n8Q5JvOGNQfz1U",
    authDomain: "reactnative2025-4c5af.firebaseapp.com",
    databaseURL: "https://reactnative2025-4c5af-default-rtdb.firebaseio.com",
    projectId: "reactnative2025-4c5af",
    storageBucket: "reactnative2025-4c5af.firebasestorage.app",
    messagingSenderId: "331173768729",
    appId: "1:331173768729:web:b5eaf6cd4f0fc6df8e0488"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);


  return (
    <SafeAreaProvider style={{ backgroundColor: 'white' }}>
      <SafeAreaView>
        <Stack.Screen options={{ title: 'Form Tambah Lokasi Kejahatan' }} />
        <Text style={styles.inputTitle}>Nama</Text>
        <TextInput
          style={styles.input}
          placeholder='Isikan nama objek'
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.inputTitle}>Koordinat</Text>
        <TextInput
          style={styles.input}
          placeholder="Isikan koordinat (contoh: -6.200000,106.816666)"
          value={location}
          onChangeText={setLocation}
        />
        <Text style={styles.inputTitle}>Accuration</Text>
        <TextInput
          style={styles.input}
          placeholder="Isikan accuration (contoh: 5 meter)"
          value={accuration}
          onChangeText={setAccuration}
        />
        <View style={styles.button}>
          <Button
            title="Get Current Location"
            onPress={getCoordinates}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Save"
            onPress={() => {
              const locationsRef = ref(db, 'points/');
              push(locationsRef, {
                name: name,
                coordinates: location,
                accuration: accuration,
              }).then(() => {
                //createOneButtonAlert();
                console.log("Berhasil menyimpan data ", locationsRef.key);
                // clear form
                setName('');
                setLocation('');
                setAccuration('');
              }).catch((e) => {
                console.error("Error adding document: ", e);
                Alert.alert("Error", "Gagal menyimpan data");
              });
            }}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};


const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  inputTitle: {
    marginLeft: 12,
    marginTop: 12,
    fontSize: 16,
    fontWeight: '600',
  },
  button: {
    margin: 12,
  }
});


export default App;