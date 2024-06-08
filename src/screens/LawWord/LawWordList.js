import React, { useState, useEffect } from "react";
import {
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  TextInput,
  View,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import LawWordListData from "../../../utils/LawWordListData";
import HeaderComponent from "../../components/HeaderComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNPickerSelect from "react-native-picker-select";

function LawWordList({ navigation }) {
  const beforeBtn = () => {
    navigation.goBack();
  };
  const [search, setSearch] = useState("");
  const [clickItem, setClickItem] = useState("");
  const [clickFavorites, setClickFavorites] = useState([]);
  const [favoritesChanged, setFavoritesChanged] = useState("");

  useEffect(() => {
    const checkItemData = async () => {
      try {
        const savedFavorites = await AsyncStorage.getItem("WordFavorites");
        if (savedFavorites !== null) {
          setClickFavorites(JSON.parse(savedFavorites));
        }
      } catch (error) {
        console.error("로컬 데이터 불러오기 오류:", error);
      }
    };

    checkItemData();
  }, [favoritesChanged]); // Fetch favorites whenever there's a change in favorites

  const toggleFavorite = async (itemName) => {
    try {
      let updatedFavorites = [...clickFavorites];
      const index = updatedFavorites.indexOf(itemName);
      if (index === -1) {
        updatedFavorites.push(itemName);
      } else {
        updatedFavorites.splice(index, 1);
      }
      await AsyncStorage.setItem(
        "WordFavorites",
        JSON.stringify(updatedFavorites)
      );
      setFavoritesChanged(!favoritesChanged); // Trigger re-render to update favorites
    } catch (error) {
      console.error("로컬 데이터 저장 오류:", error);
    }
  };

  const shortenText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    } else {
      return text;
    }
  };
  const filteredData = search
    ? LawWordListData.map((section) => {
        const filteredSection = {
          ...section,
          data: section.data.filter((item) =>
            item.name
              .normalize("NFD")
              .toLowerCase()
              .includes(search.normalize("NFD").toLowerCase())
          ),
        };
        if (filteredSection.data.length > 0) {
          return filteredSection;
        }
        return null;
      }).filter((section) => section !== null)
    : [];

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <HeaderComponent onPress={beforeBtn} headerText="부동산 용어 사전" />
      <View style={{ flex: 1 }}>
        <View style={{ margin: 25, marginTop: 10, marginBottom: 120 }}>
          <View style={{ marginBottom: 5 }}>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                style={{
                  backgroundColor: "#F7F7F7",
                  width: "90%",
                  padding: 15,
                  marginVertical: 5,
                  borderRadius: 5,
                }}
                placeholder="검색어를 입력해주세요."
                onChangeText={(text) => setSearch(text)}
                value={search}
              />
              <View
                style={{
                  width: "15%",
                  marginLeft: "-5%",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#F7F7F7",
                  marginVertical: 5,
                  borderRadius: 5,
                }}
              >
                <Icon size={20} name={"search"} color={"#898989"} />
              </View>
            </View>
          </View>

          {search ? (
            <View>
              <SectionList
                sections={filteredData}
                renderItem={({ item }) => (
                  <View style={{ marginBottom: 10, marginTop: 10 }}>
                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity
                        style={{ flexDirection: "row" }}
                        onPress={() => {
                          setClickItem(
                            item.name === clickItem ? null : item.name
                          );
                        }}
                      >
                        {clickItem === item.name ? (
                          <View>
                            <View
                              style={{ flexDirection: "row", width: "35%" }}
                            >
                              <View style={{ marginLeft: 10 }}>
                                <Text style={{ fontSize: 17, fontFamily: "M" }}>
                                  {item.name}
                                </Text>
                              </View>
                            </View>
                            <View style={{ marginLeft: 25, margin: 10 }}>
                              <Text style={{ fontSize: 15, fontFamily: "M" }}>
                                {item.value}
                              </Text>
                            </View>
                          </View>
                        ) : (
                          <>
                            <View
                              style={{ flexDirection: "row", width: "30%" }}
                            >
                              <View style={{ marginLeft: 10 }}>
                                <Text style={{ fontSize: 17, fontFamily: "M" }}>
                                  {item.name}
                                </Text>
                              </View>
                            </View>

                            <View
                              style={{
                                height: "100%",
                                width: 0.9,
                                backgroundColor: "#CFCFCF",
                              }}
                            />
                            <View style={{ marginLeft: 20, width: "62%" }}>
                              <Text style={{ fontSize: 15, fontFamily: "M" }}>
                                {shortenText(item.value, 20)}
                              </Text>
                            </View>
                          </>
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              />
            </View>
          ) : (
            <View>
              <SectionList
                sections={LawWordListData}
                renderItem={({ item }) => (
                  <View style={{ marginBottom: 10, marginTop: 10 }}>
                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity
                        style={{ flexDirection: "row" }}
                        onPress={() => {
                          setClickItem(
                            item.name === clickItem ? null : item.name
                          );
                        }}
                      >
                        {clickItem === item.name ? (
                          <View>
                            <View
                              style={{ flexDirection: "row", width: "35%" }}
                            >
                              <View style={{ marginLeft: 10 }}>
                                <Text style={{ fontSize: 17, fontFamily: "M" }}>
                                  {item.name}
                                </Text>
                              </View>
                            </View>
                            <View style={{ marginLeft: 25, margin: 10 }}>
                              <Text style={{ fontSize: 15, fontFamily: "M" }}>
                                {item.value}
                              </Text>
                            </View>
                          </View>
                        ) : (
                          <>
                            <View
                              style={{ flexDirection: "row", width: "35%" }}
                            >
                              <View style={{ marginLeft: 10 }}>
                                <Text style={{ fontSize: 17, fontFamily: "M" }}>
                                  {item.name}
                                </Text>
                              </View>
                            </View>

                            <View
                              style={{
                                height: "100%",
                                width: 0.9,
                                backgroundColor: "#CFCFCF",
                              }}
                            />
                            <View style={{ marginLeft: 20, width: "62%" }}>
                              <Text style={{ fontSize: 15, fontFamily: "M" }}>
                                {shortenText(item.value, 20)}
                              </Text>
                            </View>
                          </>
                        )}
                      </TouchableOpacity>
                    </View>

                    <View
                      style={{
                        marginTop: 10,
                        marginBottom: -5,
                        height: 0.9,
                        backgroundColor: "#CFCFCF",
                      }}
                    />
                  </View>
                )}
                keyExtractor={(item, index) => item + index}
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
export default LawWordList;
