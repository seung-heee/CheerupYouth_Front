import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import * as S from "../../style/LoginStyle";

const Id_Pw_Sign = ({ SignUp, text }) => {
  return (
    <S.Id_Pw_SignContainer>
      <S.EachButton>
        <S.WordButtonText>{text}</S.WordButtonText>
      </S.EachButton>
      <S.WordBetweenVerticalLine />
      <S.EachButton>
        <S.WordButtonText>비밀번호 찾기</S.WordButtonText>
      </S.EachButton>
      <S.WordBetweenVerticalLine />
      <S.EachButton onPress={SignUp}>
        <S.WordButtonText>회원가입</S.WordButtonText>
      </S.EachButton>
    </S.Id_Pw_SignContainer>
  );
};

export default Id_Pw_Sign;
