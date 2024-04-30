import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  SectionList,
  Button,
  Modal,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { SERVER_URL } from "../../components/ServerAddress";
import axios from "axios";

function TutorialViewPg4() {
  const [dbdata, setDbData] = useState([]);
  useEffect(() => {
    axios
      .get(`${SERVER_URL}/ch4`)
      .then((response) => {
        console.log(response.data);
        const dbdata = response.data;
        setDbData(dbdata);
      })
      .catch((error) => {
        console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
      });
  }, []); // DB 불러오기
  const [clickItem, setClickItem] = useState("");
  const [styleChange, setStyleChange] = useState("");
  const [iconState, setIconState] = useState("");
  const navigation = useNavigation();
  handleCancel = () => {
    navigation.goBack();
  };
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
              navigation.goBack();
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
      <ScrollView>
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
              STEP 4
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
            계약 준비하기
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
            계약을 할 때 확인해야할 것들이 있어요.
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
            서류별로 어떤 서류인지 확인하고 무엇을 확인해야하는 지 알아보아요.
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

        {[...new Set(dbdata.map((data) => data.title))].map(
          (title, index) =>
            title && (
              <View key={index}>
                {title !== "서류 확인 공통사항" ? (
                  <TouchableOpacity
                    style={{
                      backgroundColor: "white",
                      margin: 15,
                      marginTop: 15,
                      marginBottom: title === "주의사항" ? 130 : 0,
                      borderRadius: 5,
                      shadowColor:
                        clickItem === title
                          ? "rgba(45, 75, 142,0.3)"
                          : "rgba(147,147,147,0.7)",
                      shadowOffset: {
                        width: 1,
                        height: 0,
                      },
                      shadowOpacity: 5,
                      shadowRadius: 3,
                      elevation: 5,
                    }}
                    onPress={() => {
                      setClickItem(clickItem === title ? "" : title);
                    }}
                  >
                    <View
                      style={{
                        margin: 20,
                        marginBottom: clickItem == title ? 28 : 20,
                      }}
                    >
                      <View
                        style={{
                          height: 25,
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text style={{ fontFamily: "SB", fontSize: 20 }}>
                          {title}
                        </Text>
                        <Icon
                          name={
                            clickItem === title ? "expand-less" : "expand-more"
                          }
                          size={30}
                          color={
                            clickItem === title
                              ? "rgba(45, 75, 142,0.8)"
                              : "#979797"
                          }
                          style={{ bottom: 2.5 }}
                        />
                      </View>
                      {clickItem === title && (
                        <View>
                          <View
                            style={{
                              height: 0.9,
                              backgroundColor: "rgba(238,238,238,1.0)",
                              marginTop: 20,
                            }}
                          ></View>
                          <View
                            style={{
                              marginTop: 20,
                              marginRight: 20,
                              marginBottom: -20,
                            }}
                          >
                            {dbdata
                              .filter((data) => data.title.includes(title))
                              .map((data, idx) => (
                                <TouchableOpacity
                                  key={idx}
                                  onPress={() => {
                                    setStyleChange((prevState) => {
                                      if (prevState.includes(data.value)) {
                                        return prevState.filter(
                                          (item) => item !== data.value
                                        );
                                      } else {
                                        return [...prevState, data.value];
                                      }
                                    });
                                  }}
                                  style={{
                                    flexDirection: "row",
                                    paddingBottom: 20,
                                  }}
                                >
                                  <Icon
                                    name={
                                      styleChange.includes(data.value)
                                        ? "check-box"
                                        : "check-box-outline-blank"
                                    }
                                    size={18}
                                    color={
                                      styleChange.includes(data.value)
                                        ? "#2D4B8E"
                                        : "gray"
                                    }
                                    style={{ marginTop: 2.5, marginRight: 5 }}
                                  />

                                  <Text
                                    style={{
                                      marginTop: 1,
                                      fontSize: 17,
                                      fontFamily: "M",
                                    }}
                                  >
                                    {data.value}
                                  </Text>
                                </TouchableOpacity>
                              ))}
                          </View>
                        </View>
                      )}
                    </View>
                  </TouchableOpacity>
                ) : (
                  <View
                    style={{
                      backgroundColor: "white",
                      margin: 15,
                      marginTop: 20,
                      marginBottom: title === "주의사항" ? 150 : 0,
                      borderRadius: 5,
                      shadowColor: "rgba(45, 75, 142,0.3)",
                      shadowOffset: {
                        width: 1,
                        height: 0,
                      },
                      shadowOpacity: 5,
                      shadowRadius: 3,
                      elevation: 5,
                    }}
                  >
                    <View style={{ margin: 20, marginBottom: 28 }}>
                      <Text style={{ fontFamily: "SB", fontSize: 20 }}>
                        {title}
                      </Text>
                      <View
                        style={{
                          height: 0.9,
                          backgroundColor: "rgba(238,238,238,1.0)",
                          marginTop: 20,
                        }}
                      ></View>
                      <View
                        style={{
                          marginTop: 20,
                          marginRight: 20,
                          marginBottom: -20,
                        }}
                      >
                        {dbdata
                          .filter((data) => data.title.includes(title))
                          .map((data, idx) => (
                            <TouchableOpacity
                              key={idx}
                              onPress={() => {
                                setStyleChange((prevState) => {
                                  if (prevState.includes(data.value)) {
                                    return prevState.filter(
                                      (item) => item !== data.value
                                    );
                                  } else {
                                    return [...prevState, data.value];
                                  }
                                });
                              }}
                              style={{
                                flexDirection: "row",
                                paddingBottom: 20,
                                marginRight: 20,
                                marginTop: 0,
                                marginLeft: 0,
                                marginBottom: 0,
                              }}
                            >
                              <Icon
                                name={
                                  styleChange.includes(data.value)
                                    ? "check-box"
                                    : "check-box-outline-blank"
                                }
                                size={18}
                                color={
                                  styleChange.includes(data.value)
                                    ? "#2D4B8E"
                                    : "gray"
                                }
                                style={{ marginTop: 0, marginRight: 5 }}
                              />

                              <Text style={{ marginTop: 1, fontSize: 16 }}>
                                {data.value}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        {/* {checkListAdd == true && (
                      <View>
                        <TextInput
                          style={{ padding: 10 }}
                          placeholder="내용 입력"
                          onChangeText={(text) => setInputCheckList(text)}
                          value={inputCheckList} //이거 하고 나서 초기화 시켜야함
                          returnKeyType="done"
                          onSubmitEditing={onSubmit}
                        ></TextInput>
                      </View>
                    )}
                    <TouchableOpacity
                      onPress={() => {
                        setCheckListAdd((prev) => !prev);
                      }}
                    >
                      <Text style={{ color: "#2D4B8E" }}>
                        + Check List 추가하기
                      </Text>
                    </TouchableOpacity> */}
                      </View>
                    </View>
                  </View>
                )}
              </View>
            )
        )}
      </ScrollView>
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
          onPress={handleCancel}
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
          onPress={() => navigation.navigate("TVP4")}
        >
          <Text style={{ fontSize: 20, fontFamily: "B", color: "white" }}>
            다음
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default TutorialViewPg4;
