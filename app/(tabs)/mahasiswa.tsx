import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Ionicons } from "@expo/vector-icons";
import React from 'react';
import { FlatList, Linking, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function CallCenterScreen() {
  const callCenters = [
    {
      category: "Call Center Kota Jayapura (150 212)",
      description: "Pelayanan darurat & aduan publik (07.00 – 22.00 WIT)",
      numbers: ["150212"],
      services: [
        "BPBD", "SATPOL PP", "DAMKAR", "DINKES",
        "DLHK", "PUPR", "DISKOMINFO"
      ]
    },
    {
      category: "RSUD Dok 2",
      numbers: ["0967533781"]
    },
    {
      category: "RS Provita",
      numbers: ["09675162888"]
    },
    {
      category: "Angkatan Laut",
      numbers: ["082398666966"]
    },
    {
      category: "Polsek Jayapura Utara",
      numbers: ["081247360335"]
    },
    {
      category: "Polsek Jayapura Selatan",
      numbers: ["081247360336"]
    },
    {
      category: "Polsek KPL Jayapura",
      numbers: ["081247360337"]
    },
    {
      category: "Polsek Abepura",
      numbers: ["085228484671"]
    },
    {
      category: "Polsek Heram",
      numbers: ["082127239045"]
    },
    {
      category: "Polsek Muara Tami",
      numbers: ["081247360339"]
    }
  ];

  const callNumber = (num: string) => {
    Linking.openURL(`tel:${num}`);
  };

  const renderItem = ({ item }: any) => (
    <ThemedView style={styles.card}>
      <ThemedText type="subtitle" style={styles.title}>{item.category}</ThemedText>
      
      {item.description && (
        <ThemedText style={styles.description}>{item.description}</ThemedText>
      )}

      {item.services && (
        <View style={styles.serviceContainer}>
          {item.services.map((s, idx) => (
            <ThemedText key={idx} style={styles.serviceItem}>• {s}</ThemedText>
          ))}
        </View>
      )}

      {item.numbers.map((num: string, idx: number) => (
        <TouchableOpacity key={idx} style={styles.callButton} onPress={() => callNumber(num)}>
          <Ionicons name="call" size={18} style={styles.icon} />
          <ThemedText style={styles.callText}>{num}</ThemedText>
        </TouchableOpacity>
      ))}
    </ThemedView>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.mainTitle}>Call Center Darurat Jayapura</ThemedText>

      <FlatList
        data={callCenters}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  mainTitle: {
    textAlign: "center",
    marginBottom: 20
  },
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#ddd"
  },
  title: {
    fontWeight: "bold",
    marginBottom: 6
  },
  description: {
    marginBottom: 8,
    fontSize: 13
  },
  serviceContainer: {
    marginBottom: 8
  },
  serviceItem: {
    fontSize: 13
  },
  callButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E40AF",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 6
  },
  callText: {
    color: "white",
    fontWeight: "bold"
  },
  icon: {
    color: "white",
    marginRight: 8
  }
});
