import React from 'react';
import { ScrollView } from 'react-native'; // ScrollView를 react-native로부터 정확히 임포트
import styled from 'styled-components/native';

export const Container = styled(ScrollView).attrs({
  showsHorizontalScrollIndicator: false // 스크롤 인디케이터 숨기기
})`
  display: flex;
  flex-direction: column;
  padding-top: 50px;
  color: #2e4b8f;
  backgroundColor: #fff;
`;

export const policyBox = styled.TouchableOpacity`
  display: flex;
  flex-direction : row;
  padding: 10px 15px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  margin: 3px auto;
  width: 80%;
  
`;
export const title = styled.Text`
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
  word-break: keep-all;
`;
export const match = styled.Text`
  font-size: 13px;
  border-radius: 20px;
  padding: 3px;
  background-color: #2e4b8f;
  color: white;
  margin-bottom: 3px;
  width: 65px;
  text-align: center;
`;

export const subtitle = styled.Text`
  word-break: keep-all;
  font-size: 13px;
`;
export const policyImg = styled.Image`
  width: 100px;
`;

// 세부사항
export const DetailHeader = styled.View`
  display: flex;
  flex-direction : row;
  justify-content: space-between;
  padding: 10px;
  font-size: 30px;
`;

export const headerTitle = styled.Text`
  width: 60%;
  text-align: center;
`;

export const policyMenu = styled(ScrollView).attrs({
  horizontal: true, // 가로 스크롤 활성화
  showsHorizontalScrollIndicator: false // 스크롤 인디케이터 숨기기
})`
  display: flex;
  flex-direction : row;
`;

export const policyText = styled.Text`
  padding: 10px;
`;

export const contentBox = styled.View`
  padding: 10px;
`;

export const contentBoxTitle = styled.Text`
  padding: 5px;
  font-weight: bold;
`;

export const contentBoxContent = styled.Text`
  padding: 2px 5px;
`;

export const contentSideBox = styled.View`
  display: flex;
  flex-direction: row;
  align-items: start;
  padding-bottom: 3px;
`;

export const contentChecked= styled.Text`
  padding-top: 3px;
  color: blue;
`;

export const policyModalStyle = styled.View`
  padding: 20px;
  margin: auto; 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 10px; 
  width: 80%; 
`