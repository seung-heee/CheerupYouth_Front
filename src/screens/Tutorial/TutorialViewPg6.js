import React, { useState, useEffect, useContext } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import TutorialPg6Data from "../../../utils/TutorialPg6Data.js";
import { SERVER_URL } from "../../components/ServerAddress";
import axios from "axios";
import { UserContext } from "../../components/UserProvider";
import HeaderComponent from "../../components/HeaderComponent";

function TutorialViewPg6({ navigation }) {
  const [dbdata, setDbData] = useState([]);
  const { userDataP, setUserDataP } = useContext(UserContext);
  useEffect(() => {
    const user_id = userDataP ? userDataP.id : null;
    axios
      .post(`${SERVER_URL}/TVP6/insert`, { user_id })
      .then((response) => {
        console.log("데이터 삽입 성공");
      })
      .catch((error) => {
        if (error.response.status === 400) {
          console.log("이미 존재하는 user_id입니다.");
        } else {
          console.error("데이터 삽입 중 오류 발생:", error);
        }
      });
  }, []); // 컴포넌트가 처음 로드될 때만 실행

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/TVP6/data`)
      .then((response) => {
        const dbdata = response.data;
        // console.log(dbdata);
        setDbData(dbdata);
      })
      .catch((error) => {
        console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
      });
  }, []); // DB 불러오기

  const backBtn = () => {
    navigation.navigate("TutorialScreen");
  };
  const beforeBtn = () => {
    navigation.goBack();
  };
  const nextBtn = () => {
    navigation.navigate("TutorialScreen");
  };
  const [clickedItems, setClickedItems] = useState([]);

  const toggleItem = (index) => {
    const newClickedItems = [...clickedItems];
    newClickedItems[index] = !newClickedItems[index];
    setClickedItems(newClickedItems);
    console.log(index);
  }; //누르는 Json 목록 관리

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <HeaderComponent onPress={backBtn} headerText="전세 계약 튜토리얼" />
      <ScrollView>
        <View style={{ margin: 25, marginTop: 20, marginBottom: 0 }}>
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
              STEP 6
            </Text>
          </View>
        </View>
        <View style={{ margin: 25, marginBottom: 10, marginTop: 5 }}>
          <Text
            style={{
              fontFamily: "B",
              fontSize: 20,
            }}
          >
            특약사항 추천
          </Text>
        </View>
        <View
          style={{ width: "85%", margin: 10, marginTop: 0, marginBottom: 0 }}
        >
          <Text
            style={{
              color: "gray",
              fontSize: 15,
              fontFamily: "M",
              margin: 5,
              marginLeft: 15,
            }}
          >
            계약서에 작성하면 좋은 특약사항을 추천해드릴게요.
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

        <>
          {TutorialPg6Data[0].data.map((item, index) => (
            <View
              key={index}
              style={{
                backgroundColor: "white",
                margin: 25,
                marginTop: 15,
                marginBottom: 0,
                borderRadius: 5,
                shadowColor: "rgba(147,147,147,0.7)",
                shadowOffset: {
                  width: 1,
                  height: 0,
                },
                shadowOpacity: 5,
                shadowRadius: 3,
                elevation: 5,
              }}
            >
              <View style={{ margin: 20 }}>
                <View style={{ height: 25 }}>
                  <Text style={{ fontFamily: "SB", fontSize: 20 }}>
                    {item.name}
                  </Text>
                </View>
                <View
                  style={{
                    height: 0.9,
                    backgroundColor: "rgba(238,238,238,1.0)",
                    marginTop: 20,
                  }}
                ></View>

                <View
                  style={{ marginTop: 20, marginRight: 10, marginBottom: -20 }}
                >
                  {item.details.map((detail, detailIndex) => (
                    <TouchableOpacity
                      key={detailIndex}
                      style={{ marginBottom: 20, flexDirection: "row" }}
                      onPress={() => toggleItem(detailIndex)}
                    >
                      <Text style={{ fontSize: 15, fontFamily: "R" }}>
                        {detailIndex + 1}.{"  "}
                      </Text>
                      <Text style={{ fontSize: 15, fontFamily: "R" }}>
                        {clickedItems[detailIndex]
                          ? detail.value
                          : detail.title}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          ))}
        </>
        <>
          <View
            style={{
              backgroundColor: "white",
              margin: 25,
              marginTop: 15,
              marginBottom: 0,
              borderRadius: 5,
              shadowColor: "rgba(147,147,147,0.7)",
              shadowOffset: {
                width: 1,
                height: 0,
              },
              shadowOpacity: 5,
              shadowRadius: 3,
              elevation: 5,
            }}
          >
            <View style={{ margin: 20 }}>
              <View style={{ height: 25 }}>
                <Text style={{ fontFamily: "SB", fontSize: 20 }}>
                  추천 특약사항 및 안내
                </Text>
              </View>
              <View
                style={{
                  height: 0.9,
                  backgroundColor: "rgba(238,238,238,1.0)",
                  marginTop: 20,
                }}
              ></View>
              <View
                style={{ marginTop: 20, marginRight: 10, marginBottom: -20 }}
              >
                {[...new Set(dbdata.map((data) => data.user_solution))].map(
                  (solution, index) =>
                    solution && (
                      <View
                        key={index}
                        style={{
                          flexDirection: "row",
                          paddingBottom: 20,
                          marginRight: 20,
                          marginTop: 0,
                          marginLeft: 0,
                          marginBottom: 0,
                        }}
                      >
                        <Text style={{ fontSize: 15, fontFamily: "R" }}>
                          {index + 1}.{"  "}
                        </Text>
                        <Text style={{ fontSize: 15, fontFamily: "R" }}>
                          {solution}
                        </Text>
                      </View>
                    )
                )}
              </View>
            </View>
          </View>
        </>
        <View
          style={{
            // position: "absolute",
            padding: 10,
            // bottom: 50,
            marginTop: 30,
            marginBottom: 50,
            width: "100%",
            flexDirection: "row",
            justifyContent: "center",
          }}
          onPress={backBtn}
        >
          <TouchableOpacity
            style={{
              width: "43%",
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
              width: "43%",
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

export default TutorialViewPg6;
