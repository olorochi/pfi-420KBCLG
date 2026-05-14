import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';

const LANGUES = [
  { value: 'fr', label: 'Fr', emoji: '🇫🇷' },
  { value: 'en', label: 'En', emoji: '🇬🇧' },
  { value: 'auto', label: 'Auto', emoji: '🌐' },
];

export default function CompteScreen() {
  const { user, updateUser, logout, getI18n } = useAuth();
  const router = useRouter();
  const [mdp, setMdp] = useState(user ? user.mdp : '');
  const [adresse, setAdresse] = useState(user ? user.adresse : '');
  const [langue, setLangue] = useState(user ? user.langue : 'fr');
  const [editing, setEditing] = useState(false);

  if (!user) return null;
  const i18n = getI18n({
    en: {
      account: "Account",
      myAccount: "My account",
      modify: "Edit",
      name: "Name",
      password: "Password",
      address: "Address",
      preferredLanguage: "Preferred language",
      cancel: "Cancel",
      save: "Save",
      logout: "Log out",
      warehouses: "View our warehouses",
      admin: "Administrator",
      client: "Client",
      success: "Success",
      updated: "Information updated.",
      error: "Error",
      emptyFields: "Fields cannot be empty.",
    },
    fr: {
      myAccount: "Mon compte",
      modify: "Modifier",
      name: "Nom",
      password: "Mot de passe",
      address: "Adresse",
      preferredLanguage: "Langue préférée",
      cancel: "Annuler",
      save: "Sauvegarder",
      logout: "Se déconnecter",
      warehouses: "Voir nos entrepôts",
      admin: "Administrateur",
      client: "Client",
      success: "Succès",
      updated: "Informations mises à jour.",
      error: "Erreur",
      emptyFields: "Les champs ne peuvent pas être vides.",
    }
  });

  const handleSauvegarder = async () => {
    if (!mdp.trim() || !adresse.trim()) {
      Alert.alert(i18n.t("error"), i18n.t("emptyFields"));
      return;
    }
    await updateUser({ mdp, adresse, langue });
    setEditing(false);
    Alert.alert(i18n.t("success"), i18n.t("updated"));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scroll}>
      <View style={styles.header}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>{user.nom[0].toUpperCase()}</Text>
        </View>
        <Text style={styles.headerName}>{user.nom}</Text>
        <Text style={styles.headerRole}>{user.admin ? `👑 ${i18n.t("admin")}` : `🛍️ ${i18n.t("client")}`}</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{i18n.t("myAccount")}</Text>
          {!editing && (
            <TouchableOpacity onPress={() => setEditing(true)} style={styles.editBtn}>
              <Text style={styles.editBtnText}>{i18n.t("modify")}</Text>
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.fieldLabel}>{i18n.t("name")}</Text>
        <View style={styles.fieldLocked}>
          <Text style={styles.fieldText}>{user.nom}</Text>
        </View>

        <Text style={styles.fieldLabel}>{i18n.t("password")}</Text>
        {editing ? (
          <TextInput style={styles.input} value={mdp} onChangeText={setMdp} secureTextEntry={true} placeholderTextColor="#aaa" placeholder="Nouveau mot de passe" />
        ) : (
          <View style={styles.fieldLocked}>
            <Text style={styles.fieldText}>{'•'.repeat(mdp.length)}</Text>
          </View>
        )}

        <Text style={styles.fieldLabel}>{i18n.t("address")}</Text>
        {editing ? (
          <TextInput style={styles.input} value={adresse} onChangeText={setAdresse} multiline={true} placeholderTextColor="#aaa" placeholder="Votre adresse" />
        ) : (
          <View style={styles.fieldLocked}>
            <Text style={styles.fieldText}>{adresse}</Text>
          </View>
        )}

        <Text style={styles.fieldLabel}>{i18n.t("preferedLanguage")}</Text>
        <View style={styles.langueRow}>
          {LANGUES.map((l) => (
            <TouchableOpacity
              key={l.value}
              style={[styles.langueBtn, langue === l.value && styles.langueBtnActive]}
              onPress={() => { if (editing) setLangue(l.value); }}
            >
              <Text style={styles.langueEmoji}>{l.emoji}</Text>
              <Text style={[styles.langueBtnText, langue === l.value && styles.langueBtnTextActive]}>{l.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {editing && (
          <View style={styles.editActions}>
            <TouchableOpacity style={styles.annulerBtn} onPress={() => { setMdp(user.mdp); setAdresse(user.adresse); setLangue(user.langue); setEditing(false); }}>
              <Text style={styles.annulerText}>{i18n.t("cancel")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sauvegarderBtn} onPress={handleSauvegarder}>
              <Text style={styles.sauvegarderText}>{i18n.t("save")}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.entrepotBtn} onPress={() => router.push('/entrepots')}>
        <Ionicons name="location-outline" size={22} color="#2d5a27" />
        <Text style={styles.entrepotText}>  {i18n.t("warehouses")}</Text>
        <Ionicons name="chevron-forward" size={18} color="#aaa" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutBtn} onPress={() => { logout(); router.replace('/'); }}>
        <Text style={styles.logoutText}>{i18n.t("logout")}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f7ee' },
  scroll: { paddingBottom: 40 },
  header: { backgroundColor: '#2d5a27', alignItems: 'center', paddingVertical: 32 },
  avatarCircle: { width: 72, height: 72, borderRadius: 36, backgroundColor: '#a8d5a2', justifyContent: 'center', alignItems: 'center', marginBottom: 12, borderWidth: 3, borderColor: '#fff' },
  avatarText: { fontSize: 30, fontWeight: '800', color: '#2d5a27' },
  headerName: { fontSize: 22, fontWeight: '800', color: '#fff' },
  headerRole: { fontSize: 13, color: '#a8d5a2', marginTop: 4 },
  section: { backgroundColor: '#fff', borderRadius: 16, margin: 16, padding: 16, elevation: 2 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#333' },
  editBtn: { backgroundColor: '#e8f5e9', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  editBtnText: { color: '#2d5a27', fontSize: 13, fontWeight: '600' },
  fieldLabel: { fontSize: 12, fontWeight: '700', color: '#888', marginBottom: 6, marginTop: 8, textTransform: 'uppercase' },
  fieldLocked: { backgroundColor: '#f5f5f5', borderRadius: 10, padding: 12, marginBottom: 8 },
  fieldText: { fontSize: 15, color: '#444' },
  input: { borderWidth: 1, borderColor: '#c8e6c9', borderRadius: 10, padding: 12, fontSize: 15, backgroundColor: '#f9fdf9', color: '#222', marginBottom: 8 },
  langueRow: { flexDirection: 'row', marginBottom: 8 },
  langueBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 10, backgroundColor: '#f9f9f9', marginHorizontal: 4 },
  langueBtnActive: { borderColor: '#2d5a27', backgroundColor: '#e8f5e9' },
  langueEmoji: { fontSize: 16, marginRight: 4 },
  langueBtnText: { fontSize: 12, color: '#666', fontWeight: '600' },
  langueBtnTextActive: { color: '#2d5a27' },
  editActions: { flexDirection: 'row', marginTop: 8 },
  annulerBtn: { flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 12, alignItems: 'center', marginRight: 10 },
  annulerText: { color: '#666', fontWeight: '600' },
  sauvegarderBtn: { flex: 2, backgroundColor: '#2d5a27', borderRadius: 10, padding: 12, alignItems: 'center' },
  sauvegarderText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  entrepotBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 14, marginHorizontal: 16, marginBottom: 12, padding: 16, elevation: 2 },
  entrepotText: { flex: 1, fontSize: 15, fontWeight: '600', color: '#333' },
  logoutBtn: { backgroundColor: '#fff', borderRadius: 14, marginHorizontal: 16, padding: 16, borderWidth: 1, borderColor: '#fce4e4', alignItems: 'center' },
  logoutText: { color: '#c0392b', fontWeight: '700', fontSize: 15 },
});
