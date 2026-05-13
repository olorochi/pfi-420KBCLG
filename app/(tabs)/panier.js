import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Modal, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export default function PanierScreen() {
  const { items, modifierQuantite, retirerDuPanier, viderPanier, totalPrix } = useCart();
  const { user } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);

  if (items.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>🛒 Mon Panier</Text>
        </View>
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>🛒</Text>
          <Text style={styles.emptyText}>Votre panier est vide</Text>
          <Text style={styles.emptySubtext}>Parcourez nos nains et ajoutez-en un !</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🛒 Mon Panier</Text>
        <Text style={styles.headerSub}>{items.length} article(s)</Text>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => String(item.produit.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.produit.image }} style={styles.thumbnail} resizeMode="cover" />
            <View style={styles.cardInfo}>
              <Text style={styles.productName}>{item.produit.nom}</Text>
              <Text style={styles.unitPrice}>{item.produit.prix} $ / unité</Text>
              <Text style={styles.lineTotal}>Total : {(item.produit.prix * item.quantite).toFixed(2)} $</Text>
            </View>
            <View style={styles.qtyControls}>
              <TouchableOpacity style={styles.qtyBtn} onPress={() => modifierQuantite(item.produit.id, -1)}>
                <Ionicons name="remove" size={18} color="#2d5a27" />
              </TouchableOpacity>
              <Text style={styles.qtyText}>{item.quantite}</Text>
              <TouchableOpacity style={styles.qtyBtn} onPress={() => modifierQuantite(item.produit.id, 1)}>
                <Ionicons name="add" size={18} color="#2d5a27" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.deleteBtn} onPress={() => retirerDuPanier(item.produit.id)}>
              <Ionicons name="trash-outline" size={20} color="#c0392b" />
            </TouchableOpacity>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListFooterComponent={() => (
          <View style={styles.totalSection}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total de la commande</Text>
              <Text style={styles.totalPrice}>{totalPrix.toFixed(2)} $</Text>
            </View>
          </View>
        )}
      />

      <View style={styles.footer}>
        <TouchableOpacity style={styles.viderBtn} onPress={() => Alert.alert('Vider le panier', 'Êtes-vous sûr ?', [{ text: 'Annuler', style: 'cancel' }, { text: 'Vider', style: 'destructive', onPress: viderPanier }])}>
          <Ionicons name="trash-outline" size={18} color="#c0392b" />
          <Text style={styles.viderText}>  Vider</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.acheterBtn} onPress={() => setModalVisible(true)}>
          <Text style={styles.acheterText}>Acheter — {totalPrix.toFixed(2)} $</Text>
        </TouchableOpacity>
      </View>

      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalIcon}>🎉</Text>
            <Text style={styles.modalTitle}>Commande confirmée !</Text>
            <Text style={styles.modalSubtitle}>Merci {user ? user.nom : ''} pour votre achat !</Text>
            <View style={styles.modalDivider} />
            <ScrollView style={styles.modalItems} showsVerticalScrollIndicator={false}>
              {items.map((item) => (
                <View key={item.produit.id} style={styles.modalItem}>
                  <Text style={styles.modalItemName}>{item.produit.nom} x {item.quantite}</Text>
                  <Text style={styles.modalItemPrice}>{(item.produit.prix * item.quantite).toFixed(2)} $</Text>
                </View>
              ))}
            </ScrollView>
            <View style={styles.modalDivider} />
            <View style={styles.modalTotalRow}>
              <Text style={styles.modalTotalLabel}>Total payé</Text>
              <Text style={styles.modalTotalPrice}>{totalPrix.toFixed(2)} $</Text>
            </View>
            <Text style={styles.modalAddress}>Livraison à : {user ? user.adresse : ''}</Text>
            <TouchableOpacity style={styles.modalBtn} onPress={() => { viderPanier(); setModalVisible(false); }}>
              <Text style={styles.modalBtnText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f7ee' },
  header: { backgroundColor: '#2d5a27', padding: 20 },
  headerTitle: { fontSize: 22, fontWeight: '800', color: '#fff' },
  headerSub: { color: '#a8d5a2', fontSize: 13, marginTop: 2 },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  emptyIcon: { fontSize: 64, marginBottom: 16 },
  emptyText: { fontSize: 20, fontWeight: '700', color: '#333' },
  emptySubtext: { fontSize: 14, color: '#888', marginTop: 6, textAlign: 'center' },
  list: { padding: 16, paddingBottom: 100 },
  card: { backgroundColor: '#fff', borderRadius: 14, padding: 12, flexDirection: 'row', alignItems: 'center', elevation: 2 },
  thumbnail: { width: 60, height: 60, borderRadius: 10, backgroundColor: '#e8f5e9' },
  cardInfo: { flex: 1, marginLeft: 12 },
  productName: { fontSize: 15, fontWeight: '700', color: '#222' },
  unitPrice: { fontSize: 13, color: '#888', marginTop: 2 },
  lineTotal: { fontSize: 14, color: '#2d5a27', fontWeight: '700', marginTop: 2 },
  qtyControls: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 8 },
  qtyBtn: { width: 32, height: 32, borderRadius: 8, borderWidth: 1, borderColor: '#2d5a27', justifyContent: 'center', alignItems: 'center', marginHorizontal: 4 },
  qtyText: { fontSize: 16, fontWeight: '700', color: '#222', minWidth: 20, textAlign: 'center' },
  deleteBtn: { padding: 8 },
  totalSection: { backgroundColor: '#fff', borderRadius: 14, padding: 16, marginTop: 10 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  totalLabel: { fontSize: 16, fontWeight: '700', color: '#333' },
  totalPrice: { fontSize: 22, fontWeight: '800', color: '#2d5a27' },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#fff', flexDirection: 'row', padding: 16, borderTopWidth: 1, borderTopColor: '#e0e0e0' },
  viderBtn: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#c0392b', borderRadius: 10, paddingHorizontal: 16, paddingVertical: 12, marginRight: 10 },
  viderText: { color: '#c0392b', fontWeight: '600', fontSize: 15 },
  acheterBtn: { flex: 1, backgroundColor: '#2d5a27', borderRadius: 10, paddingVertical: 12, justifyContent: 'center', alignItems: 'center' },
  acheterText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 24 },
  modalCard: { backgroundColor: '#fff', borderRadius: 20, padding: 24, width: '100%', maxHeight: '80%', alignItems: 'center' },
  modalIcon: { fontSize: 52, marginBottom: 8 },
  modalTitle: { fontSize: 24, fontWeight: '800', color: '#2d5a27' },
  modalSubtitle: { fontSize: 15, color: '#666', marginTop: 4 },
  modalDivider: { height: 1, backgroundColor: '#e0e0e0', width: '100%', marginVertical: 16 },
  modalItems: { width: '100%', maxHeight: 160 },
  modalItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
  modalItemName: { fontSize: 14, color: '#333', flex: 1 },
  modalItemPrice: { fontSize: 14, fontWeight: '600', color: '#333' },
  modalTotalRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 8 },
  modalTotalLabel: { fontSize: 16, fontWeight: '700', color: '#333' },
  modalTotalPrice: { fontSize: 20, fontWeight: '800', color: '#2d5a27' },
  modalAddress: { fontSize: 13, color: '#888', marginBottom: 20, textAlign: 'center' },
  modalBtn: { backgroundColor: '#2d5a27', borderRadius: 10, paddingHorizontal: 40, paddingVertical: 14, width: '100%', alignItems: 'center' },
  modalBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
