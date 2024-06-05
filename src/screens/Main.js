import React, { useContext, useCallback } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Searchbar } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";

import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native";
import { FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../components/UserProvider";
//import BottomTabNavigationApp from "./BottomBar";
import * as S from "../../style/MainStyle";
import Header from "../components/Hearder";
import SearchScreen from "../components/SearchScreen";

const Main = ({ navigation }) => {
  const { userDataP, setUserDataP } = useContext(UserContext);
  const { userDataPlusP } = useContext(UserContext);
  const ButtonBox = async () => {
    try {
      await AsyncStorage.removeItem("userData");
      await AsyncStorage.removeItem("styleChange");
      console.log("userData가 삭제되었습니다.");
      setUserDataP(null); // userDataP 상태를 업데이트하여 화면을 자동으로 새로고침
    } catch (error) {
      console.error("데이터를 삭제하는 중 오류가 발생했습니다:", error);
    }
  }; //아이디 삭제 (로그아웃)

  useFocusEffect(
    useCallback(() => {
      return () => {
        // 화면이 포커스를 잃을 때 실행할 작업
      };
    }, [userDataP]) // userDataP가 변경될 때마다 콜백 함수를 다시 생성
  );

  const data = [
    {
      id: 1,
      imageSource: require("../../assets/images/cdm.jpg"),
      title: "청년 부동산 중개보수 및 이사비 지원 1",
    },
    {
      id: 2,
      imageSource: require("../../assets/images/cdm.jpg"),
      title: "청년 부동산 중개보수 및 이사비 지원 2",
    },
    {
      id: 3,
      imageSource: require("../../assets/images/cdm.jpg"),
      title: "청년 부동산 중개보수 및 이사비 지원 3",
    },
    {
      id: 4,
      imageSource: require("../../assets/images/cdm.jpg"),
      title: "청년 부동산 중개보수 및 이사비 지원 4",
    },
  ];

  return (
    <S.Container>
      <Header navigation={navigation} />

      <S.TextBox>
        안녕하세요, 동준님{"\n"}부동산 정보와 정책을 검색해 보세요.
      </S.TextBox>
      <SearchScreen />

      <S.TextBox>"동준"님의 맞춤 정책 추천</S.TextBox>
      <Text style={{ marginBottom: 10 }}>
        나의 정보를 입력 후 더욱 자세한 맞춤 정보를 확인하세요.
      </Text>

      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {data.map((item) => (
              <View key={item.id} style={{ marginRight: 10 }}>
                <Image
                  source={item.imageSource}
                  style={{ width: 120, height: 150, borderRadius: 10 }}
                />
                <View style={{ maxWidth: 120 }}>
                  <S.perButton onPress={() => ButtonBox(item.id)}>
                    <Text>{item.title}</Text>
                  </S.perButton>
                </View>
              </View>
            ))}
            <TouchableOpacity onPress={() => navigation.navigate("PolicyList")}>
              <S.InnerText onPress={() => navigation.navigate("policy_main")}>
                정책 더보기⮕{" "}
              </S.InnerText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      <View
        style={{
          marginTop: 20,
          marginBottom: 20,
          marginLeft: -20,
          marginRight: -20,
        }}
      >
        <View style={{ marginTop: 10, marginBottom: 10 }}>
          <Image
            source={require("../../assets/images/ex1.jpeg")}
            style={{ height: 90, width: "100%" }}
            resizeMode="cover"
          />
        </View>
      </View>

      <S.Row>
        <S.TextBox>복잡한 부동산 계약{"\n"}조금 더 쉽게 준비해요!</S.TextBox>
      </S.Row>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <S.ButtonRow onPress={ButtonBox}>
          <S.ButtonRowText>나만의{"\n"}맞춤정책</S.ButtonRowText>
        </S.ButtonRow>
        <S.ButtonRow onPress={() => navigation.navigate("TutorialScreen")}>
          <S.ButtonRowText>튜토리얼</S.ButtonRowText>
        </S.ButtonRow>
        <S.ButtonRow onPress={() => navigation.navigate("LawWordList")}>
          <S.ButtonRowText>용어 리스트</S.ButtonRowText>
        </S.ButtonRow>
      </View>
    </S.Container>
  );
};

export default Main;
