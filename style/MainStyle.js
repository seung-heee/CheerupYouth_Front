import styled from "styled-components";

export const Container = styled.View`
  flex: 1;
  background-color: #f2f3f8;
  padding-horizontal: 20px;
`;

export const Header = styled.View`
  align-items: center;
  justify-content: flex-end;
  flex-direction: row;
  margin-top: 10px; /* Adjust this value if the top bar is removed */
  margin-bottom: 10px;
`;

export const HeaderText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  align-items: center;
  margin-right: 90px;
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
  shadow-color: #000000;
  shadow-opacity: 0.27;
  shadow-radius: 4.65;
  shadow-offset: {
    width: 0;
    height: 3;
  }
  margin: 3px;
`;

export const ButtonText = styled.Text`
  background-color: white;
  padding: 10px;
  margin: 5px;
`;
