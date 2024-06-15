import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
} from "react-native";
import * as P from "../../../style/policy";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialIcons";
import { ScrollView } from "react-native-gesture-handler";
import { SERVER_URL } from "../../components/ServerAddress";
import MatchAI from "./MatchAI";

const PolicyDetail_fin = ({ route, navigation }) => {
  const { key } = route.params;
  const [policy, setPolicy] = useState({});
  const [isSupportedOpen, setIsSupportedOpen] = useState(false);
  const [isExcludedOpen, setIsExcludedOpen] = useState(false);
  const scrollViewRef = useRef(null);
  const supportedRef = useRef(null);

  const getSelectPolicy = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/policy/${key}`);
      setPolicy(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSelectPolicy();
  }, [key]);

  const btnSection = [
    { title: "사업목적", ref: "sub_title" },
    { title: "지원대상", ref: "supported" },
    { title: "제외대상", ref: "excluded" },
    { title: "지원내용", ref: "content" },
    { title: "지원기간", ref: "supported_period" },
    { title: "신청기간", ref: "Application_period " },
    { title: "신청방법", ref: "way" },
  ];
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* 세부정책 헤더 */}
      <View
        style={{
          backgroundColor: "white",
          paddingTop: 60,
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
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("policyMain");
            }}
          >
            <Image
              style={{
                width: 20,
                height: 20,
                marginTop: 9,
                marginLeft: 14,
                marginBottom: 15,
              }}
              source={require("../../../assets/images/arrowLeft.png")}
            />
          </TouchableOpacity>
          <View style={{ marginTop: 10 }}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
                fontFamily: "B",
              }}
            >
              나의 혜택
            </Text>
          </View>

          <Icon
            style={{
              marginTop: 10,
              marginRight: 10,
            }}
            onPress={() => setIsSupportedOpen(true)}
            name="wechat"
            size={25}
            color="#2E4B8F"
          />
        </View>
      </View>

      <View
        style={{ flexDirection: "row", marginTop: 10, paddingHorizontal: 15 }}
      >
        <ScrollView
          horizontal
          contentContainerStyle={{ alignItems: "center" }}
          showsHorizontalScrollIndicator={false}
        >
          {btnSection.map((item) => (
            <TouchableOpacity
              onPress={() => {}}
              key={item.title}
              style={{ marginVertical: 10, marginHorizontal: 15 }}
            >
              <Text style={{ fontFamily: "SB", fontSize: 15 }}>
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {policy.img && (
        <>
          <View
            style={{
              marginTop: 10,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
            }}
          >
            <Image
              source={{ uri: policy.img }}
              style={{ width: "100%", height: 250, resizeMode: "contain" }}
              onError={() => console.log("Failed to load image")}
            />
          </View>
        </>
      )}
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: 20 }}
      >
        <View style={{ marginHorizontal: 15, marginTop: 20, width: "70%" }}>
          <Text style={{ fontFamily: "SB", fontSize: 18 }}>{policy.title}</Text>
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
        {policy.sub_title && (
          <P.contentBox>
            <P.contentBoxTitle>사업목적</P.contentBoxTitle>
            <P.contentBoxContent>{policy.sub_title}</P.contentBoxContent>
            <View
              style={{
                marginTop: 15,
                marginRight: 10,
                marginLeft: 10,
                height: 1,
                backgroundColor: "rgba(237,237,237,1.0)",
              }}
            />
          </P.contentBox>
        )}

        {policy.supported && (
          <P.contentBox ref={supportedRef}>
            <View
              style={{
                flex: 1,
                flexDirection: "row", // 가로 배치
                alignItems: "center", // 세로 중앙 정렬
              }}
            >
              <P.contentBoxTitle>지원대상</P.contentBoxTitle>
            </View>
            <P.contentBoxContent>
              {policy.content?.supported_target}
            </P.contentBoxContent>
            {Object.keys(policy.supported)
              .filter((key) => key.startsWith("conditions"))
              .map((key, index) => (
                <P.contentBoxContent key={index}>
                  {policy.supported[key]}
                </P.contentBoxContent>
              ))}
            <View
              style={{
                marginTop: 15,
                marginRight: 10,
                marginLeft: 10,
                height: 1,
                backgroundColor: "rgba(237,237,237,1.0)",
              }}
            />
          </P.contentBox>
        )}

        {policy.excluded && (
          <P.contentBox>
            <View
              style={{
                flex: 1,
                flexDirection: "row", // 가로 배치
                alignItems: "center", // 세로 중앙 정렬
              }}
            >
              <P.contentBoxTitle>제외대상</P.contentBoxTitle>
            </View>

            {Object.keys(policy.excluded)
              .filter((key) => key.startsWith("conditions"))
              .map((key, index) => {
                if (!policy.excluded[key]) return null; // null 또는 undefined인 경우 아무것도 렌더링하지 않음
                return (
                  <P.contentBoxContent key={index}>
                    {policy.excluded[key]}
                  </P.contentBoxContent>
                );
              })}
            <View
              style={{
                marginTop: 15,
                marginRight: 10,
                marginLeft: 10,
                height: 1,
                backgroundColor: "rgba(237,237,237,1.0)",
              }}
            />
          </P.contentBox>
        )}

        {policy.content?.surpported_contents && (
          <P.contentBox>
            <P.contentBoxTitle>지원내용</P.contentBoxTitle>
            <P.contentBoxContent>
              {policy.content?.surpported_contents}
            </P.contentBoxContent>
          </P.contentBox>
        )}
        <View
          style={{
            marginTop: 15,
            marginRight: 10,
            marginLeft: 10,
            height: 1,
            backgroundColor: "rgba(237,237,237,1.0)",
          }}
        />
        {policy.content?.supported_period && (
          <P.contentBox>
            <P.contentBoxTitle>지원기간</P.contentBoxTitle>
            <P.contentBoxContent>
              {policy.content?.supported_period}
            </P.contentBoxContent>
            <View
              style={{
                marginTop: 15,
                marginRight: 10,
                marginLeft: 10,
                height: 1,
                backgroundColor: "rgba(237,237,237,1.0)",
              }}
            />
          </P.contentBox>
        )}

        {policy.content?.Application_period && (
          <P.contentBox>
            <P.contentBoxTitle>신청기간</P.contentBoxTitle>
            <P.contentBoxContent>
              {policy.content?.Application_period}
            </P.contentBoxContent>
            <View
              style={{
                marginTop: 15,
                marginRight: 10,
                marginLeft: 10,
                height: 1,
                backgroundColor: "rgba(237,237,237,1.0)",
              }}
            />
          </P.contentBox>
        )}

        {policy.content?.way && (
          <P.contentBox>
            <P.contentBoxTitle>신청방법</P.contentBoxTitle>
            <P.contentBoxContent>{policy.content?.way}</P.contentBoxContent>
            <View
              style={{
                marginTop: 15,
                marginRight: 10,
                marginLeft: 10,
                height: 1,
                backgroundColor: "rgba(237,237,237,1.0)",
              }}
            />
          </P.contentBox>
        )}

        {policy.content?.submission_papers && (
          <P.contentBox>
            <P.contentBoxTitle>제출서류</P.contentBoxTitle>
            <P.contentBoxContent>
              {policy.content?.submission_papers}
            </P.contentBoxContent>
          </P.contentBox>
        )}
      </ScrollView>

      <View style={styles.container}>
        <Modal
          visible={isSupportedOpen}
          onShow={() => console.log("AI 정책 매칭")}
          onRequestClose={() => setIsSupportedOpen(false)}
          transparent={true} // 필요에 따라 true로 설정할 수 있습니다.
          style={{ alignItems: "center" }}
        >
          <TouchableOpacity
            style={styles.modalBackground}
            activeOpacity={1}
            onPressOut={() => setIsSupportedOpen(false)}
          >
            <View style={styles.modalContainer}>
              <MatchAI policyKey={key} setIsSupportedOpen={setIsSupportedOpen} />
              
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // 배경을 반투명하게 설정
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center", // 화면 상단에 위치시키기
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // 배경을 반투명하게 설정
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    paddingTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default PolicyDetail_fin;