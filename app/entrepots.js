import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, ScrollView, Image } from "react-native";
import MapView, { Marker, Circle, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import {getLocales} from 'expo-localization';
import {I18n} from 'i18n-js';
import { SafeAreaView } from "react-native-safe-area-context";

const translations = {
  en: {
    warehouse: "Warehouse",
    warehouses: "Warehouses"
  },
  fr: {
    warehouse: "Entrepôt",
    warehouses: "Entrepôts"
  }
}
const i18n = new I18n(translations);
i18n.locale = getLocales()[0].languageCode;

const warehouses = [
  {
    id: 1,
    name: "Laval",
    latitude: 45.6066,
    longitude: -73.7124,
  },
  {
    id: 2,
    name: "Montréal",
    latitude: 45.5019,
    longitude: -73.5674,
  },
  {
    id: 3,
    name: "Terrebonne",
    latitude: 45.7004,
    longitude: -73.6473,
  },
  {
    id: 4,
    name: "Longueuil",
    latitude: 45.5312,
    longitude: -73.5181,
  },
  {
    id: 5,
    name: "Blainville",
    latitude: 45.6669,
    longitude: -73.8825,
  },
];

const home = {
  latitude: 45.616,
  longitude: -73.839,
};

const route = [
  { latitude: 45.6669, longitude: -73.8825 },
  { latitude: 45.6590, longitude: -73.8700 },
  { latitude: 45.6535, longitude: -73.8780 },
  { latitude: 45.6460, longitude: -73.8600 },
  { latitude: 45.6400, longitude: -73.8670 },
  { latitude: 45.6310, longitude: -73.8480 },
  { latitude: 45.6240, longitude: -73.8530 },
  { latitude: 45.6200, longitude: -73.8420 },
  { latitude: 45.6160, longitude: -73.8390 },
];

export default function Warehouses() {
  const [selected, setSelected] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.sidebar}>
        <Text style={styles.title}>{i18n.t("warehouses")}</Text>

        <ScrollView>
          {warehouses.map((w) => {
            const active = selected?.id === w.id;

            return (
              <Pressable
                key={w.id}
                style={[
                  styles.button,
                  active && styles.selectedButton,
                ]}
                onPress={() => setSelected(w)}
              >
                <Text style={styles.buttonText}>
                  {i18n.t("warehouse")} {w.name}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: 45.61,
            longitude: -73.75,
            latitudeDelta: 1.35,
            longitudeDelta: 0.35,
          }}
        >
          <Marker coordinate={home} title="Maison">
            <Image
              source={require("./assets/home.png")}
              style={styles.icon}
            />
          </Marker>

          {warehouses.map((w) => (
            <View key={w.id}>
              <Marker
                coordinate={{
                  latitude: w.latitude,
                  longitude: w.longitude,
                }}
                title={w.name}
                onPress={() => setSelected(w)}
              >
                <Image
                  source={require("./assets/warehouse.jpg")}
                  style={styles.icon}
                />
              </Marker>

              <Circle
                center={{
                  latitude: w.latitude,
                  longitude: w.longitude,
                }}
                radius={5000}
                strokeWidth={2}
                strokeColor="rgba(255,0,0,0.8)"
                fillColor="rgba(255,0,0,0.2)"
              />
            </View>
          ))}

          <Polyline
            coordinates={route}
            strokeWidth={5}
            strokeColor="blue"
          />
        </MapView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sidebar: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    padding: 10,
  },
  mapContainer: {
    flex: 3,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#ddd",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  selectedButton: {
    backgroundColor: "orange",
  },
  buttonText: {
    fontWeight: "bold",
  },
  icon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
});
