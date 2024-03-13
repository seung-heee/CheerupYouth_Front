import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export default function App() {
  return (
    <Container>
      <Text>청년독립만세 시~작!</Text>
      <StatusBar style="auto" />
    </Container>
  );
}