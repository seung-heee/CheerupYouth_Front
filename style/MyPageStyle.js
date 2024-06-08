import styled from "styled-components";

export const Container = styled.View`
  flex: 1;
  background-color: #f2f3f8;
  padding-horizontal: 20px;
  margin-top: 50px;
`;

export const Center = styled.View`
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
`;

export const ProfileImage = styled.Image`
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border-radius: 50px;
  margin-bottom: 20px;
`;

export const ProfileText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const ButtonWrapper = styled.View`
  margin-bottom: 10px;
`;

export const Button = styled.TouchableOpacity`
  background-color: transparent; /* Set background to transparent */
  padding: 20px;
  border-bottom-width: 1px; /* Add bottom border */
  border-color: #626262; /* Set border color */
`;

export const LastButton = styled(Button)`
  border-bottom-width: 0;
`;
//마지막 버튼 아래는 선 없게 하는 코드

export const ButtonText = styled.Text`
  color: #626262;
  text-align: center;
  font-weight: bold;
`;
