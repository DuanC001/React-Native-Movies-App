import React from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MoviesScreen from "./src/screens/MoviesScreen";
import SearchResultScreen from "./src/screens/SearchResultScreen";
import TVShowScreen from "./src/screens/TVShowScreen";
import DetailScreen from "./src/screens/DetailScreen";

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

const MoviesTab = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarLabelStyle: { fontSize: 12 },
      tabBarStyle: { backgroundColor: "white" },
      tabBarActiveTintColor: "black",
      tabBarInactiveTintColor: "gray",
      tabBarIndicatorStyle: { backgroundColor: "black" },
    }}
  >
    <Tab.Screen name="Movies" component={MoviesScreen} />
    <Tab.Screen name="Search Result" component={SearchResultScreen} />
    <Tab.Screen name="TV Shows" component={TVShowScreen} />
  </Tab.Navigator>
);

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      {/* <Text style={styles.appTitle}>Movies App</Text> */}
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={MoviesTab} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen
            name="MovieDetail"
            component={DetailScreen} 
            options={{ title: "Movie Details" }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    color: "white",
  },
});
