import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

const HeaderComponent = ({ onPress, headerText }) => {
  return (
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
        <TouchableOpacity onPress={onPress}>
          <Image
            style={{
              width: 20,
              height: 20,
              marginTop: 7,
              marginLeft: 14,
              marginBottom: 20,
            }}
            source={require("../../assets/images/arrowLeft.png")}
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
          {headerText}
        </Text>
      </View>
    </View>
  );
};

export default HeaderComponent;
