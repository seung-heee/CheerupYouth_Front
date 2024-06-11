import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
} from "react-native";
import * as P from "../../../style/policy";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
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
  console.log(policy);
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

  return (
    <View style={{ flex: 1, display: "flex", backgroundColor: "white" }}>
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
        style={{
          marginTop: 5,
          flexDirection: "row",
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ padding: 15, fontFamily: "R", fontSize: 15 }}>
          사업목적
        </Text>
        <Text style={{ padding: 15, fontFamily: "R", fontSize: 15 }}>
          지원대상
        </Text>
        <Text style={{ padding: 15, fontFamily: "R", fontSize: 15 }}>
          제외대상
        </Text>
        <Text style={{ padding: 15, fontFamily: "R", fontSize: 15 }}>
          지원내용
        </Text>
        <Text style={{ padding: 15, fontFamily: "R", fontSize: 15 }}>
          신청방법
        </Text>
      </View>
      {policy.img && (
        <>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
            }}
          >
            <Image
              source={{ uri: policy.img }}
              style={{ width: "100%", height: 300, resizeMode: "contain" }}
              onError={() => console.log("Failed to load image")}
            />
          </View>
        </>
      )}
      <ScrollView
        style={{ paddingTop: 10, marginBottom: 20, backgroundColor: "white" }}
      >
        <View
          style={{ marginHorizontal: 15, marginVertical: 10, width: "70%" }}
        >
          <Text style={{ fontFamily: "B", fontSize: 18 }}>{policy.title}</Text>
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
          <P.contentBox>
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
              .map((key) => {
                // if (!policy.supported[key]) return null;
                return (
                  <P.contentBoxContent>
                    {policy.supported[key]}
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
              .map((key) => {
                if (!policy.excluded[key]) return null; // null 또는 undefined인 경우 아무것도 렌더링하지 않음
                return (
                  <P.contentBoxContent key={key}>
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

      {/* 지원대상 모달창 */}
      <View style={styles.container}>
        <Modal
          visible={isSupportedOpen}
          onShow={() => console.log("지원대상 모달창")}
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
              <MatchAI policyKey={key} />
              <View style={styles.modalTop}>
                <Text style={styles.modalTitle}>AI 정책 매칭</Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setIsSupportedOpen(false)}
                >
                  <Image
                    style={{
                      width: 15,
                      height: 15,
                    }}
                    source={require("../../../assets/images/icon-06.png")}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>

      {/* 제외대상 모달창 */}
      <View style={styles.container}>
        <Modal
          visible={isExcludedOpen}
          onShow={() => console.log("제외대상 모달창")}
          onRequestClose={() => setIsExcludedOpen(false)}
          transparent={true} // 필요에 따라 true로 설정할 수 있습니다.
          style={{ alignItems: "center" }}
        >
          <TouchableOpacity
            style={styles.modalBackground}
            activeOpacity={1}
            onPressOut={() => setIsExcludedOpen(false)}
          >
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>제외대상 매칭</Text>
              <Text style={styles.modalContent}>제외대상 매칭 내용</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setIsExcludedOpen(false)}
              >
                <Image
                  style={{
                    width: 20,
                    height: 20,
                    margin: 14,
                  }}
                  source={require("../../../assets/images/icon-04.png")}
                />
              </TouchableOpacity>
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
  modalTitle: {
    fontWeight: "bold",
    color: "#2e4b8f",
    fontSize: "17px",
    fontSize: 22,
    marginBottom: 10,
  },
  modalContent: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalTop: {
    position: "absolute",
    top: 10,
    right: 10,
    left: 10, // 추가하여 양 옆으로 요소가 배치되도록 함
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
  },
  closeButtonText: {
    fontSize: 20,
    color: "black",
  },
});

export default PolicyDetail_fin;
