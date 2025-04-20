import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import api from '../services/api';

export default function ItemDetailsScreen({ route, navigation }) {
  const { itemId } = route.params;
  const [item, setItem] = useState(null);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await api.get(`/menu/${itemId}`);
        setItem(response.data);
        if (response.data.customizationOptions?.sizes?.length > 0) {
          setSelectedSize(response.data.customizationOptions.sizes[0]);
        }
      } catch (err) {
        Alert.alert('Error', 'Failed to load item details');
      }
    };
    fetchItem();
  }, [itemId]);

  const toggleTopping = (topping) => {
    setSelectedToppings(prev => {
      if (prev.includes(topping)) {
        return prev.filter(t => t !== topping);
      } else {
        return [...prev, topping];
      }
    });
  };

  const handleAddToCart = () => {
    // For now, just alert. Cart functionality to be implemented.
    Alert.alert('Added to Cart', `${item.name} added to cart with size ${selectedSize} and toppings ${selectedToppings.join(', ')}`);
    navigation.navigate('Menu');
  };

  if (!item) {
    return <Text style={styles.loading}>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.category}>{item.category}</Text>
      <Text style={styles.description}>{item.description}</Text>

      <Text style={styles.sectionTitle}>Ingredients:</Text>
      <Text>{item.ingredients.join(', ')}</Text>

      <Text style={styles.sectionTitle}>Nutritional Information:</Text>
      <Text>Calories: {item.nutritionalInfo?.calories || 'N/A'}</Text>
      <Text>Fat: {item.nutritionalInfo?.fat || 'N/A'}g</Text>
      <Text>Carbs: {item.nutritionalInfo?.carbs || 'N/A'}g</Text>
      <Text>Protein: {item.nutritionalInfo?.protein || 'N/A'}g</Text>

      <Text style={styles.sectionTitle}>Price: ${item.price.toFixed(2)}</Text>

      {item.customizationOptions?.sizes?.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Select Size:</Text>
          <View style={styles.optionsContainer}>
            {item.customizationOptions.sizes.map(size => (
              <TouchableOpacity
                key={size}
                style={[styles.optionButton, selectedSize === size && styles.optionButtonSelected]}
                onPress={() => setSelectedSize(size)}
              >
                <Text style={selectedSize === size ? styles.optionTextSelected : styles.optionText}>{size}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      {item.customizationOptions?.toppings?.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Select Toppings:</Text>
          <View style={styles.optionsContainer}>
            {item.customizationOptions.toppings.map(topping => (
              <TouchableOpacity
                key={topping}
                style={[styles.optionButton, selectedToppings.includes(topping) && styles.optionButtonSelected]}
                onPress={() => toggleTopping(topping)}
              >
                <Text style={selectedToppings.includes(topping) ? styles.optionTextSelected : styles.optionText}>{topping}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      <Button title="Add to Cart" onPress={handleAddToCart} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  loading: { flex: 1, textAlign: 'center', marginTop: 50 },
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 5 },
  category: { fontSize: 16, fontStyle: 'italic', marginBottom: 10 },
  description: { marginBottom: 15 },
  sectionTitle: { fontWeight: 'bold', marginTop: 15, marginBottom: 5 },
  optionsContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 15 },
  optionButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginRight: 10,
    marginBottom: 10,
  },
  optionButtonSelected: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  optionText: { color: '#000' },
  optionTextSelected: { color: '#fff' },
});
