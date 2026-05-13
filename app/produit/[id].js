import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSQLiteContext } from 'expo-sqlite';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useDb } from '../../context/DbContext';

export default function ProduitDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const db = useSQLiteContext();
  const { ajouterAuPanier, items } = useCart();
  const { user } = useAuth();
  const { markChanged } = useDb();
  const [produit, setProduit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [action, setAction] = useState(false);

  useEffect(() => { chargerProduit(); }, [id]);

  const chargerProduit = async () => {
    const row = await db.getFirstAsync('SELECT * FROM Produit WHERE id = ?', Number(id));
    setProduit(row);
    setLoading(false);
  };

  if (loading) return <View style={styles.loading}><ActivityIndicator size="large" color="#2d5a27" /></View>;

  if (!produit) {
    return (
      <View style={styles.error}>
        <Text style={styles.errorText}>Produit introuvable.</Text>
        <TouchableOpacity onPress={() => router.back()}>
         <Text style={styles.back}>← Retour</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const quantiteDansPanier = items.find((i) => i.produit.id === produit.id) ? items.find((i) => i.produit.id === produit.id).quantite : 0;

  const handleAjouter = () => {
    ajouterAuPanier(produit);
    setAjoute(true);
    setTimeout(() => setAjoute(false), 1500);
  };

  const onExit = () => {
    if (user.admin && action) {
      db.runSync('delete from Produit where id = ?', produit.id); // sync ensures the list never gets a deleted item
      markChanged()
    }
    router.back()
  }

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={onExit} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.navTitle} numberOfLines={1}>{produit.nom}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <Image source={{ uri: produit.image }} style={styles.image} resizeMode="cover" />
        <View style={styles.content}>
          <View style={styles.titleRow}>
            <Text style={styles.nom}>{produit.nom}</Text>
            <Text style={styles.prix}>{produit.prix} $</Text>
          </View>
          <View style={styles.divider} />
          <Text style={styles.descriptionLabel}>Description</Text>
          <Text style={styles.description}>{produit.description}</Text>
          {quantiteDansPanier > 0 && (
            <View style={styles.inCartBadge}>
              <Text style={styles.inCartText}>{quantiteDansPanier} déjà dans votre panier</Text>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        {user.admin ? (
          <TouchableOpacity
            style={[styles.btn, action ? styles.delBtnDanger : styles.delBtn]}
            onPress={() => setAction(!action)}
            activeOpacity={0.85}
          >
            <Text style={styles.btnText}>{action ? "☑ 🗑︎ Supprimer" : "☐ 🗑︎ Supprimer"}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.btn, action ? styles.addBtnSuccess : styles.addBtn]}
            onPress={handleAjouter}
            activeOpacity={0.85}
          >
            <Text style={styles.btnText}>{action ? '✓ Ajouté !' : '🛒 Ajouter au panier'}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f7ee' },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  navBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#2d5a27', paddingTop: 48, paddingBottom: 12, paddingHorizontal: 12 },
  backBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  navTitle: { flex: 1, color: '#fff', fontSize: 17, fontWeight: '700', textAlign: 'center' },
  scroll: { paddingBottom: 100 },
  image: { width: '100%', height: 280, backgroundColor: '#e8f5e9' },
  content: { padding: 20 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  nom: { fontSize: 24, fontWeight: '800', color: '#1a1a1a', flex: 1, marginRight: 12 },
  prix: { fontSize: 26, fontWeight: '800', color: '#2d5a27' },
  divider: { height: 1, backgroundColor: '#d4edda', marginBottom: 16 },
  descriptionLabel: { fontSize: 13, fontWeight: '700', color: '#888', textTransform: 'uppercase', marginBottom: 8 },
  description: { fontSize: 16, color: '#444', lineHeight: 24 },
  inCartBadge: { backgroundColor: '#e8f5e9', borderRadius: 10, padding: 10, marginTop: 20, borderWidth: 1, borderColor: '#c8e6c9' },
  inCartText: { color: '#2d5a27', fontSize: 14, fontWeight: '600', textAlign: 'center' },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#fff', padding: 16, borderTopWidth: 1, borderTopColor: '#e0e0e0' },
  btn: { borderRadius: 12, padding: 16, alignItems: 'center' },
  addBtn: { backgroundColor: '#2d5a27', },
  addBtnSuccess: { backgroundColor: '#27ae60' },
  delBtn: { backgroundColor: "#8b1e1e" },
  delBtnDanger: { backgroundColor: "#c0392b", },
  btnText: { color: '#fff', fontSize: 17, fontWeight: '700' },
  error: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { fontSize: 18, color: '#666' },
  back: { color: '#2d5a27', marginTop: 12, fontSize: 16 },
});
