import React, { useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

import axios from "axios";
import { SERVER_URL } from "../components/ServerAddress";
import { UserContext } from "../components/UserProvider";

const InfoDetail = ({ navigation, route }) => {
  const { user } = useContext(UserContext);
  const [name, setName] = useState(user.name);
  const [married, setMarried] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());
  const [selectedIncome, setSelectedIncome] = useState(null);

  const [consentGiven, setConsentGiven] = useState(false); //개인정보 동의
  const [selectedCity, setSelectedCity] = useState(null); //시/도
  const [selectedDistrict, setSelectedDistrict] = useState(null); //null 이었는데 일단 바꿈
  // const { userDataP, setUserDataP } = useContext(UserContext);

  const userId = user.id;

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

  const handleIncomeSelect = (income) => {
    setSelectedIncome(income);
  };

  const InfoDetailSubmit = () => {
    console.log("보내는 데이터:", {
      Id: userId,
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

    navigation.navigate("infoDetailFull");
    axios
      .post(`${SERVER_URL}/users/insert`, {
        id: userId,
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

  useEffect(() => {
    if (user && user.name) {
      setName(user.name);
    }

    const fetchUserDetails = async () => {
      try {
        const id = await AsyncStorage.getItem("id");
        const response = await axios.get(`${SERVER_URL}/users/select`, {
          params: {
            userId: id,
          },
        });
        const data = response.data;
        console.log("User details:", data);

        if (data && data.length > 0) {
          setName(data[0].Name);
          setMarried(data[0].Married);
          setGender(data[0].Gender);
          setSelectedIncome(data[0].Income);
          setSelectedCity(data[0].City);
          setSelectedDistrict(data[0].District);
          setBirthDate(new Date(data[0].BirthDate));
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <S.Container>
      <View>
        <S.MainText>정보 수정</S.MainText>
      </View>
      <S.Box>
        <S.TitleText>이름</S.TitleText>
        <TextInput
          onChangeText={setName}
          value={name}
          placeholder="이름"
          returnKeyType="done"
        />
      </S.Box>
      <S.Box>
        <S.TitleText>결혼유무</S.TitleText>
      </S.Box>
      <S.Box>
        <S.TitleText>성별</S.TitleText>
      </S.Box>
      <S.Box>
        <S.TitleText>생년월일</S.TitleText>
      </S.Box>
      <S.Box>
        <S.TitleText>월소득</S.TitleText>
      </S.Box>
      <S.Box>
        <S.TitleText>최종 학력</S.TitleText>
      </S.Box>

      <S.Box>
        <S.TitleText>현재 직업</S.TitleText>
      </S.Box>

      <S.Box>
        <S.TitleText>생년월일</S.TitleText>
      </S.Box>

      <S.LastBox>
        <S.TitleText>대상특성</S.TitleText>
      </S.LastBox>

      <S.BlueButtonBox style={{ marginTop: 20 }}>
        <TouchableOpacity onPress={() => InfoDetailSubmit()}>
          <S.BlueButtonText>수정</S.BlueButtonText>
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
