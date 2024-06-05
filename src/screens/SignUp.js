import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, TextInput } from "react-native";
import * as S from "../../style/LoginStyle";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { SERVER_URL } from "../components/ServerAddress";
import HeaderComponent from "../components/HeaderComponent";

const SignUp = () => {
  const navigation = useNavigation();
  const [Firstname, setFirstname] = useState("");
  const [Lastname, setLastname] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Contact, setContact] = useState("");
  const [EmailStatus, setEmailStatus] = useState("");
  const [EmailStatusColor, setEmailStatusColor] = useState("");
  const [EmailStyle, setEmailStyle] = useState(true);
  const [PasswordStatus, setPasswordStatus] = useState("");
  const [PasswordStatusColor, setPasswordStatusColor] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const showAlert = (msg, onSuccess = null) => {
    Alert.alert("알림", msg, [{ text: "확인", onPress: onSuccess }]);
  };

  const checkEmail = () => {
    if (!Email) {
      setEmailStatus("이메일을 입력 해주세요.");
      setEmailStatusColor("red");
      setEmailStyle(false);
      return;
    }
    if (!Email.includes("@")) {
      setEmailStatus("이메일 형식을 올바르게 입력해주세요.");
      setEmailStatusColor("red");
      setEmailStyle(false);
      return;
    }

    axios
      .post(`${SERVER_URL}/signup/select`, {
        id: Email,
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        if (data.exists) {
          setEmailStatus("사용할 수 없는 이메일이에요.");
          setEmailStatusColor("red");
        } else {
          setEmailStatus("사용할 수 있는 이메일이에요!");
          setEmailStatusColor("green");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$_!%*?&])[A-Za-z\d@$_!%*?&]{6,}$/;
    return regex.test(password);
  };

  const checkPassword = (password) => {
    console.log(password);
    if (!validatePassword(password)) {
      setPasswordStatus(
        "최소 6자리, 영어 대소문자, 숫자, 특수문자 중 1개를 포함해야 합니다."
      );
      setPasswordStatusColor("red");
    } else {
      setPasswordStatus("사용 가능한 비밀번호에요!");
      setPasswordStatusColor("green");
    }
  };

  const handlePasswordChange = (password) => {
    setPassword(password);
    checkPassword(password);
  };

  const handleSignUp = () => {
    if (Firstname && Lastname && Email && Password && Contact) {
      axios
        .post(`${SERVER_URL}/signup/insert`, {
          first_name: Firstname,
          last_name: Lastname,
          id: Email,
          password: Password,
          contact: Contact,
        })
        .then((response) => {
          console.log("회원가입완료");
          showAlert("회원가입 완료", () => navigation.goBack());
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      showAlert("모든 정보를 입력해 주세요.");
      console.log("회원가입 불가");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const backBtn = () => {
    navigation.navigate("LoginScreen");
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <HeaderComponent onPress={backBtn} headerText="회원가입" />
      <View style={{ margin: 25, marginBottom: 0, marginTop: 10 }}>
        <View style={{ marginBottom: 10 }}>
          <Text
            style={{
              margin: 10,
              fontSize: 17,
            }}
          >
            이름
          </Text>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <TextInput
              style={{
                backgroundColor: "#F7F7F7",
                padding: 15,
                borderRadius: 10,
                marginVertical: 5,
                fontSize: 15,
                width: "40%",
              }}
              placeholder="성을 입력해주세요."
              value={Firstname}
              onChangeText={setFirstname}
            />
            <TextInput
              style={{
                backgroundColor: "#f7f7f7",
                padding: 15,
                borderRadius: 10,
                marginVertical: 5,
                fontSize: 15,
                marginLeft: "2%",
                width: "58%",
              }}
              placeholder="이름을 입력해주세요."
              value={Lastname}
              onChangeText={setLastname}
            />
          </View>
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text
            style={{
              fontSize: 17,
              margin: 10,
            }}
          >
            이메일
          </Text>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              placeholder="이메일을 입력해주세요."
              value={Email}
              onChangeText={setEmail}
              style={{
                backgroundColor: "#f7f7f7",
                padding: 15,
                borderRadius: 10,
                marginVertical: 5,
                fontSize: 15,
                width: "70%",
              }}
            />
            <TouchableOpacity
              onPress={checkEmail}
              style={{
                backgroundColor: "#EEEEEE",
                justifyContent: "center",
                alignItems: "center",
                marginVertical: 5,
                borderRadius: 10,
                marginLeft: "2%",
                width: "28%",
              }}
            >
              <Text>중복확인</Text>
            </TouchableOpacity>
          </View>

          {!EmailStyle && (
            <View
              style={{
                margin: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: EmailStatusColor || "white",
                }}
              >
                {EmailStatus}
              </Text>
            </View>
          )}
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text
            style={{
              fontSize: 17,
              margin: 10,
            }}
          >
            비밀번호
          </Text>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              style={{
                backgroundColor: "#f7f7f7",
                padding: 15,
                borderRadius: 10,
                marginVertical: 5,
                fontSize: 15,
                width: "80%",
              }}
              placeholder="비밀번호를 입력해주세요."
              secureTextEntry={!passwordVisible}
              value={Password}
              onChangeText={handlePasswordChange} // 비밀번호 변경 시 handlePasswordChange 호출
            />
            <View
              style={{
                backgroundColor: "#f7f7f7",
                marginVertical: 5,
                borderRadius: 10,
                width: "25%",
                marginLeft: "-5%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity onPress={togglePasswordVisibility}>
                <Text style={{ fontSize: 35 }}>
                  {passwordVisible ? "🙉" : "🙈"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {Password && (
            <View style={{ margin: 10 }}>
              <Text
                style={{
                  fontSize: 12,
                  color: PasswordStatusColor || "white",
                }}
              >
                {PasswordStatus}
              </Text>
            </View>
          )}

          <View>
            <TextInput
              style={{
                backgroundColor: "#f7f7f7",
                padding: 15,
                borderRadius: 10,
                marginVertical: 5,
                fontSize: 15,
                width: "100%",
              }}
              placeholder="비밀번호 확인"
              secureTextEntry={true}
            />
          </View>
        </View>

        <View>
          <Text
            style={{
              fontSize: 17,
              margin: 10,
            }}
          >
            휴대폰번호
          </Text>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              style={{
                backgroundColor: "#f7f7f7",
                padding: 15,
                borderRadius: 10,
                marginVertical: 5,
                fontSize: 15,
                width: "70%",
              }}
              placeholder="휴대폰번호를 입력해주세요."
              value={Contact}
              onChangeText={setContact}
            />
            <TouchableOpacity
              onPress={() => {}}
              style={{
                backgroundColor: "#EEEEEE",
                justifyContent: "center",
                alignItems: "center",
                marginVertical: 5,
                borderRadius: 10,
                marginLeft: "2%",
                width: "28%",
              }}
            >
              <Text>인증번호 받기</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={{
              backgroundColor: "#f7f7f7",
              padding: 15,
              borderRadius: 10,
              marginVertical: 5,
              fontSize: 15,
              width: "100%",
            }}
            placeholder="인증번호를 입력해주세요."
          />
        </View>

        <View style={{ alignItems: "center", marginTop: 100 }}>
          <TouchableOpacity
            style={{
              width: "90%",
              height: 55,
              padding: 15,
              backgroundColor: "#2D4B8E",
              borderRadius: 30,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={handleSignUp}
          >
            <Text style={{ fontSize: 18, fontFamily: "B", color: "white" }}>
              회원가입 완료
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignUp;
