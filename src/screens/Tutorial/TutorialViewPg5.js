import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  SectionList,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import TutorialPg5Data from "../../../utils/TutorialPg5Data.js";
import Tutorial5Tip from "../../../utils/Tutorial5Tip.js";
import { SERVER_URL } from "../../components/ServerAddress";
import axios from "axios";

function TutorialViewPg5({ navigation }) {
  // const [dbdata, setDbData] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get(`${SERVER_URL}/ch4`)
  //     .then((response) => {
  //       console.log(response.data);
  //       const dbdata = response.data;
  //       setDbData(dbdata);
  //     })
  //     .catch((error) => {
  //       console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
  //     });
  // }, []); // DB 불러오기
  const [styleChange, setStyleChange] = useState("");
  const [textItem, setTextItem] = useState("");
  const beforeBtn = () => {
    navigation.goBack();
  };
  const nextBtn = () => {};
  const backBtn = () => {
    navigation.navigate("TutorialScreen");
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
          <TouchableOpacity onPress={backBtn}>
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
              STEP 5
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
            계약하기
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
            집주인, 공인중개사와 실제 계약하는 단계에요.
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
            잔금을 처리하고 확인했던 것들을 다시한번 살피고 특약사항을 적으며
            계약을 마무리해보아요.
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
        <View style={{ margin: 15, marginTop: 20, marginBottom: 5 }}>
          <Text
            style={{
              fontFamily: "SB",
              fontSize: 20,
            }}
          >
            나와있는 사람이 누구인가요?
          </Text>
        </View>

        <SectionList
          style={{ paddingBottom: 15 }}
          scrollEnabled={false}
          sections={TutorialPg5Data}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                margin: 15,
                marginTop: 15,
                marginBottom: 0,
                borderRadius: 5,
                shadowColor:
                  textItem === item
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
                setTextItem(textItem === item.name ? "" : item.name);
              }}
            >
              <View style={{ margin: 20 }}>
                <View
                  style={{
                    height: 25,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ fontFamily: "SB", fontSize: 20 }}>
                    {item.name}
                  </Text>
                  <Icon
                    name={
                      textItem === item.name ? "expand-less" : "expand-more"
                    }
                    size={30}
                    color={
                      textItem === item.name
                        ? "rgba(45, 75, 142,0.8)"
                        : "#979797"
                    }
                    style={{ bottom: 3 }}
                  />
                </View>
                {textItem === item.name && (
                  <>
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
                      {[
                        item.value1,
                        item.value2,
                        item.value3,
                        item.value4,
                        item.value5,
                        item.value6,
                        item.value7,
                      ].map(
                        (value, index) =>
                          value && (
                            <View
                              style={{
                                marginBottom: 20,
                              }}
                            >
                              <Text style={{ fontSize: 14, fontFamily: "R" }}>
                                {value}
                              </Text>
                            </View>
                          )
                      )}
                    </View>
                  </>
                )}
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, idx) => idx.toString()}
        />
        <View style={{ margin: 15, marginTop: 20, marginBottom: 5 }}>
          <Text
            style={{
              fontFamily: "SB",
              fontSize: 20,
            }}
          >
            계약서 작성할 때 !
          </Text>
        </View>
        <SectionList
          style={{ paddingBottom: 15 }}
          scrollEnabled={false}
          sections={Tutorial5Tip}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: "white",
                margin: 15,
                marginTop: 15,
                marginBottom: 0,
                paddingTop: 0,
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
              <View style={{ margin: 20, marginBottom: 23 }}>
                <Text style={{ fontSize: 18, fontFamily: "SB" }}>
                  {item.name}
                </Text>
                {[
                  item.value1,
                  item.value2,
                  item.value3,
                  item.value4,
                  item.value5,
                  item.value6,
                  item.value7,
                ].map(
                  (value, index) =>
                    value && (
                      <View style={{ marginTop: 10 }}>
                        <Text style={{ fontSize: 14, fontFamily: "R" }}>
                          {value}
                        </Text>
                      </View>
                    )
                )}
              </View>
            </View>
          )}
          keyExtractor={(item, idx) => idx.toString()}
        />
        <View
          style={{
            // position: "absolute",
            padding: 10,
            // bottom: 50,
            marginTop: 10,
            marginBottom: 50,
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
            onPress={nextBtn}
          >
            <Text style={{ fontSize: 20, fontFamily: "B", color: "white" }}>
              다음
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

export default TutorialViewPg5;
