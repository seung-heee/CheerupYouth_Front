import React, { useState } from 'react';
import { SafeAreaView, TextInput, Button, Text, StyleSheet, View } from 'react-native';
import axios from 'axios';

const PracAI = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>OpenAI API 사용 예제</Text>
      <TextInput
        style={styles.input}
        placeholder="질문을 입력하세요"
        value={input}
        onChangeText={setInput}
      />
      <Button title="제출" onPress={handleSubmit} />
      <View style={styles.responseContainer}>
        <Text style={styles.responseText}>{response}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  responseContainer: {
    marginTop: 20,
  },
  responseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  responseText: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default PracAI;
