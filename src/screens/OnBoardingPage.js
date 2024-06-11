import React, { useState, useEffect } from "react";
import { View, Image, StatusBar, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";

function OnBoardingPage() {
  const navigation = useNavigation();
  const [fadeAnim] = useState(new Animated.Value(0)); // 투명도 초기값 0 (안보임)

  useEffect(() => {
    // 페이드 인 애니메이션
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500, // 1초 동안 페이드 인
      useNativeDriver: true,
    }).start(() => {
      // 페이드 인이 끝나면 일정 시간 대기 후 페이드 아웃 애니메이션 시작
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500, // 1초 동안 페이드 아웃
          useNativeDriver: true,
        }).start(() => {
          // 애니메이션이 끝나면 네비게이션 수행
          navigation.replace("BottomBar");
        });
      }, 1000); // 2초 대기
    });
  }, [fadeAnim, navigation]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#2A4886",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <StatusBar barStyle="light-content" />
      <Animated.View style={{ opacity: fadeAnim }}>
        <Image
          style={{
            width: 350,
            height: 350,
          }}
          source={require("../../assets/images/logoColor.png")}
        />
      </Animated.View>
    </View>
  );
}

export default OnBoardingPage;
