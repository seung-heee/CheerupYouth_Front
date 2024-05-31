import React, { useContext, useCallback } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";
import Main from "../screens/Main";
import Community from "../screens/Community";
import MyPage from "../screens/MyPage";

import { useFocusEffect } from "@react-navigation/native";
import { UserContext } from "../components/UserProvider";

const Tab = createBottomTabNavigator();

const BottomBar = ({ navigation }) => {
  const { userDataP, setUserDataP } = useContext(UserContext);
  useFocusEffect(
    useCallback(() => {
      return () => {
        // 화면이 포커스를 잃을 때 실행할 작업
      };
    }, [userDataP]) // userDataP가 변경될 때마다 콜백 함수를 다시 생성
  );
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // 상단 바 숨기기
      }}
    >
      <Tab.Screen
        name="Home"
        component={Main}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Community"
        component={Community}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="people" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomBar;
