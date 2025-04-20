import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert } from 'react-native';

export default function CartScreen({ navigation }) {
  const [cartItems, setCartItems] = useState([]);

  // For demonstration, cart is empty. In a real app, cart state would be managed globally or via context.

  const handleCheckout = () => {
    Alert.alert('Checkout', 'Checkout functionality to be implemented.');
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text>Quantity: {item.quantity}</Text>
      <Text>Price: ${item.price.toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty.</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />
          <Button title="Checkout" onPress={handleCheckout} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  emptyText: { textAlign: 'center', marginTop: 50, fontSize: 18 },
  item: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  itemName: { fontWeight: 'bold' },
});
