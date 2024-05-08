import React, { useState, useEffect, useContext, useCallback } from "react";
import { Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import daechuData from "../../../utils/daechuData";

import axios from "axios";
import { SERVER_URL } from "../../components/ServerAddress";
import { UserContext } from "../../components/UserProvider";

function formatCurrency(amount) {
  if (amount >= 100000000) {
    const eok = Math.floor(amount / 100000000);
    const remainder = amount % 100000000;
    if (remainder === 0) {
      return `${eok}억`;
    } else {
      return `${eok}억${formatCurrency(remainder)}`;
    }
  } else if (amount >= 10000) {
    const man = Math.floor(amount / 10000);
    const remainder = amount % 10000;
    if (remainder === 0) {
      return `${man}만`;
    } else {
      return `${man}만${remainder}`;
    }
  } else {
    return amount.toString();
  }
}
function TutorialViewPg1({ navigation }) {
  const [inputMyValue, setInputMyValue] = useState("");
  const [selectedDaechu, setselectedDaechu] = useState("");
  // const [fontLoaded, setFontLoaded] = useState(false);
  const { userDataP, setUserDataP } = useContext(UserContext);
  const [userdata, setUserData] = useState({});

  useEffect(() => {
    axios
      .post(`${SERVER_URL}/user_T1/select`, {
        user_id: userDataP ? userDataP.id : null,
      })
      .then((response) => {
        const userdata = response.data;
        setUserData(userdata);
        console.log(userdata);
      });
  }, [userDataP]);

  useEffect(() => {
    if (userdata && userdata.length > 0) {
      setInputMyValue(JSON.stringify(userdata[0].user_inputValue));
      setselectedDaechu(userdata[0].user_selectedDaechu);
    }
  }, [userdata]);

  const dbControl = (pgname) => {
    const useableMoney = formatCurrency(sum);
    const userDataT1 = {
      user_id: userDataP ? userDataP.id : null,
      user_useableMoney: useableMoney,
      user_selectedDaechu: selectedDaechu,
      user_inputValue: inputMyValue,
    };
    if (userdata === null) {
      navigation.navigate(pgname);
    } else if (userdata && userdata.length > 0) {
      axios
        .post(`${SERVER_URL}/user_T1/update`, userDataT1)
        .then((response) => {
          navigation.navigate(pgname);
        })
        .catch((error) => {
          console.error("Error update data:", error);
        });
    } else {
      axios
        .post(`${SERVER_URL}/user_T1/insert`, userDataT1)
        .then((response) => {
          navigation.navigate(pgname);
        })
        .catch((error) => {
          console.error("Error saving data:", error);
        });
    }
  };
  const nextBtn = () => {
    dbControl("TVP2");
  };
  const backBtn = () => {
    dbControl("TutorialScreen");
  };

  // useEffect(() => {
  //   const loadFont = async () => {
  //     await Font.loadAsync({
  //       M: require('../../../assets/fonts/AppleSDGothicNeoM.ttf'),
  //       B: require('../../../assets/fonts/AppleSDGothicNeoB.ttf'),
  //       SB: require('../../../assets/fonts/AppleSDGothicNeoSB.ttf'),
  //       R: require('../../../assets/fonts/AppleSDGothicNeoR.ttf'),
  //     });
  //     setFontLoaded(true);
  //   };

  //   loadFont();
  // }, []);

  // if (!fontLoaded) {
  //   return null; // or render a loading indicator
  // }

  const handleInputChange = (text) => {
    setInputMyValue(text);
  };

  const selectedinputMyValue = inputMyValue ? parseFloat(inputMyValue) : 0;

  const FindDaechuValue = daechuData.find(
    (daechu) => daechu.label === selectedDaechu
  );

  const selectedFindDaechuValue = FindDaechuValue
    ? parseFloat(FindDaechuValue.value)
    : 0;
  const addAmount = (amount) => {
    setInputMyValue((prevValue) =>
      prevValue ? `${parseFloat(prevValue) + amount}` : `${amount}`
    );
  };
  const sum = selectedinputMyValue + selectedFindDaechuValue;

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          backgroundColor: "white",
          paddingTop: 70,
          marginBottom: 1,
          shadowColor: "rgba(180,180,180,0.4)",
          shadowOffset: {
            width: 2,
            height: 2,
          },
          shadowOpacity: 10,
          shadowRadius: 3,
          elevation: 5,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => {
              backBtn();
            }}
          >
            <Image
              style={{
                width: 20,
                height: 20,
                marginTop: 7,
                marginLeft: 14,
                marginBottom: 20,
              }}
              source={require("../../../assets/images/arrowLeft.png")}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              fontFamily: "M",
              marginTop: 4,
              marginLeft: 15,
            }}
          >
            전세 계약 튜토리얼
          </Text>
        </View>
      </View>

      <View style={{ margin: 15, marginTop: 20, marginBottom: 0 }}>
        <View
          style={{
            backgroundColor: "rgba(45,75,145,1.0)",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20,
            width: "18%",
            padding: 5,
          }}
        >
          <Text
            style={{
              fontFamily: "SB",
              color: "white",
              fontSize: 15,
            }}
          >
            STEP 1
          </Text>
        </View>
      </View>
      <View style={{ margin: 15, marginBottom: 10, marginTop: 5 }}>
        <Text
          style={{
            fontFamily: "B",
            fontSize: 20,
          }}
        >
          나의 예산 알아보기
        </Text>
      </View>
      <View style={{ width: "80%" }}>
        <Text
          style={{
            color: "gray",
            fontSize: 15,
            fontFamily: "M",
            margin: 5,
            marginLeft: 15,
          }}
        >
          본인의 가용 자본과 이용할 대출 가능 금액 을 합쳐서 예산을
          확인해야해요!
        </Text>
      </View>

      <View
        style={{
          marginTop: 15,
          marginRight: 10,
          marginLeft: 10,
          height: 1,
          backgroundColor: "rgba(237,237,237,1.0)",
        }}
      />

      <View style={{ margin: 15, marginTop: 20, marginBottom: 15 }}>
        <Text
          style={{
            fontFamily: "SB",
            fontSize: 20,
          }}
        >
          가용 예산을 알려주세요.
        </Text>
      </View>
      <View
        style={{
          marginLeft: 15,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TextInput
          placeholder="여기에 입력하세요"
          style={{
            width: "70%",
            height: 50,
            borderColor: "#333",
            borderRadius: 5,
            paddingHorizontal: 15,
            fontSize: 17,
            fontFamily: "R",
            backgroundColor: "#F7F7F7",
          }}
          keyboardType="number-pad"
          returnKeyType="done"
          value={inputMyValue}
          onChangeText={handleInputChange}
        />
        <View
          style={{
            justifyContent: "center",
            alignItems: "flex-end",
            right: 15,
            width: "30%",
            height: 50,
            backgroundColor: "#F7F7F7",
            borderRadius: 5,
          }}
        >
          <Text
            style={{
              marginRight: 15,
              fontSize: 16,
              fontFamily: "R",
              color: "#B6B5B4",
            }}
          >
            {formatCurrency(Number(inputMyValue))}원
          </Text>
        </View>
      </View>
      <View style={{ margin: 15, marginTop: 30 }}>
        <Text
          style={{
            fontSize: 20,
            fontFamily: "SB",
            marginBottom: 5,
          }}
        >
          이용할 대출 상품을 선택해주세요.
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              marginLeft: 1,
              fontFamily: "R",
              fontSize: 14,
              color: "#B6B5B4",
            }}
          >
            어떤 대출이 나와있는지 모르시나요?
          </Text>
          <Text
            style={{
              marginLeft: 5,
              fontSize: 14,
              fontFamily: "M",
              color: "rgba(45, 75, 142, 1.0)",
            }}
          >
            대출 종류 알아보기
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          margin: 15,
          marginTop: 5,
          width: "100%",
        }}
      >
        {daechuData
          .map((daechu) => daechu.label)
          .map((label, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                if (selectedDaechu === label) {
                  setselectedDaechu("");
                } else {
                  setselectedDaechu(label);
                }
              }}
            >
              <View
                style={{
                  backgroundColor:
                    selectedDaechu === label
                      ? "rgba(45, 75, 142, 1.0)"
                      : "#F7F7F7",
                  alignContent: "center",
                  justifyContent: "center",

                  padding: 15,
                  paddingRight: 20,
                  paddingLeft: 20,
                  paddingTop: 13,
                  marginBottom: 9,
                  marginRight: 9,
                  borderRadius: 5,
                  height: 50,
                }}
              >
                <Text
                  style={{
                    color: selectedDaechu === label ? "white" : "black",

                    fontSize: 17,
                    fontFamily: "M",
                  }}
                >
                  {label}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
      </View>

      <View style={{ alignItems: "center", marginTop: 30 }}>
        <Text style={{ fontSize: 20, fontFamily: "M", marginBottom: 1 }}>
          최대 예상 가용 가산은
        </Text>
      </View>
      <View style={{ alignItems: "center", marginLeft: 5 }}>
        <Text style={{ fontSize: 20, fontFamily: "M" }}>
          <Text
            style={{
              color: "#2D4B8E",
              fontSize: 26,
              fontFamily: "B",
            }}
          >
            총 {formatCurrency(sum)}원
          </Text>{" "}
          입니다.
        </Text>
      </View>

      {inputMyValue && selectedDaechu ? (
        <View
          style={{
            position: "absolute",
            padding: 10,
            bottom: 50,
            width: "100%",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{
              width: "100%",
              height: 55,
              padding: 15,
              backgroundColor: "#2D4B8E",
              borderRadius: 30,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => nextBtn()}
          >
            <Text style={{ fontSize: 20, fontFamily: "B", color: "white" }}>
              다음
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            position: "absolute",
            padding: 10,
            bottom: 50,
            width: "100%",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: "100%",
              height: 55,
              padding: 15,
              backgroundColor: "#DEDEDE",
              borderRadius: 30,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View>
              <Text style={{ fontSize: 20, fontFamily: "B" }}>다음</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

export default TutorialViewPg1;
