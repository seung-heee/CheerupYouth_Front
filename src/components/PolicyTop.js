import React, { useEffect, useState } from "react";
import * as P from "../../style/policy";
import { View, Text, TextInput, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Row } from "../../style/MainStyle";

const PolicyTop = ({ navigation, allPolicy, setFilteredPolicy }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    if (text === "") {
      setFilteredPolicy(allPolicy);
    } else {
      const filtered = allPolicy.filter(
        (policy) =>
          policy.title.includes(text) || policy.sub_title.includes(text)
      );
      setFilteredPolicy(filtered);
    }
  }, [text, allPolicy]);

  return (
    <View
      style={{
        margin: 15,
        marginBottom: 5,
        width: "90%",
        backgroundColor: "white",
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
          value={text}
          onChangeText={setText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    margin: 15,
    borderRadius: 15,
    borderColor: "#264886",
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "gray",
    paddingHorizontal: 8,
    flexGrow: 1,
  },
  displayText: {
    fontSize: 18,
  },
});

export default PolicyTop;
