import React, { useState } from "react";
import { TouchableOpacity, Text } from "react-native";
import * as S from "../../style/InfoDetailFullStyle";

const Options1 = ["직장인", "대학생", "신혼부부", "취업 준비생"];
const Options2 = ["1인가구", "2인가구", "3인가구", "4인가구", "기타"];

const InfoDetailFull = ({ navigation }) => {
  const [selectedOptions1, setSelectedOptions1] = useState([]);
  const [selectedOptions2, setSelectedOptions2] = useState([]);

  const toggleOption1 = (option) => {
    if (selectedOptions1.includes(option)) {
      setSelectedOptions1(selectedOptions1.filter((item) => item !== option));
    } else {
      setSelectedOptions1([...selectedOptions1, option]);
    }
  };

  const toggleOption2 = (option) => {
    if (selectedOptions2.includes(option)) {
      // 이미 선택된 경우, 선택을 해제합니다.
      setSelectedOptions2(selectedOptions2.filter((item) => item !== option));
    } else {
      // 선택되지 않은 경우에만 선택합니다.
      setSelectedOptions2([option]);
    }
  };

  return (
    <S.Container>
      <S.MainText>
        동준님의 현재상황과 {"\n"}가장 알맞는 상황은 어떤 것인가요?
      </S.MainText>

      <S.TitleText>현재 직업 (중복선택 가능)</S.TitleText>
      <S.OptionsContainer>
        {Options1.map((option, index) => (
          <S.Option
            key={index}
            onPress={() => toggleOption1(option)}
            style={{
              backgroundColor: selectedOptions1.includes(option)
                ? "#d1d1d1"
                : "transparent",
            }}
          >
            <S.TextCenter>{option}</S.TextCenter>
          </S.Option>
        ))}
      </S.OptionsContainer>

      <S.TitleText>가구 수</S.TitleText>
      <S.OptionsContainer>
        {Options2.map((option, index) => (
          <S.Option
            key={index}
            onPress={() => toggleOption2(option)}
            style={{
              backgroundColor: selectedOptions2.includes(option)
                ? "#d1d1d1"
                : "transparent",
            }}
          >
            <S.TextCenter>{option}</S.TextCenter>
          </S.Option>
        ))}
      </S.OptionsContainer>
      <S.BlueButtonBox>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <S.BlueButtonText>완료</S.BlueButtonText>
        </TouchableOpacity>
      </S.BlueButtonBox>
    </S.Container>
  );
};

export default InfoDetailFull;
