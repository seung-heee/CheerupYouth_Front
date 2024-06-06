import React, { useContext, useCallback } from "react";
import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import { ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../components/UserProvider";
//import BottomTabNavigationApp from "./BottomBar";
import * as S from "../../style/MainStyle";
import Header from "../components/Hearder";
import SearchScreen from "../components/SearchScreen";

const Main = ({ navigation }) => {
  const { user } = useContext(UserContext);

  // const { userDataP, setUserDataP } = useContext(UserContext);
  // const { userDataPlusP } = useContext(UserContext);

  // const ButtonBox = async () => {
  //   try {
  //     await AsyncStorage.removeItem("userData");
  //     await AsyncStorage.removeItem("styleChange");
  //     console.log("userData가 삭제되었습니다.");
  //     setUserDataP(null); // userDataP 상태를 업데이트하여 화면을 자동으로 새로고침
  //   } catch (error) {
  //     console.error("데이터를 삭제하는 중 오류가 발생했습니다:", error);
  //   }
  // }; //아이디 삭제 (로그아웃)

  useFocusEffect(
    useCallback(() => {
      return () => {
        // 화면이 포커스를 잃을 때 실행할 작업
      };
    }, [user]) // user가 변경될 때마다 콜백 함수를 다시 생성
  );

  const handleMyPage = () => {
    if (user) {
      navigation.navigate("mypage");
    } else {
      navigation.navigate("LoginScreen");
    }
  };

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

  const btnData = [
    {
      id: 1,
      imageSource: require("../../assets/images/icon-25.png"),
      title: "나만의 맞춤 정책",
      url: "",
    },
    {
      id: 2,
      imageSource: require("../../assets/images/icon-22.png"),
      title: "전세 계약 튜토리얼",
      url: "TutorialScreen",
    },
    {
      id: 3,
      imageSource: require("../../assets/images/icon-13.png"),
      title: "부동산 용어 리스트",
      url: "LawWordList",
    },
  ];
  return (
    <View style={{ flex: 1, backgroundColor: "#EFF0F5" }}>
      <View
        style={{
          backgroundColor: "white",
          width: "100%",
          height: "35%",
          padding: 5,
          borderRadius: 10,
          shadowColor: "rgba(180,180,180,0.4)",
          shadowOffset: {
            width: 2,
            height: 2,
          },
          shadowOpacity: 10,
          shadowRadius: 3,
          elevation: 5,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Image
            style={{
              width: 60,
              height: 40,
              marginTop: 60,
              marginHorizontal: 15,
            }}
            source={require("../../assets/images/mainLogo.png")}
          />
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={() => handleMyPage()}>
              <Image
                style={{
                  width: 25,
                  height: 25,
                  marginTop: 60,
                  marginHorizontal: 10,
                }}
                source={require("../../assets/images/icon-03.png")}
              />
            </TouchableOpacity>

            <Image
              style={{
                width: 25,
                height: 25,
                marginTop: 60,
                marginHorizontal: 10,
              }}
              source={require("../../assets/images/icon-27.png")}
            />
          </View>
        </View>
        <View style={{ margin: 15 }}>
          <Text
            style={{
              marginBottom: 5,
              fontSize: 20,
              fontWeight: "bold",
              color: "#2E4B8F",
            }}
          >
            안녕하세요. {user ? user.name : "로그인"}님
          </Text>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#2E4B8F" }}>
            부동산 정보와 정책을 검색해보세요.
          </Text>
        </View>
        <View
          style={{
            margin: 15,
            width: "90%",
            backgroundColor: "white",
            height: "20%",
            borderRadius: 5,
            justifyContent: "center",
            shadowColor: "#2E4B8F",
            shadowOffset: {
              width: 1,
              height: 0,
            },
            shadowOpacity: 1,
            shadowRadius: 3,
            elevation: 3,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Image
              style={{
                width: 20,
                height: 20,
                margin: 14,
              }}
              source={require("../../assets/images/icon-04.png")}
            />
            <TextInput
              style={{ backgroundColor: "white", width: "80%", fontSize: 16 }}
              placeholder="검색어를 입력해 주세요."
            />
          </View>
        </View>
      </View>
      <ScrollView>
        <View style={{ margin: 15, padding: 5 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#2E4B8F" }}>
            {user ? user.name : "로그인"} 님의 맞춤 정책 추천
          </Text>
          <Text style={{ marginTop: 5, color: "gray" }}>
            나의 정보를 입력하시면 더욱 자세한 맞춤 정보를 확인할 수 있어요.
          </Text>
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {data.map((item) => (
                <View key={item.id} style={{ marginLeft: 15 }}>
                  <Image
                    source={item.imageSource}
                    style={{ width: 120, height: 120, borderRadius: 10 }}
                  />
                  <View style={{ maxWidth: 120 }}>
                    <S.perButton onPress={() => {}}>
                      <Text style={{ marginTop: 5 }}>{item.title}</Text>
                    </S.perButton>
                  </View>
                </View>
              ))}
              <View
                style={{
                  marginHorizontal: 15,
                  paddingRight: 5,
                  marginBottom: 25,
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate("PolicyMain")}
                >
                  <Text style={{ fontWeight: "bold" }}>정책 더보기⮕</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>

        {/* <View
          style={{
            marginVertical: 15,
          }}
        >
          <View style={{ marginTop: 10, marginBottom: 10 }}>
            <Image
              source={require("../../assets/images/ex1.jpeg")}
              style={{ height: 90, width: "100%" }}
              resizeMode="cover"
            />
          </View>
        </View> */}

        <View style={{ margin: 15, padding: 5, marginBottom: 0 }}>
          <Text style={{ marginBottom: 5, fontWeight: "bold", fontSize: 18 }}>
            복잡한 부동산 계약
          </Text>
          <Text style={{ marginBottom: 5, fontWeight: "bold", fontSize: 18 }}>
            조금 더 쉽게 준비해요!
          </Text>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {btnData.map((item) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(item.url);
              }}
              style={{
                backgroundColor: "white",
                marginHorizontal: item.id === 2 ? 0 : 25,
                padding: 13,
                width: "25%",
                borderRadius: 5,
                shadowColor: "rgba(180,180,180,0.4)",
                shadowOffset: {
                  width: 2,
                  height: 2,
                },
                shadowOpacity: 10,
                shadowRadius: 3,
                elevation: 5,
              }}
              key={item.id}
            >
              <View style={{ justifyContent: "center" }}>
                <Text
                  style={{ fontSize: 15, fontFamily: "B", color: "#2E4B8F" }}
                >
                  {item.title}
                </Text>
                <View style={{ marginTop: 15 }}>
                  <Image
                    source={item.imageSource}
                    style={{ width: 25, height: 25 }}
                  />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Main;
