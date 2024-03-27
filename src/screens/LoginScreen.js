import React from 'react';
import styled from 'styled-components/native';
import Logo from "../components/Logo";
import Id from "../components/Id";
import Id_Pw_Sign from "../components/Id_Pw_Sign";
import Division from "../components/Division";
import { SafeAreaView, View,  } from 'react-native';
import * as S from "../../style/LoginStyle";

const LoginScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <S.MainContainer>
        <S.LogoContainer>
          <Logo />
        </S.LogoContainer>
        <S.InputContainer>
          <Id />
          <Id_Pw_Sign />
        </S.InputContainer>
        <Division />
      </S.MainContainer>
    </SafeAreaView>
  );
};

export default LoginScreen;
