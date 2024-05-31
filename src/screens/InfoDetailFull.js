import React, { useState } from "react";
import { TouchableOpacity, Text } from "react-native";
import * as S from "../../style/InfoDetailFullStyle";
import {
  OptionsEdu,
  OptionsCareer,
  OptionsMember,
  OptionsTarget,
} from "../../utils/InfoDetailFullData";

import axios from "axios";

const InfoDetailFull = ({ navigation }) => {
  const [selectedOptionsEdu, setSelectedOptionsEdu] = useState([]);
  const [selectedOptionsCareer, setSelectedOptionsCareer] = useState([]);
  const [selectedOptionsMember, setSelectedOptionsMember] = useState([]);
  const [selectedOptionsTarget, setSelectedOptionsTarget] = useState([]);

  const toggleOptionEdu = (option) => {
    if (selectedOptionsEdu.includes(option)) {
      setSelectedOptionsEdu(
        selectedOptionsEdu.filter((item) => item !== option)
      );
    } else {
      setSelectedOptionsEdu([option]);
    }
  };

  const toggleOptionCareer = (option) => {
    if (selectedOptionsCareer.includes(option)) {
      setSelectedOptionsCareer(
        selectedOptionsCareer.filter((item) => item !== option)
      );
    } else {
      setSelectedOptionsCareer([...selectedOptionsCareer, option]);
    }
  };

  const toggleOptionMember = (option) => {
    if (selectedOptionsMember.includes(option)) {
      setSelectedOptionsMember(
        selectedOptionsMember.filter((item) => item !== option)
      );
    } else {
      setSelectedOptionsMember([option]);
    }
  };

  const toggleOptionTarget = (option) => {
    if (selectedOptionsTarget.includes(option)) {
      setSelectedOptionsTarget(
        selectedOptionsTarget.filter((item) => item !== option)
      );
    } else {
      setSelectedOptionsTarget([option]);
    }
  };

  return (
    <S.Container>
      <S.MainText>
        동준님의 현재상황과 {"\n"}가장 알맞는 상황은 어떤 것인가요?
      </S.MainText>

      <S.TitleText>현재 직업 (중복선택 가능)</S.TitleText>
      <S.OptionsContainer>
        {OptionsEdu.map((option, index) => (
          <S.Option
            key={index}
            onPress={() => toggleOptionEdu(option)}
            style={{
              backgroundColor: selectedOptionsEdu.includes(option)
                ? "#d1d1d1"
                : "transparent",
            }}
          >
            <S.TextCenter>{option}</S.TextCenter>
          </S.Option>
        ))}
      </S.OptionsContainer>

      <S.TitleText>직장 (중복선택 가능)</S.TitleText>
      <S.OptionsContainer>
        {OptionsCareer.map((option, index) => (
          <S.Option
            key={index}
            onPress={() => toggleOptionCareer(option)}
            style={{
              backgroundColor: selectedOptionsCareer.includes(option)
                ? "#d1d1d1"
                : "transparent",
            }}
          >
            <S.TextCenter>{option}</S.TextCenter>
          </S.Option>
        ))}
      </S.OptionsContainer>

      <S.TitleText>가구원</S.TitleText>
      <S.OptionsContainer>
        {OptionsMember.map((option, index) => (
          <S.Option
            key={index}
            onPress={() => toggleOptionMember(option)}
            style={{
              backgroundColor: selectedOptionsMember.includes(option)
                ? "#d1d1d1"
                : "transparent",
            }}
          >
            <S.TextCenter>{option}</S.TextCenter>
          </S.Option>
        ))}
      </S.OptionsContainer>

      <S.TitleText>대상 특성</S.TitleText>
      <S.OptionsContainer>
        {OptionsTarget.map((option, index) => (
          <S.Option
            key={index}
            onPress={() => toggleOptionTarget(option)}
            style={{
              backgroundColor: selectedOptionsTarget.includes(option)
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
