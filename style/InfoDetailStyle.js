import styled from "styled-components";

export const Container = styled.View`
  flex: 1;
  background-color: #f2f3f8;
  padding-horizontal: 20px;
  margin-top: 50px;
`;

export const MainText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #2e4b8f;
  padding: 5px;
  margin-top: 50px;
  margin-bottom: 20px;
`;

export const TitleText = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: #626262;
  padding: 5px;
`;

export const Box = styled.View`
  height: 65px;
  border-width: 1px;
  border-color: #c4c3c3;
  padding: 10px;
  flex-direction: row;
  justify-content: space-between;
  border-bottom-width: 0;
  align-items: center;
`;

export const LastBox = styled.View`
  align-items: center;
  height: 65px;
  border-width: 1px;
  border-color: #c4c3c3;
  padding: 10px;
  flex-direction: row;
  justify-content: space-between;
`;

export const Row = styled.View`
  flex-direction: row;
`;

export const Text = styled.Text`
  color: #626262;
  padding: 5px;
  margin-top: 30px;
  margin-bottom: 20px;
  text-align: center;
`;

export const AgreementText = styled.Text`
  color: ${({ consentGiven }) => (consentGiven ? "#2e4b8f" : "black")};
  padding: 5px;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
  font-weight: bold;
`;

export const TouchText = styled.Text`
  color: #626262;
  padding: 5px;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
  text-decoration: underline;
  text-decoration-color: #626262;
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

export const WonText = styled.Text`
  font-size: 15px;
  color: #626262;
  padding: 5px;
`;
