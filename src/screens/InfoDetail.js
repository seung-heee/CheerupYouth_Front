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
import { cities, districts, incomeOptions } from "../../utils/InfoDetailData";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";
import { SERVER_URL } from "../components/ServerAddress";
import { UserContext } from "../components/UserProvider";
import HeaderComponent from "../components/HeaderComponent";

const InfoDetail = ({ navigation, route }) => {
  const { user } = useContext(UserContext);
  const [name, setName] = useState(user.name);
  const [married, setMarried] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());
  const [selectedIncome, setSelectedIncome] = useState("");

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
    console.log(income);
  };

  const InfoDetailSubmit = async () => {
    try {
      const id = await AsyncStorage.getItem("id");
      const response = await axios.post(`${SERVER_URL}/users/insert`, {
        id: id,
        Name: name,
        Married: married,
        Gender: gender,
        BirthDate: birthDate,
        Income: selectedIncome,
        ConsentGiven: consentGiven,
        City: selectedCity,
        District: selectedDistrict,
      });
      console.log("회원정보 입력 완료", response);
      navigation.navigate("InfoDetailFull");
    } catch (error) {
      console.log("에러 발생:", error);
    }
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
        console.log(selectedIncome);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <S.Container>
      <HeaderComponent
        onPress={() => navigation.goBack()}
        headerText="상세 정보 입력하기"
      />
      <View>
        <S.MainText>
          정보를 입력하시면 {"\n"}
          {user ? user.name : "로그인"}님과 딱 맞는 정책을 알려드려요
        </S.MainText>
      </View>
      <S.Box>
        <S.TitleText>이름</S.TitleText>
        <TextInput
          style={{ fontSize: 15 }}
          onChangeText={setName}
          value={name}
          placeholder="이름"
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
                placeholder={{ label: "시/도", value: null, color: "gray" }}
                value={selectedCity}
                textInputProps={{ style: { fontSize: 15 } }} // 글씨 크기 지정
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
              placeholder={{ label: "구/군", value: null, color: "gray" }}
              value={selectedDistrict}
              disabled={!selectedCity}
              textInputProps={{ style: { fontSize: 15 } }} // 글씨 크기 지정
            />
          </View>
        </View>
      </S.Box>
      <S.LastBox>
        <S.TitleText>월소득</S.TitleText>
        <S.Row>
          {/* <TextInput
            onChangeText={setIncome}
            value={income}
            placeholder="0"
            keyboardType="numeric"
            returnKeyType="done"
          />
          <S.WonText>만원</S.WonText> */}
          <View style={styles.Picker}>
            <RNPickerSelect
              onValueChange={handleIncomeSelect}
              items={incomeOptions}
              placeholder={{
                label: selectedIncome || "소득 구간을 선택하세요",
                value: null,
                color: "gray",
              }}
              value={selectedIncome}
              textInputProps={{ style: { fontSize: 15 } }} // 글씨 크기 지정
            />
          </View>
        </S.Row>
      </S.LastBox>
      <S.Text>
        입력해주신 정보를 기반으로 맞춤 정책을 추천해 드립니다.{"\n"}다른
        목적으로 사용되거나 제 3자에게 공개되지 않습니다.
      </S.Text>
      <View
        style={{
          alignItems: "center",
          padding: 5,
          marginBottom: 20,
        }}
      >
        <TouchableOpacity onPress={handleConsentToggle}>
          <Text
            style={{
              color: consentGiven ? "#2e4b8f" : "#626262",
              fontWeight: "bold",
            }}
          >
            [필수] 개인정보 수집 및 이용 동의
          </Text>
        </TouchableOpacity>
      </View>

      {/* <View
        style={{ alignItems: "center", justifyContent: "center", padding: 15 }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text
            style={{ textAlign: "center", textDecorationLine: "underline" }}
          >
            다음에 입력하기
          </Text>
        </TouchableOpacity>
      </View> */}
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
    marginTop: 5,
    marginBottom: 10,
  },
});

export default InfoDetail;
