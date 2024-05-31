import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Button,
  Alert,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import DatePicker from "@react-native-community/datetimepicker";
import * as S from "../../style/InfoDetailStyle";
import { cities, districts } from "../../utils/InfoDetailData";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";
import { SERVER_URL } from "../components/ServerAddress";
import { UserContext } from "../components/UserProvider";

const InfoDetail = ({ navigation }) => {
  const [name, setName] = useState("");
  const [married, setMarried] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());
  const [income, setIncome] = useState("");
  const [consentGiven, setConsentGiven] = useState(false); //개인정보 동의
  const [selectedCity, setSelectedCity] = useState(null); //시/도
  const [selectedDistrict, setSelectedDistrict] = useState(null); //null 이었는데 일단 바꿈
  const { userDataP, setUserDataP } = useContext(UserContext);

  const handleBirthDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthDate;
    setBirthDate(currentDate);
  };

  const handleConsentToggle = () => {
    setConsentGiven(!consentGiven);
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
    setSelectedDistrict(null);
  };

  const handleDistrictChange = (district) => {
    setSelectedDistrict(district);
  };

  const InfoDetailSubmit = () => {
    console.log("보내는 데이터:", {
      Name: name,
      Married: married,
      Gender: gender,
      BirthDate: birthDate,
      Income: income,
      ConsentGiven: consentGiven,
      City: selectedCity,
      District: selectedDistrict,
    });
    //서버 연결은 안되는데 콘솔에서는 정보 받아옴.

    axios
      .post(`${SERVER_URL}/detail/insert`, {
        Name: name,
        Married: married,
        Gender: gender,
        BirthDate: birthDate,
        Income: income,
        ConsentGiven: consentGiven,
        City: selectedCity,
        District: selectedDistrict,
      })
      .then((response) => {
        console.log("회원정보 입력 완료");
      })
      .catch((error) => {
        console.log("에러 발생:", error);
      });
  };

  // const handleSubmit = () => {
  //   if (!name || !gender || !birthDate || !income) {
  //     Alert.alert("모든 항목을 입력하세요.");
  //     return;
  //   }
  //   console.log("Name:", name);
  //   console.log("Married:", married);
  //   console.log("Gender:", gender);
  //   console.log("Birth Date:", birthDate);
  //   console.log("District:", selectedDistrict);
  //   console.log("Income:", income);
  //   navigation.navigate("InfoDetailFull");
  // };
  useEffect(() => {
    if (userDataP && userDataP.name) {
      setName(userDataP.name);
    }
  }, [userDataP]);

  console.log(name);
  return (
    <S.Container>
      <View>
        <S.MainText>
          정보를 입력하시면 {"\n"}
          {userDataP ? userDataP.name : "묘사"}님과 딱 맞는 정책을 알려드려요
        </S.MainText>
      </View>
      <S.Box>
        <S.TitleText>이름</S.TitleText>
        <TextInput
          onChangeText={setName}
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
            onPress={() => setMarried("미혼")}
            color={married === "미혼" ? "#2e4b8f" : "gray"}
          />
          <Button
            title="기혼"
            onPress={() => setMarried("기혼")}
            color={married === "기혼" ? "#2e4b8f" : "gray"}
          />
        </S.Row>
      </S.Box>
      <S.Box>
        <S.TitleText>성별</S.TitleText>
        <S.Row>
          <Button
            title="남성"
            onPress={() => setGender("남성")}
            color={gender === "남성" ? "#2e4b8f" : "gray"}
          />
          <Button
            title="여성"
            onPress={() => setGender("여성")}
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
        <View style={{ flexDirection: "row" }}>
          <View style={{ marginRight: 10 }}>
            <View style={styles.Picker}>
              <RNPickerSelect
                onValueChange={handleCityChange}
                items={cities}
                placeholder={{ label: "시/도", value: null }}
                value={selectedCity}
              />
            </View>
          </View>

          <View style={styles.Picker}>
            <RNPickerSelect
              onValueChange={handleDistrictChange}
              items={
                selectedCity
                  ? districts[selectedCity].map((d) => ({
                      label: d,
                      value: d,
                    }))
                  : []
              }
              placeholder={{ label: "구/군", value: null }}
              value={selectedDistrict}
              disabled={!selectedCity}
            />
          </View>
        </View>
      </S.Box>
      <S.LastBox>
        <S.TitleText>연소득</S.TitleText>
        <S.Row>
          <TextInput
            onChangeText={setIncome}
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
        <TouchableOpacity onPress={() => InfoDetailSubmit()}>
          <S.BlueButtonText>다음</S.BlueButtonText>
        </TouchableOpacity>
      </S.BlueButtonBox>
    </S.Container>
  );
};

const styles = StyleSheet.create({
  Picker: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#c4c3c3",
    marginTop: 5,
    marginBottom: 10,
    //backgroundColor: "white",
  },
});

export default InfoDetail;
