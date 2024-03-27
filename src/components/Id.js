import React, { useState } from 'react';
import styled from 'styled-components/native';
import * as S from "../../style/LoginStyle";


const Login = () => {
  const [Id, setId] = useState('');
  const [password, setPassword] = useState('');

  const submitBtn = () => {
    // 로그인 버튼 클릭 시 실행될 동작
  };

  return (
    <S.IdContainer>
      <S.LonginPassBox
        placeholder="아이디를 입력해 주세요"
        placeholderTextColor="grey"
        value={Id}
        onChangeText={setId}
      />

      <S.LonginPassBox
        placeholder="비밀번호를 입력해 주세요"
        placeholderTextColor="grey"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      
      <S.LoginButton onPress={submitBtn} activeOpacity={0.8}>
        <S.LoginButtonInside>로그인</S.LoginButtonInside>
      </S.LoginButton>
    </S.IdContainer>
  );
};

export default Login;
