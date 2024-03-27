import React from "react";
import styled from 'styled-components/native';
import * as S from "../../style/LoginStyle";


const Id_Pw_Sign = () => {
  return (
    <S.Id_Pw_SignContainer>
      <S.EachButton>
        <S.WordButtonText>아이디 찾기</S.WordButtonText>
      </S.EachButton>
      <S.WordBetweenVerticalLine />
      <S.EachButton>
        <S.WordButtonText>비밀번호 찾기</S.WordButtonText>
      </S.EachButton>
      <S.WordBetweenVerticalLine />
      <S.EachButton>
        <S.WordButtonText>회원가입</S.WordButtonText>
      </S.EachButton>
    </S.Id_Pw_SignContainer>
  );
};

export default Id_Pw_Sign;
