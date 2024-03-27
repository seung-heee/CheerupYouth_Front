import styled from 'styled-components/native';
import { SafeAreaView, View } from 'react-native';

export const DivisionContainer = styled.View`
  align-items: center;
  margin-top: 10%;
  
`;

export const Line = styled.View`
  height: 1px;
  width: 350px;
  background-color: grey;
  margin-bottom: -8px; 
  
`;

export const DivisionText = styled.Text`
  background-color: white;
  padding-horizontal: 10px;
  padding-bottom: 5px;
  font-size: 15px;
  
`;

export const Id_Pw_SignContainer = styled.View`
  flex-direction: row;
  margin-top: 10px;
`;

export const EachButton = styled.TouchableOpacity`
  margin-right: 10px;
`;//버튼과 세로선간의 간격

export const WordButtonText = styled.Text`
  margin-top: 15px;
  font-size: 16px;
  color: grey;
  font-weight: bold;
`;//각 단어의 윗부분 패딩

export const WordBetweenVerticalLine = styled.View` 
  height: 50%;
  width: 1px;
  background-color: grey;
  margin-top: 17px;
  margin-right: 2.5%;
`;//각 단어 사이의 선 

export const IdContainer = styled.View`
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 10px;
  width: 360px;
  height: 205px;
`;//세 구역 값

export const LonginPassBox = styled.TextInput`
  margin-vertical: 5px;
  height: 55px;
  width: 100%;
  padding-left: 16px;
  border-radius: 10px;
  font-size: 16px;
  background-color: white;
  border-width: 1px; /* 테두리 두께 */
  border-color: grey; /* 테두리 색상 */
`;//아이디,비번상자

export const LoginButton = styled.TouchableOpacity`
  background-color: #2D4B8E;
  padding: 10px;
  height: 55px;
  width: 100%;
  border-radius: 10px;
  align-items: center;
  margin-top: 15px;
  justify-content: center;
`;//로그인버튼 디자인

export const LoginButtonInside = styled.Text`
  color: white;
  font-size: 21px;
  font-weight: bold;
`;//로그인버튼 속

export const SafeAreaViewWrapper = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;

export const LogoeContainer = styled.View`
  flex: 1;
`;

export const LogoContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 150px;
  background-color: white;
`;

export const InputContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

export const StyledImage = styled.Image`
  width: 150px;
  height: 160px;
  margin-bottom: 60px;
`;

export const MainContainer = styled(View)`
  flex: 1;
`;

export const MainLogoContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 150px;
`;

export const MainInputContainer = styled.View`
  align-items: center;
  justify-content: center;
`;
