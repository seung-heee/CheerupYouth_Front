import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Searchbar } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

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

const ButtonBox = () => {
  // 오류 안나게 하려고 만들어 놓은 버튼 박스 입니당
};

const Main = ({ navigation }) => {
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
        <S.TextBox>청년님을 위한{"\n"}맞춤 정책을 찾았어요</S.TextBox>
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
        <S.Button onPress={() => navigation.navigate("TutorialScreen")}>
          <Text> 튜토리얼 </Text>
        </S.Button>
        <S.Button onPress={ButtonBox}>
          <Text> 계약서 </Text>
        </S.Button>
        <S.Button onPress={() => navigation.navigate("LawWordList")}>
          <Text>계약 용어 리스트</Text>
        </S.Button>
      </View>
    </S.Container>
  );
};

export default Main;
