import styled from "styled-components";

export const Container = styled.View`
  flex: 1;
  background-color: #f2f3f8;
  padding-horizontal: 20px;
  margin-top: 50px;
`;

export const OptionsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const Option = styled.TouchableOpacity`
  border-width: 1px;
  border-color: #c4c3c3;
  padding: 10px;
  margin: 5px;
  width: 45%;
`;

export const selectedOption = styled(Option)`
  background-color: #d1d1d1;
`;

export const MainText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #2e4b8f;
  padding: 5px;
  margin-bottom: 50px;
`;

export const TitleText = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: #626262;
  padding: 5px;
`;

export const TextCenter = styled.Text`
  text-align: center;
  color: #626262;
`;

export const BlueButtonText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
  padding: 5px;
  text-align: center;
`;

export const BlueButtonBox = styled.View`
  background-color: #2e4b8f;
  border-radius: 8px;
  padding: 10px;
`;
