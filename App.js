import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import styled from "styled-components/native";
import Main from "./src/screens/Main";
import TutorialScreen from "./src/screens/TutorialScreen";
import LoginScreen from "./src/screens/LoginScreen";
import LawWordList from "./src/screens/LawWordList";
import LawListSearch from "./src/screens/LawListSearch";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="TutorialScreen" component={TutorialScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="LawWordList" component={LawWordList} />
        <Stack.Screen name="LawListSearch" component={LawListSearch} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
