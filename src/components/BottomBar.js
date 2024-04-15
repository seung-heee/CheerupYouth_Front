import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";
import Main from "../screens/Main";
import Community from "../screens/Community";

const Tab = createBottomTabNavigator();

const BottomBar = ({ navigation }) => {
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
    </Tab.Navigator>
  );
};

export default BottomBar;
