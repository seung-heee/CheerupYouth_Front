import React, { useState } from 'react';
import { SafeAreaView, TextInput, Button, Text, StyleSheet, View } from 'react-native';
import axios from 'axios';
import { OPENAI_API_KEY } from '@env';

const PracAI = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async () => {
    try {
      const result = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo', // chat용 최신 모델 사용
          messages: [
            {"role": "system", "content": "You are a helpful assistant who matches user conditions with appropriate housing policies."},
            {"role": "user", "content": "To tell you my conditions, please let me know if they match the conditions of the following policy"},
            {"role": "assistant", "content": "Of course. Please give me specific information such as where you live, year of birth, gender, marital status, etc"},
            { role: 'user', content: input }, // 사용자 메시지
          ],
          max_tokens: 100,
        },
        {
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(result.data.choices[0].message.content)
      setResponse(result.data.choices[0].message.content);
    } catch (error) {
      console.error(error);
    }
  };

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
