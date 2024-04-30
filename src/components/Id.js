import React, { useState } from "react";
import styled from "styled-components/native";
import * as S from "../../style/LoginStyle";
import { SERVER_URL } from "../components/ServerAddress";
import axios from "axios";

const Login = ({
  navigation,
  onPress,
  userId,
  setUserid,
  password,
  setPassword,
}) => {
  return (
    <S.IdContainer>
      <S.LonginPassBox
        placeholder="아이디를 입력해 주세요"
        placeholderTextColor="grey"
        value={userId}
        onChangeText={setUserid}
      />

      <S.LonginPassBox
        placeholder="비밀번호를 입력해 주세요"
        placeholderTextColor="grey"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      <S.LoginButton onPress={onPress} activeOpacity={0.8}>
        <S.LoginButtonInside>로그인</S.LoginButtonInside>
      </S.LoginButton>
    </S.IdContainer>
  );
};

export default Login;
