import React, { useState } from "react";
import {
  View,
  Button,
  Alert,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import DatePicker from "@react-native-community/datetimepicker";
import * as S from "../../style/InfoDetailStyle";

const InfoDetail = ({ navigation }) => {
  const [name, setName] = useState("");
  const [married, setMarried] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());
  const [location, setLocation] = useState("");
  const [income, setIncome] = useState("");
  const [consentGiven, setConsentGiven] = useState(false);

  const handleNameChange = (text) => {
    setName(text);
  };

  const handleMarriedChange = (value) => {
    setMarried(value);
  };

  const handleGenderChange = (value) => {
    setGender(value);
  };

  const handleBirthDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthDate;
    setBirthDate(currentDate);
  };

  const handleLocationChange = (text) => {
    setLocation(text);
  };

  const handleIncomeChange = (text) => {
    setIncome(text);
  };

  const handleConsentToggle = () => {
    setConsentGiven(!consentGiven);
  };

  const handleSubmit = () => {
    if (!name || !gender || !birthDate || !location || !income) {
      Alert.alert("모든 항목을 입력하세요.");
      return;
    }

    console.log("Name:", name);
    console.log("Married:", married);
    console.log("Gender:", gender);
    console.log("Birth Date:", birthDate);
    console.log("Location:", location);
    console.log("Income:", income);

    navigation.navigate("InfoDetailFull");
  };

  return (
    <S.Container>
      <View>
        <S.MainText>
          정보를 입력하시면 {"\n"}동준님과 딱 맞는 정책을 알려드려요
        </S.MainText>
      </View>
      <S.Box>
        <S.TitleText>이름</S.TitleText>
        <TextInput
          onChangeText={handleNameChange}
          value={name}
          placeholder="홍길동"
          returnKeyType="done"
        />
      </S.Box>
      <S.Box>
        <S.TitleText>결혼유무</S.TitleText>
        <S.Row>
          <Button
            title="미혼"
            onPress={() => handleMarriedChange("미혼")}
            color={married === "미혼" ? "#2e4b8f" : "gray"}
          />
          <Button
            title="기혼"
            onPress={() => handleMarriedChange("기혼")}
            color={married === "기혼" ? "#2e4b8f" : "gray"}
          />
        </S.Row>
      </S.Box>
      <S.Box>
        <S.TitleText>성별</S.TitleText>
        <S.Row>
          <Button
            title="남성"
            onPress={() => handleGenderChange("남성")}
            color={gender === "남성" ? "#2e4b8f" : "gray"}
          />
          <Button
            title="여성"
            onPress={() => handleGenderChange("여성")}
            color={gender === "여성" ? "#2e4b8f" : "gray"}
          />
        </S.Row>
      </S.Box>
      <S.Box>
        <S.TitleText>생년월일</S.TitleText>
        <DatePicker
          value={birthDate}
          onChange={handleBirthDateChange}
          mode="date"
        />
      </S.Box>
      <S.Box>
        <S.TitleText>거주지역</S.TitleText>
        <TextInput
          onChangeText={handleLocationChange}
          value={location}
          placeholder="주소"
          returnKeyType="done"
        />
      </S.Box>
      <S.LastBox>
        <S.TitleText>연소득</S.TitleText>
        <S.Row>
          <TextInput
            onChangeText={handleIncomeChange}
            value={income}
            placeholder="0"
            keyboardType="numeric"
            returnKeyType="done"
          />
          <S.WonText>만원</S.WonText>
        </S.Row>
      </S.LastBox>
      <S.Text>
        입력해주신 정보를 기반으로 맞춤 정책을 추천해 드립니다.{"\n"}다른
        목적으로 사용되거나 제 3자에게 공개되지 않습니다.
      </S.Text>
      <TouchableOpacity onPress={handleConsentToggle}>
        <S.AgreementText consentGiven={consentGiven}>
          개인정보 수집 및 이용 동의
        </S.AgreementText>
      </TouchableOpacity>
      <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <S.TouchText>다음에 입력하기</S.TouchText>
        </TouchableOpacity>
      </View>
      <S.BlueButtonBox>
        <TouchableOpacity onPress={handleSubmit}>
          <S.BlueButtonText>다음</S.BlueButtonText>
        </TouchableOpacity>
      </S.BlueButtonBox>
    </S.Container>
  );
};

export default InfoDetail;
