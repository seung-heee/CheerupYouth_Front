import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  SectionList,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import TutorialData from "../../../utils/TutorialData";
import * as Font from "expo-font";

const TutorialScreen = ({ navigation }) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        M: require("../../../assets/fonts/AppleSDGothicNeoM.ttf"),
        B: require("../../../assets/fonts/AppleSDGothicNeoB.ttf"),
        SB: require("../../../assets/fonts/AppleSDGothicNeoSB.ttf"),
        R: require("../../../assets/fonts/AppleSDGothicNeoR.ttf"),
      });
      setFontLoaded(true);
    };

    loadFont();
  }, []);

  if (!fontLoaded) {
    return null; // or render a loading indicator
  }
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
        <View
          style={{
            flexDirection: "row",
          }}
        >
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

      <ScrollView style={{ flex: 1, marginBottom: 10 }}>
        <SectionList
          scrollEnabled={false}
          sections={TutorialData}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                marginTop: 20,
                margin: 15,
                height: 115,
                marginBottom: item.name === "계약하기" ? 50 : -8,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 8,
                shadowColor: "rgba(147,147,147,0.7)",
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
                shadowOpacity: 1,
                shadowRadius: 1,
                elevation: 5,
              }}
              onPress={() => {
                const nav = item.nav;
                navigation.navigate(nav);
              }}
            >
              <View
                style={{
                  margin: 20,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      marginBottom: 2,
                      marginTop: 3,
                      fontSize: 20,
                      fontFamily: "B",
                      color: "rgba(45, 75, 142,1)",
                    }}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 30,
                      color: "rgba(45, 75, 142,1)",
                      marginLeft: 5,
                    }}
                  >
                    {item.titleN}
                  </Text>
                </View>
                <Text
                  style={{ fontFamily: "B", fontSize: 20, marginBottom: 5 }}
                >
                  {item.name}
                </Text>
                <View style={{ margin: 5 }}>
                  <Text
                    style={{ color: "gray", fontSize: 14, fontFamily: "R" }}
                  >
                    {item.value}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </View>
  );
};

export default TutorialScreen;
