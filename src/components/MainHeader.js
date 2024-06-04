import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const ButtonBox = () => {
  // 오류 안나게 하려고 만들어 놓은 버튼 박스 입니당
};

const MainHeader = ({ navigation }) => {
  return (
      <View style={styles.Container}>
        <TouchableOpacity onPress={() => navigation.navigate("Main")}>
          <Image
            source={require('../../assets/images/mainLogo.png')}
            style={styles.image}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
          <Icon name="person" size={25} color={'#264886'} />
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 7, // 하단에만 그림자가 나타나도록 설정
    // },
    // shadowOpacity: 0.1,
    // shadowRadius: 3.84,
    // elevation: 5, // Android에서 그림자를 위한 속성
    // backgroundColor: '#fff', // 그림자가 보이도록 배경색을 추가
  },
  image: {
    width: 55,
    resizeMode: 'contain',
  },
});


export default MainHeader;
