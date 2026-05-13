import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useDb } from '../../context/DbContext';

export default function ProduitsScreen() {
  const router = useRouter();
  const db = useSQLiteContext();
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);

  const { changeEffect } = useDb()
  useEffect(() => { chargerProduits(); }, [changeEffect]);

  const chargerProduits = async () => {
    const rows = await db.getAllAsync('SELECT * FROM Produit');
    setProduits(rows);
    setLoading(false);
  };

  if (loading) {
    return <View style={styles.loading}><ActivityIndicator size="large" color="#2d5a27" /></View>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🏡 Nos Nains de Jardin</Text>
        <Text style={styles.subtitle}>{produits.length} produits disponibles</Text>
      </View>
      <FlatList
        data={produits}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
            onPress={() => router.push('/produit/' + item.id)}
          >
            <Image source={{ uri: item.image }} style={styles.thumbnail} resizeMode="cover" />
            <View style={styles.cardInfo}>
              <Text style={styles.productName}>{item.nom}</Text>
              <Text style={styles.productPrice}>{item.prix} $</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </Pressable>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f7ee' },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { backgroundColor: '#2d5a27', padding: 20, paddingBottom: 16 },
  title: { fontSize: 22, fontWeight: '800', color: '#fff' },
  subtitle: { color: '#a8d5a2', fontSize: 13, marginTop: 2 },
  list: { padding: 16 },
  card: {
    backgroundColor: '#fff', borderRadius: 14, flexDirection: 'row',
    alignItems: 'center', padding: 12, elevation: 2,
  },
  cardPressed: { opacity: 0.85 },
  thumbnail: { width: 70, height: 70, borderRadius: 10, backgroundColor: '#e8f5e9' },
  cardInfo: { flex: 1, marginLeft: 14 },
  productName: { fontSize: 16, fontWeight: '700', color: '#222' },
  productPrice: { fontSize: 15, color: '#2d5a27', fontWeight: '600', marginTop: 4 },
  arrow: { fontSize: 24, color: '#bbb', paddingLeft: 8 },
});
