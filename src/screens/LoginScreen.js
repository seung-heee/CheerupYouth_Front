import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components/native";
import Logo from "../components/Logo";
import Id from "../components/Id";
import Id_Pw_Sign from "../components/Id_Pw_Sign";
import Division from "../components/Division";
import { SafeAreaView, View, Alert} from "react-native";
import * as S from "../../style/LoginStyle";
import axios from "axios";
import { SERVER_URL } from "../components/ServerAddress";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../components/UserProvider";

const LoginScreen = ({ navigation }) => {
  const [userId, setUserid] = useState("");
  const [password, setPassword] = useState("");
  // const { userDataP, setUserDataP } = useContext(UserContext);
  const { login } = useContext(UserContext);

  const handlsignup = () => {
    navigation.navigate("SignUp");
  };

  const submitBtn = async () => {
    const userData = {
      id: userId,
      password: password,
    };

    try {
      const response = await axios.post(`${SERVER_URL}/users/login`, userData);
      const { token, user } = response.data;
      console.log(token, user, "로그인");
      login(token, user);
      Alert.alert(
        "환영합니다!",
        "로그인에 성공했어요! \n맞춤 지원정책을 찾아보세요!",
        [
          {
            text: "확인",
            onPress: () => navigation.navigate("BottomBar"),
          },
        ]
      );
      navigation.navigate("BottomBar"); // 로그인 성공시 메인으로 이동

      // await AsyncStorage.setItem("userData", JSON.stringify(response.data));
      // setUserDataP((prevUserData) => ({
      //   ...prevUserData,
      //   id: userId,
      //   name: response.data.name,
      // }));
      // navigation.navigate("BottomBar");
    } catch (error) {
      console.error("데이터를 보내는 중 오류가 발생했습니다:", error);
      Alert.alert(
        "로그인 실패",
        "아이디나 비밀번호를 다시 확인해 주세요.",
        [{ text: "확인" }]
      );
    }
  };
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", alignContent: "center", alignItems:"center" }}>
      <S.MainContainer>
        <S.LogoContainer>
          <Logo />
        </S.LogoContainer>
        <S.InputContainer>
          <Id
            onPress={() => {
              submitBtn();
            }}
            userId={userId}
            setUserid={setUserid}
            password={password}
            setPassword={setPassword}
          />
          <Id_Pw_Sign
            text="아이디찾기"
            SignUp={() => handlsignup()} // onSignUp으로 변경
          />
        </S.InputContainer>
        <Division />
      </S.MainContainer>
    </SafeAreaView>
  );
};

export default LoginScreen;