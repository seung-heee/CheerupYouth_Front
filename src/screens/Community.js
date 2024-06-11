import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from "react-native";
import { ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../components/UserProvider";
//import BottomTabNavigationApp from "./BottomBar";
import * as S from "../../style/MainStyle";
import Header from "../components/Hearder";
import SearchScreen from "../components/SearchScreen";

const Community = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([]);

  const handlePostSubmit = () => {
    if (postText.trim() !== "") {
      // Add the submitted post to the list of posts
      setPosts([...posts, postText]);
      // Clear the post text input
      setPostText("");
    }
  };

  const handlePostDelete = (index) => {
    const updatedPosts = [...posts];
    updatedPosts.splice(index, 1);
    setPosts(updatedPosts);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#EFF0F5" }}>
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
            source={require("../../assets/images/mainLogo.png")}
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
            안녕하세요. {user ? user.name : "로그인"}님과
          </Text>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#2E4B8F" }}>
            비슷한 고민을 가진 분들이에요!
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

      {/* 게시물 입력 */}
      <View style={{ padding: 10 }}>
        <View style={{ margin: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#2E4B8F" }}>
            서로의 고민을 공유해요
          </Text>
        </View>
        <TextInput
          style={{
            backgroundColor: "white",
            height: 70,
            borderRadius: 10,
            padding: 10,
          }}
          placeholder="고민을 작성해주세요."
          multiline
          value={postText}
          onChangeText={(text) => setPostText(text)}
        />
        <TouchableOpacity
          style={{
            backgroundColor: "#2E4B8F",
            padding: 10,
            borderRadius: 5,
            marginTop: 10,
            alignItems: "center",
          }}
          onPress={handlePostSubmit}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            게시글 작성하기
          </Text>
        </TouchableOpacity>
      </View>

      {/* 게시물 출력 */}
      <View style={{ padding: 10 }}>
        <FlatList
          data={posts}
          renderItem={({ item, index }) => (
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 10,
                padding: 10,
                marginVertical: 5,
                flexDirection: "row", // 수평 방향으로 요소 정렬
                justifyContent: "space-between", // 요소 사이에 여백을 균등하게 분배
                alignItems: "center",
              }}
            >
              <Text>{item}</Text>
              {user && (
                <TouchableOpacity
                  onPress={() => handlePostDelete(index)}
                  style={{
                    marginTop: 5,
                    flexDirection: "row", // 가로로 정렬
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "gray",
                      padding: 5,
                      borderRadius: 5,
                    }}
                  >
                    <Text style={{ color: "white", fontWeight: "bold" }}>
                      삭제
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

export default Community;
