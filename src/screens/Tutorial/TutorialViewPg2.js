
import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useCallback,
} from "react";

import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  Image,
  ScrollView,
} from "react-native";
import * as S from "../../../style/TutorialScreenStyle";
import Postcode from "@actbase/react-daum-postcode";
import axios from "axios";
import RNPickerSelect from "react-native-picker-select";
import * as Font from "expo-font";
import { SERVER_URL } from "../../components/ServerAddress";
import { UserContext } from "../../components/UserProvider";
import { useFocusEffect } from "@react-navigation/native";

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
function TutorialViewPg2({ navigation }) {
  const [dbdata, setDbData] = useState([]);
  const { userDataP, setUserDataP } = useContext(UserContext);
  const [userdata, setUserData] = useState([]);
  
  const dbControl = (pgname) => {
    const userDataT2 = {
      user_id: userDataP ? userDataP.id : null,
      user_inputAddress: inputAddress,
      user_inputDanji: inputDanji,
      user_inputDong: inputDong,
      user_inputHo: inputHo,
      user_tltp: tltp,
      user_selectedZoneCode: selectedZoneCode,
    };
    if (userdata === null) {
      navigation.navigate(pgname);
    } else if (userdata && userdata.length > 0) {
      axios
        .post(`${SERVER_URL}/TVP2/update`, userDataT2)
        .then((response) => {
          navigation.navigate(pgname);
        })
        .catch((error) => {
          console.error("Error update data:", error);
        });
    } else {
      axios
        .post(`${SERVER_URL}/TVP2/insert`, userDataT2)
        .then((response) => {
          navigation.navigate(pgname);
        })
        .catch((error) => {
          console.error("Error saving data:", error);
        });
    }
  };
  const nextBtn = () => {
    dbControl("TVP3");
  };
  
  const beforeBtn = () => {
    navigation.goBack();
  };
  const backBtn = () => {
    navigation.navigate("TutorialScreen");
  };

  const [inputAddress, setInputAddress] = useState("");
  const [inputDanji, setInputDanji] = useState("");
  const [inputDong, setInputDong] = useState("");
  const [inputHo, setInputHo] = useState("");
  const [tltp, setTltp] = useState("");
  const [selectedZoneCode, setSelectedZoneCode] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  Font.loadAsync({
    M: require("../../../assets/fonts/AppleSDGothicNeoM.ttf"),
    B: require("../../../assets/fonts/AppleSDGothicNeoB.ttf"),
    SB: require("../../../assets/fonts/AppleSDGothicNeoSB.ttf"),
    R: require("../../../assets/fonts/AppleSDGothicNeoR.ttf"),
  });
  const allFieldsFilled = inputDanji && inputDong == "" && inputHo;
  const handletltpChange = (text) => {
    setTltp(text);
  };
  const handleAddressSelect = (data) => {
    setSelectedZoneCode(data.zonecode);
    setInputAddress(data.address);
    // console.log(JSON.stringify(data));
    setModalVisible(false); // 모달을 닫음
  };
  useEffect(() => {
    if (userdata && userdata.length > 0) {
      setTltp(JSON.stringify(userdata[0].user_tltp));
      setSelectedZoneCode(userdata[0].user_selectedZoneCode);
      setInputAddress(userdata[0].user_inputAddress);
      setInputDanji(userdata[0].user_inputDanji);
      setInputDong(userdata[0].user_inputDong);
      setInputHo(userdata[0].user_inputHo);
    }
  }, [userdata]);

  const addAmount = (tltp) => {
    setTltp((prevValue) =>
      prevValue ? `${parseFloat(prevValue) + tltp}` : `${tltp}`
    );
  };
  const filterAddress = dbdata.filter(
    (item) =>
      item.address.includes(inputAddress) &&
      item.danji.includes(inputDanji) &&
      item.dong.includes(inputDong) &&
      item.ho.includes(inputHo)
  );
  const marketPrice = filterAddress.map((item) => item.marketprice);

  const scrollViewRef = useRef(null);

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };
  useEffect(() => {
    // inputDong이 변경될 때 inputHo를 초기화
    setInputHo("");
  }, [inputDong]);
  useEffect(() => {
    if (userdata && userdata.length > 0) {
      setTltp(JSON.stringify(userdata[0].user_tltp));
      setSelectedZoneCode(userdata[0].user_selectedZoneCode);
      setInputAddress(userdata[0].user_inputAddress);
      setInputDanji(userdata[0].user_inputDanji);
      setInputDong(userdata[0].user_inputDong);
      setInputHo(userdata[0].user_inputHo);
    }
  }, [userdata]);
  useEffect(() => {
    axios
      .get(`${SERVER_URL}/TVP2/data`)
      .then((response) => {
        // console.log(response.data);
        const dbdata = response.data;
        setDbData(dbdata);
      })
      .catch((error) => {
        console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
      });
  }, []); // DB 불러오기
  useEffect(() => {
    axios
      .post(`${SERVER_URL}/TVP2/select`, {
        user_id: userDataP ? userDataP.id : null,
      })
      .then((response) => {
        const userdata = response.data;
        setUserData(userdata);
      })
      .catch((error) => {
        console.error("데이터 가져오는 중 오류가 발생했습니다 : ", error);
      });
  }, [userDataP]);

  useEffect(() => {
    scrollToBottom();
  }, [tltp, inputDong, inputDanji, inputHo]);

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

      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
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
              STEP 2
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
            시세 확인하기
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
            공인중개사 및 다양한 부동산 어플리케이션으로 {"\n"}매물을 알아보는
            단계에요.
          </Text>
          <Text
            style={{
              color: "gray",
              fontSize: 15,
              fontFamily: "M",
              margin: 5,
              marginLeft: 15,
            }}
          >
            지역, 교통, 학군, 창문방향, 방이나 화장실 개수, 선호하는 방향,
            층고를 기준으로 매물을 정해야해요.
          </Text>
          <Text
            style={{
              color: "gray",
              fontSize: 15,
              fontFamily: "M",
              margin: 5,
              marginLeft: 15,
            }}
          >
            핵심은 계약해도 되는 매물인지 확인하는 것이에요.
          </Text>
          <Text
            style={{
              color: "gray",
              fontSize: 15,
              fontFamily: "M",
              margin: 5,
              marginLeft: 15,
            }}
          >
            HUG 기준 공시가격보다 시세가 126% 이내로 들어와야해요.
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
        ></View>
        <View style={{ margin: 15, marginTop: 20, marginBottom: 15 }}>
          <Text
            style={{
              fontFamily: "SB",
              fontSize: 20,
            }}
          >
            매물 시세를 입력해 주세요.
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
              height: 55,
              borderColor: "#333",
              borderRadius: 5,
              paddingHorizontal: 15,
              fontSize: 17,
              fontFamily: "R",
              backgroundColor: "#F7F7F7",
            }}
            keyboardType="number-pad"
            returnKeyType="done"
            value={tltp}
            onChangeText={handletltpChange}
          />
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-end",
              right: 15,
              width: "30%",
              height: 55,
              backgroundColor: "#F7F7F7",
              borderRadius: 5,
            }}
          >
            <Text
              style={{
                marginRight: 10,
                fontSize: 16,
                fontFamily: "R",
                color: "#B6B5B4",
              }}
            >
              {formatCurrency(Number(tltp))}원
            </Text>
          </View>
        </View>
        <View style={{ margin: 15, marginTop: 30, marginBottom: 15 }}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: "SB",
            }}
          >
            공시가격 알아보기
          </Text>
        </View>
        <View
          style={{
            margin: 15,
            marginTop: 0,
            marginBottom: tltp && marketPrice.length == 1 ? 15 : 250,
          }}
        >
          <Modal
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <TouchableWithoutFeedback
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <S.PostcodeView>
                <TouchableWithoutFeedback onPress={() => {}}>
                  <S.PostcodeSize>
                    <Postcode
                      style={{ width: "100%", height: "100%" }}
                      jsOptions={{ animation: true }}
                      onSelected={handleAddressSelect}
                    />
                  </S.PostcodeSize>
                </TouchableWithoutFeedback>
              </S.PostcodeView>
            </TouchableWithoutFeedback>
          </Modal>

          <View style={{ flexDirection: "row", marginBottom: 10 }}>
            <View
              style={{
                width: "60%",
                height: 55,
                backgroundColor: "#F7F7F7",
                borderRadius: 5,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  padding: 10,
                  fontSize: 17,
                  fontFamily: "R",
                  marginLeft: 5,
                  color: selectedZoneCode ? "black" : "#C1C1C4",
                }}
                keyboardType="number-pad"
              >
                {selectedZoneCode ? selectedZoneCode : "우편번호로 찾기"}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginLeft: 5,
                width: "40%",
                backgroundColor: "#2D4B8E",
                padding: 10,
                borderRadius: 5,
              }}
            >
              <Text style={{ fontSize: 16, color: "white", fontFamily: "SB" }}>
                주소 검색
              </Text>
            </TouchableOpacity>
          </View>
          {selectedZoneCode && (
            <View>
              <View
                style={{
                  width: "100%",
                  height: 55,
                  borderRadius: 5,
                  justifyContent: "center",
                  backgroundColor: "#F7F7F7",
                  padding: 10,
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 17,
                    fontFamily: "M",
                  }}
                >
                  {inputAddress}
                </Text>
              </View>
              <View style={{ flexDirection: "row", margin: 5, marginTop: 0 }}>
                <View
                  style={{
                    width: "33%",
                    height: 55,
                    borderRadius: 5,
                    backgroundColor: "#F7F7F7",
                    padding: 10,
                    marginLeft: -5,
                    justifyContent: "center",
                  }}
                >
                  <RNPickerSelect
                    items={[
                      ...new Set(
                        dbdata
                          .filter((item) => item.address.includes(inputAddress))
                          .map((item) => item.danji)
                      ),
                    ].map((danji) => ({
                      label: danji,
                      value: danji,
                    }))}
                    onValueChange={(danji) => {
                      setInputDanji(danji);
                    }}
                    value={inputDanji}
                    placeholder={{
                      label: "단지",
                      value: null,
                    }}
                    style={{
                      // 드롭다운 목록 전체의 스타일을 지정합니다.
                      inputIOS: {
                        fontSize: 17, // Android에서의 폰트 크기
                        fontFamily: "M",
                      },
                      inputAndroid: {
                        fontSize: 17, // Android에서의 폰트 크기
                        fontFamily: "M",
                      },
                    }}
                  />
                </View>
                <View
                  style={{
                    width: "33%",
                    height: 55,
                    borderRadius: 5,
                    backgroundColor: "#F7F7F7",
                    padding: 10,
                    marginLeft: 7,
                    justifyContent: "center",
                  }}
                >
                  <RNPickerSelect
                    items={[
                      ...new Set(
                        dbdata
                          .filter(
                            (item) =>
                              item.address.includes(inputAddress) &&
                              item.danji.includes(inputDanji)
                          )
                          .map((item) => item.dong)
                      ),
                    ].map((dong) => ({
                      label: dong,
                      value: dong,
                    }))}
                    onValueChange={(dong) => {
                      setInputDong(dong);
                    }}
                    value={inputDong}
                    placeholder={{ label: "동", value: "" }}
                    style={{
                      // 드롭다운 목록 전체의 스타일을 지정합니다.
                      inputIOS: {
                        fontSize: 17, // iOS에서의 폰트 크기
                        fontFamily: "M",
                      },
                      inputAndroid: {
                        fontSize: 17, // Android에서의 폰트 크기
                        fontFamily: "M",
                      },
                    }}
                  />
                </View>
                <View
                  style={{
                    width: "33%",
                    height: 55,
                    borderRadius: 5,
                    backgroundColor: "#F7F7F7",
                    padding: 10,
                    marginLeft: 7,

                    justifyContent: "center",
                  }}
                >
                  <RNPickerSelect
                    items={[
                      ...new Set(
                        dbdata
                          .filter(
                            (item) =>
                              item.address.includes(inputAddress) &&
                              item.danji.includes(inputDanji) &&
                              item.dong.includes(inputDong)
                          )
                          .map((item) => item.ho)
                      ),
                    ].map((ho) => ({
                      label: ho,
                      value: ho,
                    }))}
                    onValueChange={(ho) => setInputHo(ho)}
                    value={inputHo}
                    placeholder={{ label: "호", value: "" }}
                    style={{
                      // 드롭다운 목록 전체의 스타일을 지정합니다.
                      inputIOS: {
                        fontSize: 17, // Android에서의 폰트 크기
                        fontFamily: "M",
                      },
                      inputAndroid: {
                        fontSize: 17, // Android에서의 폰트 크기
                        fontFamily: "M",
                      },
                    }}
                  />
                </View>
              </View>
            </View>
          )}
        </View>
        {tltp && marketPrice.length == 1 && (
          <View
            style={{
              alignItems: "center",
              // marginTop: 30,
              marginBottom: 150,
              padding: 10,
            }}
          >
            {tltp < marketPrice * 1.26 ? (
              <>
                <Text
                  style={{ fontSize: 20, fontFamily: "M", marginBottom: 1 }}
                >
                  최종결과는
                </Text>
                <Text
                  style={{
                    color: "#2D4B8E",
                    fontSize: 23,
                    fontFamily: "B",
                  }}
                >
                  거래 가능합니다. 126% 이내로 들어왔으며,{"\n"}HUG 주택 보증
                  보험 가입 또한 가능합니다.
                </Text>
              </>
            ) : (
              <>
                <Text
                  style={{ fontSize: 20, fontFamily: "M", marginBottom: 1 }}
                >
                  최종결과는
                </Text>
                <Text
                  style={{
                    color: "#2D4B8E",
                    fontSize: 23,
                    fontFamily: "B",
                  }}
                >
                  시세가 공시가격의 126% 이내로 들어오지 않았습니다. {"\n"}HUG
                  주택 보증 보험 가입이 불가능합니다.
                </Text>
              </>
            )}
          </View>
        )}
        {tltp && allFieldsFilled ? (
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
                width: "45%",
                marginRight: 14,
                height: 55,
                padding: 15,
                backgroundColor: "#DEDEDE",
                borderRadius: 30,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => beforeBtn()}
            >
              <Text
                style={{
                  color: "rgba(112,112,112,1.0)",
                  fontSize: 20,
                  fontFamily: "B",
                }}
              >
                이전
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "45%",
                height: 55,
                marginLeft: 14,
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
            <TouchableOpacity
              style={{
                width: "45%",
                marginRight: 14,
                height: 55,
                padding: 15,
                backgroundColor: "#DEDEDE",
                borderRadius: 30,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={beforeBtn}
            >
              <View>
                <Text
                  style={{
                    color: "rgba(112,112,112,1.0)",
                    fontSize: 20,
                    fontFamily: "B",
                  }}
                >
                  이전
                </Text>
              </View>
            </TouchableOpacity>
            <View
              style={{
                width: "45%",
                height: 55,
                marginLeft: 14,
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
      </ScrollView>
    </View>
  );
}
export default TutorialViewPg2;
