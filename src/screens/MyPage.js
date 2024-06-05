
import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import * as S from "../../style/MyPageStyle";
import Header from "../components/Hearder";
import { UserContext } from "../components/UserProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ButtonBox = () => {
  // 오류 안나게 하려고 만들어 놓은 버튼 박스 입니당
};

const MyPage = ({ navigation }) => {

  const { userDataP, setUserDataP } = useContext(UserContext);
  const LogoutBtn = async () => {
    try {
      await AsyncStorage.removeItem("userData");
      await AsyncStorage.removeItem("styleChange");
      await AsyncStorage.removeItem("styleChangePg3");
      await AsyncStorage.removeItem("styleChangePg4");
      console.log("userData가 삭제되었습니다.");
      setUserDataP(null); // userDataP 상태를 업데이트하여 화면을 자동으로 새로고침
    } catch (error) {
      console.error("데이터를 삭제하는 중 오류가 발생했습니다:", error);
    }
    navigation.navigate("BottomBar"); //아이디 삭제 (로그아웃)
  };

  return (
    <S.Container>
      <Header navigation={navigation} />
      <View>
        <S.Center>
          <S.ProfileImage
            source={require("../../assets/images/adaptive-icon.png")}
          />

          <S.ProfileText>{userDataP ? userDataP.name : "묘사"}</S.ProfileText>

        </S.Center>
        <S.ButtonWrapper>
          <S.Button onPress={() => navigation.navigate("InfoDetail")}>
            <S.ButtonText>상세정보 수정</S.ButtonText>
          </S.Button>
          <S.Button onPress={ButtonBox}>
            <S.ButtonText>내 정보 관리</S.ButtonText>
          </S.Button>

          <S.Button onPress={LogoutBtn}>

            <S.ButtonText>로그아웃</S.ButtonText>
          </S.Button>
        </S.ButtonWrapper>
      </View>
    </S.Container>
  );
};

export default MyPage;
