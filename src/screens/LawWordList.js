import React, { useState, useEffect } from "react";
import {
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import LawWordListData from "../../utils/LawWordListData";
import { useNavigation } from "@react-navigation/native";
import * as S from "../../style/LawWordListStyle";

//import Component from "react-native-paper/lib/typescript/components/List/ListItem";

const LawWordList = () => {
  const [expandedItem, setExpandedItem] = useState("");
  const navigation = useNavigation();

  return (
    <S.Page>
      <S.SearchIcon>
        <Icon
          name="search"
          size={25}
          color={"rgba(45,75,142,1.0)"}
          onPress={() => navigation.navigate("LawListSearch")}
        />
      </S.SearchIcon>
      <SectionList
        sections={LawWordListData}
        renderItem={({ item }) => (
          <S.ListContainer>
            <S.ListBox>
              <TouchableOpacity
                onPress={() => {
                  setExpandedItem(
                    item.name === expandedItem ? null : item.name
                  );
                }}
              >
                <S.ItemRow>
                  <S.ItemName>{item.name}</S.ItemName>
                  <Icon
                    name={
                      expandedItem === item.name ? "expand-less" : "expand-more"
                    }
                    size={25}
                    color={"white"}
                    style={{ marginRight: 10 }}
                  />
                </S.ItemRow>
                {expandedItem === item.name && (
                  <S.ItemValue>{item.value}</S.ItemValue>
                )}
              </TouchableOpacity>
            </S.ListBox>
          </S.ListContainer>
        )}
        renderSectionHeader={({ section }) => (
          <S.SectionView>
            <S.SectionHeader>{section.title}</S.SectionHeader>
          </S.SectionView>
        )}
        keyExtractor={(item) => `basicListEntry-${item.name}`}
      />
    </S.Page>
  );
};

export default LawWordList;
