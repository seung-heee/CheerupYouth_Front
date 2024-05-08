import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import styled from "styled-components/native";
import Main from "./src/screens/Main";
import TutorialScreen from "./src/screens/Tutorial/TutorialScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SignUp from "./src/screens/SignUp";
import LawWordList from "./src/screens/LawWordList";
import LawListSearch from "./src/screens/LawListSearch";
import BottomBar from "./src/components/BottomBar";
import TVP1 from "./src/screens/Tutorial/TutorialViewPg1";
import TVP2 from "./src/screens/Tutorial/TutorialViewPg2";
import TVP3 from "./src/screens/Tutorial/TutorialViewPg3";
import TVP4 from "./src/screens/Tutorial/TutorialViewPg4";
import TVP5 from "./src/screens/Tutorial/TutorialViewPg5";
import Login from "./src/components/Id";
import InfoDetail from "./src/screens/InfoDetail";
import InfoDetailFull from "./src/screens/InfoDetailFull";
import PolicyList from "./src/screens/PolicyList";
import { UserProvider } from "./src/components/UserProvider";

const Stack = createStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="BottomBar"
          screenOptions={{
            headerShown: false, // 상단헤더 숨기기
          }} //첫 경로를 bottombar을 사용해서 메인페이지에만 나오게 함.
        >
          <Stack.Screen name="Main" component={Main} key={1} />
          <Stack.Screen name="BottomBar" component={BottomBar} />
          <Stack.Screen name="TutorialScreen" component={TutorialScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="LawWordList" component={LawWordList} />
          <Stack.Screen name="LawListSearch" component={LawListSearch} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="TVP1" component={TVP1} />
          <Stack.Screen name="TVP2" component={TVP2} />
          <Stack.Screen name="TVP3" component={TVP3} />
          <Stack.Screen name="TVP4" component={TVP4} />
          <Stack.Screen name="TVP5" component={TVP5} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
