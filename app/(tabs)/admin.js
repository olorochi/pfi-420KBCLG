import { useState } from "react";
import { View, TextInput, Pressable, Text, StyleSheet, Alert } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { useDb } from "../../context/DbContext";
import { useAuth } from '../../context/AuthContext';

export default function admin() {
  const db = useSQLiteContext();
  const { markChanged } = useDb();

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const { getI18n } = useAuth();
  const i18n = getI18n({
    en: {
      name: "Name",
      description: "Description",
      price: "Price",
      image: "Image",
      add: "Add",
      success: "Success",
      productAdded: "Product added.",
      error: "Error",
      missingFields: "Name, description and price are required.",
    },
    fr: {
      name: "Nom",
      description: "Description",
      price: "Prix",
      image: "Image",
      add: "Ajouter",
      success: "Succès",
      productAdded: "Produit ajouté.",
      error: "Erreur",
      missingFields: "Nom, description et prix obligatoires.",
    }
  });

  const onAdd = async () => {
    if (!name.trim() || !desc.trim() || !price.trim()) {
      Alert.alert("Erreur", "Nom, description et prix obligatoires.");
      return;
    }

    try {
      await db.runAsync(
        "INSERT INTO Produit (nom, description, prix, image) VALUES (?, ?, ?, ?)",
        name,
        desc,
        price,
        image
      );

      markChanged();

      setName("");
      setDesc("");
      setPrice("");
      setImage("");

      Alert.alert(i18n.t("success"), i18n.t("productAdded"));
    } catch (e) {
      Alert.alert(i18n.t("error"), i18n.t("missingFields"));
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={i18n.t("name")}
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder={i18n.t("description")}
        value={desc}
        onChangeText={setDesc}
        style={styles.input}
      />

      <TextInput
        placeholder={i18n.t("price")}
        value={price}
        onChangeText={setPrice}
        style={styles.input}
        keyboardType="numeric"
      />

      <TextInput
        placeholder={i18n.t("image")}
        value={image}
        onChangeText={setImage}
        style={styles.input}
      />

      <Pressable
        style={styles.button}
        onPress={onAdd}
      >
        <Text style={styles.buttonText}>{i18n.t("add")}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10 },
  input: {
    backgroundColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  button: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});
