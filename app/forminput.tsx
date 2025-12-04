import { Stack } from 'expo-router';
import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const TextInputExample = () => {
  const [text, onChangeText] = React.useState('Isikan Nama');
  const [number, onChangeNumber] = React.useState('');
  const [kelas, onChangeKelas] = React.useState('');

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Stack.Screen options={{ title: 'Form Input Mahasiswa' }} />
        <Text style={styles.inputTittle} >NAMA</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder='Nama'
        />
        <Text style={styles.inputTittle} >NIM</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="Nomor Induk"
          keyboardType="numeric"
        />
        <Text style={styles.inputTittle} >Kelas</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeKelas}
          value={kelas}
          placeholder="Kelas"
        />

        <View style={styles.button}>
            <Button
              title="SAVE"
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
    borderRadius: 8,
  },
  inputTittle: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '600',
    marginTop: 15,
  },
  button: {
    margin: 12,
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',  
    backgroundColor: '#2196F3',
  },
});

export default TextInputExample;