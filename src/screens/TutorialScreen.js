import React, { useState, useEffect } from "react";
import {
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import TutorialData from "../components/TutorialData";
import * as S from "../../style/TutorialScreenStyle";
//import AsyncStorage from "@react-native-async-storage/async-storage";

const TutorialScreen = () => {
  const [expandedItem, setExpandedItem] = useState("");
  const [styleChange, setStyleChange] = useState("");
  const [iconState, setIconState] = useState("");

  return (
    <S.Page>
      <SectionList
        sections={TutorialData}
        renderItem={({ item }) => (
          <S.TutorialContainer>
            <S.TutorialRow>
              <TouchableOpacity
                onPress={() => {
                  setIconState((prevState) => {
                    if (prevState.includes(item.name)) {
                      return prevState.filter(
                        (stateItem) => stateItem !== item.name
                      );
                    } else {
                      return [...prevState, item.name];
                    }
                  });
                }}
              >
                <Icon
                  name={
                    iconState.includes(item.name)
                      ? "check-circle"
                      : "check-circle-outline"
                  }
                  size={25}
                  color={
                    iconState.includes(item.name)
                      ? "gray"
                      : "rgba(45,75,142,1.0)"
                  }
                />
              </TouchableOpacity>

              <Text
                style={{
                  marginLeft: 10,
                  marginTop: 2,
                  fontSize: 15,
                  fontWeight: "bold",
                  color: iconState.includes(item.name)
                    ? "gray"
                    : "rgba(45,75,142,0.8)",
                }}
              >
                {item.title}
              </Text>
            </S.TutorialRow>

            <View
              style={{
                marginLeft: 30,
                padding: 10,
                borderRadius: 15,
                backgroundColor: iconState.includes(item.name)
                  ? "#F3F4F8"
                  : "rgba(45,75,142,0.8)",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setExpandedItem(
                    item.name === expandedItem ? null : item.name
                  );
                }}
              >
                <S.TutorialRow>
                  <Text
                    style={{
                      flex: 1,
                      padding: 4,
                      marginLeft: 15,
                      fontWeight: "bold",
                      color: iconState.includes(item.name) ? "gray" : "white",
                    }}
                  >
                    {item.name}
                  </Text>
                  <Icon
                    name={
                      expandedItem === item.name ? "expand-less" : "expand-more"
                    }
                    size={25}
                    color={iconState.includes(item.name) ? "gray" : "white"}
                    style={{ marginRight: 10 }}
                  />
                </S.TutorialRow>
                {expandedItem === item.name && (
                  <>
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
                          <TouchableOpacity
                            key={index}
                            style={{ marginTop: 10, padding: 4 }}
                            onPress={() => {
                              setStyleChange((prevState) => {
                                if (prevState.includes(value)) {
                                  return prevState.filter(
                                    (item) => item !== value
                                  );
                                } else {
                                  return [...prevState, value];
                                }
                              });
                            }}
                          >
                            <Text
                              style={
                                styleChange.includes(value)
                                  ? {
                                      color:
                                        expandedItem === item.name
                                          ? "gray"
                                          : "black",
                                    }
                                  : {
                                      color: iconState.includes(item.name)
                                        ? "gray"
                                        : "white",
                                    }
                              }
                            >
                              {value}
                            </Text>
                          </TouchableOpacity>
                        )
                    )}
                  </>
                )}
              </TouchableOpacity>
            </View>
          </S.TutorialContainer>
        )}
        keyExtractor={(item) => `basicListEntry-${item.name}`}
      />
    </S.Page>
  );
};

export default TutorialScreen;
