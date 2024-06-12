import React, { useContext, useEffect, useState } from "react";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import * as S from "../../style/InfoDetailFullStyle";
import {
  OptionsEdu,
  OptionsCareer,
  OptionsMember,
  OptionsTarget,
} from "../../utils/InfoDetailFullData";
import axios from "axios";
import { UserContext } from "../components/UserProvider";
import { SERVER_URL } from "../components/ServerAddress";
import AsyncStorage from "@react-native-async-storage/async-storage";

import HeaderComponent from "../components/HeaderComponent";

const InfoDetailFull = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const [selectedOptionsEdu, setSelectedOptionsEdu] = useState([]);
  const [selectedOptionsCareer, setSelectedOptionsCareer] = useState([]);
  const [selectedOptionsMember, setSelectedOptionsMember] = useState([]);
  const [selectedOptionsTarget, setSelectedOptionsTarget] = useState([]);

  const userId = user.id;

  const toggleOption = (option, setSelectedOptions) => {
    setSelectedOptions((prevOptions) =>
      prevOptions.includes(option)
        ? prevOptions.filter((item) => item !== option)
        : [option]
    );
  };
  const InfoDetailFullSubmit = async () => {
    const id = await AsyncStorage.getItem("id");

    try {
      const response = await axios.post(`${SERVER_URL}/users/insertFull`, {
        id: id,
        HighestEducation: selectedOptionsEdu,
        CurrentJob: selectedOptionsCareer,
        ResidentialStatus: selectedOptionsMember,
        Special: selectedOptionsTarget,
      });
      console.log("회원정보 입력 완료", response.data);
      navigation.navigate("BottomBar"); // 로그인 성공시 메인으로 이동
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      const id = await AsyncStorage.getItem("id");
      try {
        const response = await axios.get(`${SERVER_URL}/users/selectFull`, {
          params: {
            userId: id,
          },
        });
        const data = response.data;
        console.log("User details:", data);

        if (data && data.length > 0) {
          setSelectedOptionsEdu(data[0].HighestEducation);
          setSelectedOptionsCareer(data[0].CurrentJob);
          setSelectedOptionsMember(data[0].ResidentialStatus);
          setSelectedOptionsTarget(data[0].Special);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <S.Container>
        <View style={{ marginHorizontal: -20 }}>
          <HeaderComponent
            onPress={() => navigation.goBack()}
            headerText="상세 정보 입력하기"
          />
        </View>
        <S.MainText>
          {user.name}님의 현재상황과 {"\n"}가장 알맞는 상황은 어떤 것인가요?
        </S.MainText>

        <S.TitleText>최종 학력</S.TitleText>
        <S.OptionsContainer>
          {OptionsEdu.map((option, index) => (
            <S.Option
              key={index}
              onPress={() => toggleOption(option, setSelectedOptionsEdu)}
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

        <S.TitleText>현재 직업</S.TitleText>
        <S.OptionsContainer>
          {OptionsCareer.map((option, index) => (
            <S.Option
              key={index}
              onPress={() => toggleOption(option, setSelectedOptionsCareer)}
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

        <S.TitleText>주거 상태</S.TitleText>
        <S.OptionsContainer>
          {OptionsMember.map((option, index) => (
            <S.Option
              key={index}
              onPress={() => toggleOption(option, setSelectedOptionsMember)}
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

        <S.TitleText>대상 특성 (중복선택 가능)</S.TitleText>
        <S.OptionsContainer>
          {OptionsTarget.map((option, index) => (
            <S.Option
              key={index}
              onPress={() => toggleOption(option, setSelectedOptionsTarget)}
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
          <TouchableOpacity onPress={InfoDetailFullSubmit}>
            <S.BlueButtonText>완료</S.BlueButtonText>
          </TouchableOpacity>
        </S.BlueButtonBox>
      </S.Container>
    </ScrollView>
  );
};

export default InfoDetailFull;
