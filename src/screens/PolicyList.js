import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Searchbar } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";

import * as S from "../../style/PolicyListStyle";
import SearchScreen from "../components/SearchScreen";

const ButtonBox = () => {
  // 오류 안나게 하려고 만들어 놓은 버튼 박스 입니당
};

const PolicyList = ({ navigation }) => {
  return (
    <S.Container>
      <SearchScreen />
      <S.ButtonBox>
        <TouchableOpacity onPress={ButtonBox}>
          <S.ButtonText1>청년 도약 계좌</S.ButtonText1>
        </TouchableOpacity>
        <TouchableOpacity onPress={ButtonBox}>
          <S.ButtonText2>청년 도약 계좌 간단 설명</S.ButtonText2>
        </TouchableOpacity>
      </S.ButtonBox>
      <S.ButtonBox>
        <TouchableOpacity onPress={ButtonBox}>
          <S.ButtonText1>청년 도약 계좌</S.ButtonText1>
        </TouchableOpacity>
        <TouchableOpacity onPress={ButtonBox}>
          <S.ButtonText2>청년 도약 계좌 간단 설명</S.ButtonText2>
        </TouchableOpacity>
      </S.ButtonBox>
    </S.Container>
  );
};

export default PolicyList;
