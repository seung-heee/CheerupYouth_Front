import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import * as S from "../../style/MainStyle";

const ButtonBox = () => {
  // 오류 안나게 하려고 만들어 놓은 버튼 박스 입니당
};

const Header = ({ navigation }) => {
  return (
    <S.Header>
      <TouchableOpacity onPress={ButtonBox}>
        <Icon name="menu" size={25} />
      </TouchableOpacity>
      <S.HeaderText>청년 독립 만세</S.HeaderText>
      <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
        <Icon name="person" size={25} />
      </TouchableOpacity>
    </S.Header>
  );
};

export default Header;
