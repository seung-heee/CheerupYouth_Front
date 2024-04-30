import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Searchbar } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

//import BottomTabNavigationApp from "./BottomBar";
import * as S from "../../style/MainStyle";

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
      style={{ backgroundColor: "white" }}
    />
  );
};

const Main = ({ navigation }) => {
  const [userDataP, setUserDataP] = useState({});

  const LoginData = async () => {
    try {
      const userData = await AsyncStorage.getItem("userData");
      if (userData) {
        const userParse = JSON.parse(userData);
        setUserDataP(userParse);
        console.log("로그인이 되어 있어요.", userData);
      }
    } catch (error) {
      console.error("로그인 상태 확인 중 오류가 발생했습니다:", error);
    }
  };
  const ButtonBox = async () => {
    try {
      await AsyncStorage.removeItem("userData");
      console.log("userData가 삭제되었습니다.");
    } catch (error) {
      console.error("데이터를 삭제하는 중 오류가 발생했습니다:", error);
    }
  };
  useEffect(() => {
    LoginData();
  }, []);

  return (
    <S.Container>
      <S.Header>
        <TouchableOpacity onPress={ButtonBox}>
          <Icon name="menu" size={25} />
        </TouchableOpacity>
        <S.HeaderText>청년 독립 만세</S.HeaderText>

        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
          <Icon name="person" size={25} />
        </TouchableOpacity>
      </S.Header>

      <SearchScreen />

      <View style={{ marginTop: 10, marginBottom: 10 }}>
        <Image
          source={require("../../assets/images/cdm.jpg")}
          style={{ width: 350, height: 200, borderRadius: 10 }}
          resizeMode="cover"
        />
      </View>

      <S.Notice onPress={ButtonBox}>
        <Icon name="notifications" size={20} color="#2e4b8f" />
        <Text>오늘의 새로운 청년 주택 공고가 올라왔어요!</Text>
      </S.Notice>

      <S.Row>
        <S.TextBox>
          {userDataP.id ? userDataP : "묘사"} 님을 위한
          {"\n"}맞춤 정책을 찾았어요
        </S.TextBox>
        <TouchableOpacity onPress={ButtonBox}>
          <S.InnerText>정책 더보기⮕ </S.InnerText>
        </TouchableOpacity>
      </S.Row>

      <S.Button onPress={ButtonBox}>
        <Text>여기에는 박스가 들어갑니다1</Text>
      </S.Button>

      <S.Button onPress={ButtonBox}>
        <Text>여기에는 박스가 들어갑니다2</Text>
      </S.Button>

      <S.Button onPress={ButtonBox}>
        <Text>여기에는 박스가 들어갑니다3</Text>
      </S.Button>

      <S.Row>
        <S.TextBox> 부동산 계약 관련 정보</S.TextBox>
      </S.Row>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <S.ButtonRow onPress={() => navigation.navigate("TutorialScreen")}>
          <S.ButtonRowText>튜토리얼</S.ButtonRowText>
        </S.ButtonRow>
        <S.ButtonRow onPress={ButtonBox}>
          <S.ButtonRowText>계약서</S.ButtonRowText>
        </S.ButtonRow>
        <S.ButtonRow onPress={() => navigation.navigate("LawWordList")}>
          <S.ButtonRowText>용어 리스트</S.ButtonRowText>
        </S.ButtonRow>
      </View>
    </S.Container>
  );
};

export default Main;
