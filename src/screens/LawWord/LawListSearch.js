import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  SectionList,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LawWordListData from "../../../utils/LawWordListData";

const LawListSearch = ({ navigation }) => {
  const [search, setSearch] = useState("");

  const beforeBtn = () => {
    navigation.goBack();
  };
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
      <View style={{ flexDirection: "row", marginTop: 70 }}>
        <TextInput
          style={{
            backgroundColor: "#F7F7F7",
            width: "70%",
            margin: 10,
            padding: 12,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: 5,
          }}
          placeholder="검색어를 입력해주세요."
          onChangeText={(text) => setSearch(text)}
          value={search}
        />
        <View
          style={{
            marginLeft: -18,
            margin: 10,
            padding: 12,
            backgroundColor: "#F7F7F7",
            borderRadius: 5,
          }}
        >
          <Icon size={20} name={"search"} color={"#898989"} />
        </View>
        <TouchableOpacity onPress={beforeBtn}>
          <Icon
            style={{ marginLeft: 0, margin: 10, padding: 12 }}
            size={20}
            name={"close"}
            color={"black"}
          />
        </TouchableOpacity>
      </View>
      <View style={{ height: 4, backgroundColor: "#E9E9E9" }}></View>

      {search ? (
        <View>
          <SectionList
            sections={filteredData}
            renderItem={({ item }) => (
              <View style={{ margin: 10 }}>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity onPress={() => toggleFavorite(item.name)}>
                    <Icon
                      size={20}
                      name={
                        clickFavorites.includes(item.name)
                          ? "star"
                          : "star-border"
                      } // Check if item is in favorites
                      color={"rgba(45, 75, 142,0.8)"}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{ flexDirection: "row" }}
                    onPress={() => {
                      setClickItem(item.name === clickItem ? null : item.name);
                    }}
                  >
                    {clickItem === item.name ? (
                      <View>
                        <View style={{ flexDirection: "row", width: "35%" }}>
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
                        <View style={{ flexDirection: "row", width: "30%" }}>
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
        <SectionList
          sections={LawWordListData}
          renderItem={({ item }) => (
            <View style={{ margin: 10 }}>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={() => toggleFavorite(item.name)}>
                  <Icon
                    size={20}
                    name={
                      clickFavorites.includes(item.name)
                        ? "star"
                        : "star-border"
                    } // Check if item is in favorites
                    color={"rgba(45, 75, 142,0.8)"}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ flexDirection: "row" }}
                  onPress={() => {
                    setClickItem(item.name === clickItem ? null : item.name);
                  }}
                >
                  {clickItem === item.name ? (
                    <View>
                      <View style={{ flexDirection: "row", width: "35%" }}>
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
                      <View style={{ flexDirection: "row", width: "30%" }}>
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
      )}
    </View>
  );
};
export default LawListSearch;
