import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import * as S from "../../style/LoginStyle";
//import axios from 'axios';

const SignUp = () => {
  /*const [Firstname, setFirstname] = useState("");
  const [Lastname, setLastname] = useState("");
  const [Id, setId] = useState("");
  const [Password, setPassword] = useState("");
  const [Phone, setPhone] = useState("");*/

  /*const SignUp = () => {
    axios.post('http://192.168.35.39:8080/user_info/Signup',{
      first_name:Firstname,
      last_name:Lastname,
      id:Id,
      password:Password,
      phone:Phone,
    })
    .then(response=>{
      console.log('회원가입완료')
    })
    .catch(error =>{
      console.log(error)
    })
  }*/

  return (
    <View
      style={{
        backgroundColor: "white",
        paddingBottom: 270,
        paddingTop: "15%",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          marginBottom: 15,
        }}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <Text
            style={{
              marginLeft: 10,
              marginTop: 30,
              marginBottom: 10,
              fontSize: 17,
            }}
          >
            이름
          </Text>
          <View
            style={{ flexDirection: "row", paddingStart: 9, marginBottom: 15 }}
          >
            <S.Signup_FstName
              placeholder="성을 입력해주세요." /*value={Firstname} onChangeText={setFirstname}*/
            ></S.Signup_FstName>
            <S.Signup_lstName
              placeholder="이름을 입력해주세요." /*value={Lastname} onChangeText={setLastname}*/
            ></S.Signup_lstName>
          </View>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          marginBottom: 15,
        }}
      >
        <View
          style={{
            flex: 1,
            marginBottom: 15,
          }}
        >
          <Text
            style={{
              marginLeft: 10,
              marginTop: 5,
              fontSize: 17,
              marginBottom: 10,
            }}
          >
            아이디
          </Text>
          <View
            style={{
              marginLeft: 10,
              flexDirection: "row",
              paddingEnd: 26,
            }}
          >
            <S.Signup_Id
              placeholder="아이디를 입력해주세요." /*value={Id} onChangeText={setId}*/
            ></S.Signup_Id>

            <TouchableOpacity>
              <S.Id_Duplicate
                style={{
                  backgroundColor: "#EEEEEE",
                  justifyContent: "center",
                  alignItems: "center", //중복환인칸 속 내부
                }}
              >
                <Text>중복확인</Text>
              </S.Id_Duplicate>
            </TouchableOpacity>
          </View>

          <Text
            style={{
              paddingLeft: 20,
              fontSize: 12,
            }}
          >
            *6~12자 영문/소문자(숫자 조합 가능)
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          marginBottom: 15,
        }}
      >
        <View
          style={{
            flex: 1,
            marginBottom: 15,
            paddingStart: 10,
          }}
        >
          <Text
            style={{
              marginLeft: 0,
              marginTop: 5,
              fontSize: 17,
              marginBottom: 10,
            }}
          >
            비밀번호
          </Text>
          <View
            style={{
              flexDirection: "column",
            }}
          >
            <S.Signup_password
              placeholder="비밀번호를 입력해주세요."
              secureTextEntry={
                true
              } /*value={Password}*/ /*onChangeText={setPassword}*/
            ></S.Signup_password>
            <S.Signup_passwordChk
              placeholder="비밀번호 확인"
              secureTextEntry={true}
            ></S.Signup_passwordChk>
          </View>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          marginBottom: 15,
        }}
      >
        <View
          style={{
            flex: 1,
            marginBottom: 15,
          }}
        >
          <Text
            style={{
              marginLeft: 10,
              marginTop: 5,
              fontSize: 17,
              marginBottom: 10,
            }}
          >
            휴대폰번호
          </Text>
          <View
            style={{
              flexDirection: "column",
              paddingLeft: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <S.Signup_Phone
                placeholder="휴대폰번호를 입력해주세요." /*value={Phone} onChangeText={setPhone}*/
              ></S.Signup_Phone>

              <S.Auth_get
                style={{
                  backgroundColor: "#EEEEEE",
                  justifyContent: "center",
                  alignItems: "center", //인증번호받기 속 내부
                  marginLeft: 6,
                }}
              >
                <Text>인증번호 받기</Text>
              </S.Auth_get>
            </View>
            <S.Signup_Auth placeholder="인증번호를 입력해주세요."></S.Signup_Auth>
          </View>
        </View>
      </View>

      <S.Signup_Finish
        style={{
          backgroundColor: "#2D4B8E",
        }}
      >
        <TouchableOpacity
          style={{
            width: "100%", // 전체 너비를 차지하도록 수정
            alignItems: "center", // 수평 정렬
            justifyContent: "center", // 수직 정렬
            borderRadius: 10,
            height: 45,
          }}
          onPress={() => SignUp()}
        >
          <Text style={{ color: "white", fontSize: 15 }}>회원가입 완료</Text>
        </TouchableOpacity>
      </S.Signup_Finish>
    </View>
  );
};

export default SignUp;
