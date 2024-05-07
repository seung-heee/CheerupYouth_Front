//import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, TouchableOpacity, Image, styles } from "react-native";
import { Searchbar } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";

import * as S from "../../style/MainStyle";
import Header from "../components/Hearder";
import SearchScreen from "../components/SearchScreen";

const ButtonBox = () => {
  // Your ButtonBox component logic here
};

const Community = ({ navigation }) => {
  return (
    <S.Container>
      <Header navigation={navigation} />

      <SearchScreen />

      <View style={{ marginTop: 10, marginBottom: 10 }}>
        <Image
          source={require("../../assets/images/community.png")}
          style={{ width: 350, height: 200, borderRadius: 10 }}
          resizeMode="cover"
        />
      </View>

      <S.Notice onPress={ButtonBox}>
        <Icon name="notifications" size={20} color="#2e4b8f" />
        <Text>오늘의 새로운 청년 주택 공고가 올라왔어요!</Text>
      </S.Notice>

      <S.Row>
        <S.TextBox>청년님과 비슷한{"\n"}고민을 가진 분들이에요!</S.TextBox>
        <TouchableOpacity onPress={ButtonBox}>
          <S.InnerText>게시물 더보기⮕ </S.InnerText>
        </TouchableOpacity>
      </S.Row>

      <S.Button onPress={ButtonBox}>
        <Text>여기에는 박스가 들어갑니다1</Text>
      </S.Button>

      <S.Button onPress={ButtonBox}>
        <Text>여기에는 박스가 들어갑니다1</Text>
      </S.Button>

      <S.Button onPress={ButtonBox}>
        <Text>여기에는 박스가 들어갑니다1</Text>
      </S.Button>
    </S.Container>
  );
};

export default Community;
