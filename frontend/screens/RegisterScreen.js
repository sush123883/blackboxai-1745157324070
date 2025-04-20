import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import api from '../services/api';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!name || (!email && !phone) || !password) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }
    try {
      const response = await api.post('/auth/register', { name, email, phone, password });
      if (response.data.token) {
        Alert.alert('Success', 'Registration successful');
        navigation.navigate('Login');
      }
    } catch (err) {
      Alert.alert('Error', err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput placeholder="Name" style={styles.input} value={name} onChangeText={setName} />
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput placeholder="Phone" style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <TextInput placeholder="Password" style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Register" onPress={handleRegister} />
      <Text style={styles.loginText} onPress={() => navigation.navigate('Login')}>
        Already have an account? Login
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
  loginText: { marginTop: 20, color: 'blue', textAlign: 'center' },
});
