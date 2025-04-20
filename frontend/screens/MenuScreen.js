import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import api from '../services/api';

export default function MenuScreen({ navigation }) {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
  });

  const fetchMenuItems = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.vegetarian) params.vegetarian = 'true';
      if (filters.vegan) params.vegan = 'true';
      if (filters.glutenFree) params.glutenFree = 'true';
      if (search) params.search = search;

      const response = await api.get('/menu', { params });
      setMenuItems(response.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMenuItems();
  }, [filters, search]);

  const toggleFilter = (filterName) => {
    setFilters(prev => ({ ...prev, [filterName]: !prev[filterName] }));
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('ItemDetails', { itemId: item._id })}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text>{item.category} - ${item.price.toFixed(2)}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search menu items..."
        style={styles.searchInput}
        value={search}
        onChangeText={setSearch}
      />
      <View style={styles.filters}>
        <Text style={filters.vegetarian ? styles.filterActive : styles.filter} onPress={() => toggleFilter('vegetarian')}>Vegetarian</Text>
        <Text style={filters.vegan ? styles.filterActive : styles.filter} onPress={() => toggleFilter('vegan')}>Vegan</Text>
        <Text style={filters.glutenFree ? styles.filterActive : styles.filter} onPress={() => toggleFilter('glutenFree')}>Gluten-Free</Text>
      </View>
      {loading ? <ActivityIndicator size="large" /> : (
        <FlatList
          data={menuItems}
          keyExtractor={item => item._id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  searchInput: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 8, marginBottom: 10 },
  filters: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 },
  filter: { color: 'gray', padding: 5 },
  filterActive: { color: 'green', fontWeight: 'bold', padding: 5 },
  item: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee' },
  itemName: { fontSize: 16, fontWeight: 'bold' },
});
