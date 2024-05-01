import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import Logo from "../components/Logo";
import Id from "../components/Id";
import Id_Pw_Sign from "../components/Id_Pw_Sign";
import Division from "../components/Division";
import { SafeAreaView, View } from "react-native";
import * as S from "../../style/LoginStyle";
import axios from "axios";
import { SERVER_URL } from "../components/ServerAddress";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [userId, setUserid] = useState("");
  const [password, setPassword] = useState("");

  const submitBtn = async () => {
    const userData = {
      id: userId,
      password: password,
    };

    try {
      const response = await axios.post(`${SERVER_URL}/login`, userData);

      await AsyncStorage.setItem("userData", JSON.stringify(response.data));
      navigation.navigate("Main");
    } catch (error) {
      console.error("데이터를 보내는 중 오류가 발생했습니다:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
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
          <Id_Pw_Sign />
        </S.InputContainer>
        <Division />
      </S.MainContainer>
    </SafeAreaView>
  );
};

export default LoginScreen;
