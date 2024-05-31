import styled from "styled-components";

export const Container = styled.View`
  flex: 1;
  background-color: #f2f3f8;
  margin-horizontal: 20px;
  margin-top: 50px;
`;

export const Header = styled.View`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const HeaderText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;

export const MenuText = styled.Text`
  font-size: 35px;
  color: black;
`;

export const Notice = styled.TouchableOpacity`
  background-color: white;
  padding: 10px;
  margin: 5px;
  border-radius: 30px;
  flex-direction: row;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TextBox = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #2e4b8f;
  padding: 5px;
`;

export const InnerText = styled.Text`
  font-weight: bold;
`;

export const Button = styled.TouchableOpacity`
  background-color: white;
  margin: 5px;
  border-radius: 10px;
  padding: 10px;
  shadow-color: #000;
  shadow-offset: 0 2px;
  shadow-opacity: 0.2;
  shadow-radius: 2px;
  elevation: 2; /* 안드로이드에서 그림자 효과 */
`;

export const ButtonRow = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  background-color: white;
  margin: 5px;
  border-radius: 10px;
  padding: 10px;
  shadow-color: #000;
  shadow-offset: 0 2px;
  shadow-opacity: 0.2;
  shadow-radius: 2px;
  elevation: 2; /* 안드로이드에서 그림자 효과 */
`;
//가로버튼

export const ButtonRowText = styled.Text`
  text-align: center;
`;

export const perButton = styled.TouchableOpacity`
  text-align: center;
`;
