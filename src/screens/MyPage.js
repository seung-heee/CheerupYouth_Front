import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

import * as S from "../../style/MyPageStyle";
import Header from "../components/Hearder";

const ButtonBox = () => {
  // 오류 안나게 하려고 만들어 놓은 버튼 박스 입니당
};

const MyPage = ({ navigation }) => {
  return (
    <S.Container>
      <Header navigation={navigation} />
      <View>
        <S.Center>
          <S.ProfileImage
            source={require("../../assets/images/adaptive-icon.png")}
          />
          <S.ProfileText>김동준</S.ProfileText>
        </S.Center>
        <S.ButtonWrapper>
          <S.Button onPress={() => navigation.navigate("InfoDetail")}>
            <S.ButtonText>상세정보 수정</S.ButtonText>
          </S.Button>
          <S.Button onPress={ButtonBox}>
            <S.ButtonText>내 정보 관리</S.ButtonText>
          </S.Button>
          <S.Button onPress={() => navigation.navigate("PolicyList")}>
            <S.ButtonText>로그아웃</S.ButtonText>
          </S.Button>
        </S.ButtonWrapper>
      </View>
    </S.Container>
  );
};

export default MyPage;
