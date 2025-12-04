import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { hospitalPoints, policePoints } from '@/constants/locations';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useRouter } from 'expo-router';
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, remove } from 'firebase/database';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Linking, RefreshControl, SectionList, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function LokasiScreen() {
    const [sections, setSections] = useState<{ title: string; data: any[] }[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

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

    const handlePress = (coordinates: string) => {
        const [latitude, longitude] = coordinates.split(',').map((coord: string) => coord.trim());
        const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
        Linking.openURL(url);
    };

    // if running on ios or android platform
    const handleDelete = (id) => {
        Alert.alert(
            "Hapus Lokasi",
            "Apakah Anda yakin ingin menghapus lokasi ini?",
            [
                {
                    text: "Batal",
                    style: "cancel"
                },
                {
                    text: "Hapus",
                    onPress: () => {
                        const pointRef = ref(db, `points/${id}`);
                        remove(pointRef);
                    },
                    style: "destructive"
                }
            ]
        );
    }

    useEffect(() => {
        const pointsRef = ref(db, 'points/');

        // Listen for data changes
        const unsubscribe = onValue(pointsRef, (snapshot) => {
            const data = snapshot.val();
            let firebasePoints = [];
            if (data) {
                // Transform the Firebase object into an array
                firebasePoints = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));
            }

            const staticPolicePoints = policePoints.map(p => ({ ...p, coordinates: p.coords.join(', ') }));
            const staticHospitalPoints = hospitalPoints.map(h => ({ ...h, coordinates: h.coords.join(', ') }));

            const allSections = [
                { title: 'Lokasi Tersimpan', data: firebasePoints },
                { title: 'Pos Polisi Terdekat', data: staticPolicePoints },
                { title: 'Rumah Sakit Terdekat', data: staticHospitalPoints }
            ];

            setSections(allSections.filter(section => section.data.length > 0));
            setLoading(false);
        }, (error) => {
            console.error(error);
            setLoading(false);
        });


        // Cleanup listener on component unmount
        return () => unsubscribe();
    }, []);


    const onRefresh = useCallback(() => {
        setRefreshing(true);
        // Since Firebase provides real-time data, we can simulate a refresh
        // for UX purposes. A real data refetch isn't strictly necessary unless
        // you want to force a re-read from the server.
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);


    if (loading) {
        return (
            <ThemedView style={styles.container}>
                <ActivityIndicator size="large" />
            </ThemedView>
        );
    }

    // get route from useRouter
    const router = useRouter();

    // Navigate to form edit screen
    const handleEdit = (item) => {
        router.push({
            pathname: "/formeditlocation",
            params: {
                id: item.id,
                name: item.name,
                coordinates: item.coordinates,
                accuration: item.accuration || ''
            }
        });
    };

    return (
        <View style={styles.container}>
            {sections.length > 0 ? (
                <SectionList
                    sections={sections}
                    keyExtractor={(item, index) => item.id || `${item.name}-${index}`}
                    renderItem={({ item }) => (
                        <View style={styles.itemRow}>
                            <TouchableOpacity
                                style={styles.itemContent}
                                onPress={() => handlePress(item.coordinates)}
                            >
                                <ThemedText style={styles.itemName}>{item.name}</ThemedText>
                                <ThemedText style={styles.coordinates}>{item.coordinates}</ThemedText>

                                {item.accuration && (
                                    <ThemedText style={styles.accuracy}>
                                        Akurasi: {item.accuration}
                                    </ThemedText>
                                )}
                            </TouchableOpacity>
                            
                            {item.id && ( // Conditionally render buttons
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity
                                        style={styles.deleteButton}
                                        onPress={() => handleEdit(item)}
                                    >
                                        <FontAwesome5 name="pencil-alt" size={24} color="orange" />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => handleDelete(item.id)}
                                        style={styles.deleteButton}
                                    >
                                        <FontAwesome5 name="trash" size={20} color="#d11a2a" />
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    )}

                    renderSectionHeader={({ section: { title } }) => (
                        <ThemedText style={styles.header}>{title}</ThemedText>
                    )}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                />
            ) : (
                <View style={styles.emptyContainer}>
                    <ThemedText style={styles.emptyText}>Tidak ada data lokasi tersimpan.</ThemedText>
                </View>
            )}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    item: {
        backgroundColor: '#ffffff',
        padding: 20,
        marginVertical: 4,
        marginHorizontal: 16,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 8,
    },
    coordinates: {
        fontSize: 14,
        color: '#666666',
        fontFamily: 'monospace',
    },
    accuracy: {
        fontSize: 12,
        color: '#888888',
        marginTop: 4,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#2232bbff',
        color: '#ffffff',
        padding: 20,
        textAlign: 'center',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyText: {
        fontSize: 18,
        color: '#666666',
        textAlign: 'center',
    },

    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        marginVertical: 4,
        marginHorizontal: 16,
        borderRadius: 12,
        paddingRight: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },

    itemContent: {
        flex: 1,
        padding: 20,
    },

    deleteButton: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }


});
