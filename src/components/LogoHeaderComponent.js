import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

const LogoHeaderComponent = ({ onPress, headerText }) => {
  return (
    <View
      style={{
        backgroundColor: "white",
        width: "100%",
        height: "35%",
        padding: 5,
        borderRadius: 10,
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
          justifyContent: "space-between",
        }}
      >
        <Image
          style={{
            width: 60,
            height: 40,
            marginTop: 60,
            marginHorizontal: 15,
          }}
          source={require("../../assets/images/logoword.png")}
        />
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => handleMyPage()}>
            <Image
              style={{
                width: 25,
                height: 25,
                marginTop: 60,
                marginHorizontal: 10,
              }}
              source={require("../../assets/images/icon-03.png")}
            />
          </TouchableOpacity>

          <Image
            style={{
              width: 25,
              height: 25,
              marginTop: 60,
              marginHorizontal: 10,
            }}
            source={require("../../assets/images/icon-27.png")}
          />
        </View>
      </View>
      <View style={{ margin: 15 }}>
        <Text
          style={{
            marginBottom: 5,
            fontSize: 20,
            fontWeight: "bold",
            color: "#2E4B8F",
          }}
        >
          안녕하세요. {user ? user.name : "묘사"}님
        </Text>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#2E4B8F" }}>
          부동산 정보와 정책을 검색해보세요.
        </Text>
      </View>
      <View
        style={{
          margin: 15,
          width: "90%",
          backgroundColor: "white",
          height: "20%",
          borderRadius: 5,
          justifyContent: "center",
          shadowColor: "#2E4B8F",
          shadowOffset: {
            width: 1,
            height: 0,
          },
          shadowOpacity: 1,
          shadowRadius: 3,
          elevation: 3,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Image
            style={{
              width: 20,
              height: 20,
              margin: 14,
            }}
            source={require("../../assets/images/icon-04.png")}
          />
          <TextInput
            style={{ backgroundColor: "white", width: "80%", fontSize: 16 }}
            placeholder="검색어를 입력해 주세요."
          />
        </View>
      </View>
    </View>
  );
};

export default LogoHeaderComponent;
