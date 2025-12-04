import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { IconSymbol } from '../../components/ui/icon-symbol';

interface MarkerData {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
}

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyA7tRu7FVoKkFCCFf5S_n8Q5JvOGNQfz1U",
    authDomain: "reactnative2025-4c5af.firebaseapp.com",
    databaseURL: "https://reactnative2025-4c5af-default-rtdb.firebaseio.com",
    projectId: "reactnative2025-4c5af",
    storageBucket: "reactnative2025-4c5af.firebasestorage.app",
    messagingSenderId: "331173768729",
    appId: "1:331173768729:web:b5eaf6cd4f0fc6df8e0488"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default function MapScreen() {
    const [markers, setMarkers] = useState<MarkerData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const pointsRef = ref(db, 'points/');

        const unsubscribe = onValue(pointsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const parsedMarkers: MarkerData[] = Object.keys(data)
                    .map(key => {
                        const point = data[key];
                        if (typeof point.coordinates !== 'string' || point.coordinates.trim() === '') {
                            return null;
                        }
                        const [latitude, longitude] = point.coordinates.split(',').map(Number);

                        if (isNaN(latitude) || isNaN(longitude)) {
                            console.warn(`Invalid coordinates for point ${key}:`, point.coordinates);
                            return null;
                        }

                        return {
                            id: key,
                            name: point.name,
                            latitude,
                            longitude,
                        };
                    })
                    .filter((marker): marker is MarkerData => marker !== null);

                setMarkers(parsedMarkers);
            } else {
                setMarkers([]);
            }
            setLoading(false);
        }, (error) => {
            console.error(error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
                <Text>Loading map data...</Text>
            </View>
        );
    }


    // 5 titik rawan bencana
    const disasterPoints = [
        { name: "Dok 9", latitude: -2.518047568877454, longitude: 140.73190118331715 },
        { name: "Jl. Pipa", latitude: -2.554540619402154, longitude: 140.71281725419166 },
        { name: "Jl Tasangkapura", latitude: -2.559872242257198, longitude: 140.70761868264438 },
        { name: "pych", latitude: -2.6009389372730256, longitude: 140.68441457168936 },
        { name: "jl. tobati holtekamp", latitude: -2.6118481616396383, longitude: 140.72537411009398 }
    ];

    // 5 titik pos polisi
    const policePoints = [
        { name: "Pos Polisi Sylen", latitude: -2.59649833269542, longitude: 140.6873104269831 },
        { name: "Pos Polisi Holtekam", latitude: -2.6290703614550415, longitude: 140.77611749577378 },
        { name: "Polsek Jayapura Utara", latitude: -2.521899439059084, longitude: 140.72466331279406 },
        { name: "Pos Polisi", latitude: -2.546743454582855, longitude: 140.71332569484758 },
        { name: "Polsek Jayapura Selatan", latitude: -2.567311496585304, longitude: 140.69739146013578 }
    ];

    // 4 titik rumah sakit (warna merah)
    const hospitalPoints = [
        { name: "RSUD Dok 2", latitude: -2.5349581874818865, longitude: 140.70999543447118 },
        { name: "RS Angkatan Laut", latitude: -2.5682602362431246, longitude: 140.71018778629477 },
        { name: "RS Bhayangkara", latitude: -2.591029578402751, longitude: 140.67458601349153 },
        { name: "RS Ramela", latitude: -2.652429570529794, longitude: 140.80538338042916 }
    ];

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: -2.55,
                    longitude: 140.71,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}
                zoomControlEnabled={true}
            >
                {/* Firebase Markers */}
                {markers.map(marker => (
                    <Marker
                        key={marker.id}
                        coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                        title={marker.name}
                        description={`Coords: ${marker.latitude}, ${marker.longitude}`}
                    />
                ))}

                {/* Disaster Markers - Yellow */}
                {disasterPoints.map((point, index) => (
                    <Marker
                        key={`disaster-${index}`}
                        coordinate={{ latitude: point.latitude, longitude: point.longitude }}
                        title={point.name}
                        pinColor="gold"
                    />
                ))}

                {/* Police Markers */}
                {policePoints.map((point, index) => (
                    <Marker
                        key={`police-${index}`}
                        coordinate={{ latitude: point.latitude, longitude: point.longitude }}
                        title={`Pos Polisi: ${point.name}`}
                    >
                        <IconSymbol name="police" size={22} color="#6bc1f3ff" />
                    </Marker>
                ))}

                {/* Hospital Markers - Red */}
                {hospitalPoints.map((point, index) => (
                    <Marker
                        key={`hospital-${index}`}
                        coordinate={{ latitude: point.latitude, longitude: point.longitude }}
                        title={point.name}
                    >
                        <IconSymbol name="hospital" size={22} color="#f71caeff" />
                    </Marker>
                ))}

            </MapView>

            <TouchableOpacity style={styles.fab} onPress={() => router.push('/forminputlocation')}>
                <FontAwesome name="plus" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    fab: {
        position: 'absolute',
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        left: 20,
        bottom: 20,
        backgroundColor: '#0275d8',
        borderRadius: 30,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
});
