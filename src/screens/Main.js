import React from 'react';
import { View, Text, Button} from 'react-native';

const Main = ({navigation}) => {
  return (
    <View>
      <Text>메인 화면</Text>
      <Button
        title="튜토리얼 화면으로 이동"
        onPress={() => navigation.navigate('TutorialScreen')}
      />
      <Button
        title="로그인 화면으로 이동"
        onPress={() => navigation.navigate('LoginScreen')}
      />
    </View>
  );
};

export default Main;