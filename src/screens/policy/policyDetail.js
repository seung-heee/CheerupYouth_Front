import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image} from "react-native";
import * as P from "../../../style/policy";
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ScrollView } from 'react-native-gesture-handler';
import PolicyStatus from './PolicyStatus';

const policyDetail = ({route, navigation}) => {
  const { key } = route.params;
  const [ policy, setPolicy ] = useState({})
  const [ imgLink, setImgLink ] = useState('')

  const getSelectPolicy = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/policy/${key}`);
      console.log(response.data)
      setPolicy(response.data)
      setImgLink(response.data.img)
    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect(()=>{
    getSelectPolicy()
    console.log(imgLink, '이미지 링크')
  }, [key])

  return (
    <P.Container style={{flex:1}}>
      {/* 세부정책 헤더 */}
      <P.DetailHeader>
        <TouchableOpacity onPress={() => navigation.navigate('policy_main')}>
          <Text>뒤</Text>
        </TouchableOpacity>
        <P.headerTitle>{policy.title}</P.headerTitle>
        <Text></Text>
      </P.DetailHeader>
      
      {/* <P.policyMenu>
        {policy.sub_title && <P.policyText>사업목적</P.policyText>}
        {policy.supported && <P.policyText>지원대상</P.policyText>}
        {policy.excluded && <P.policyText>제외대상</P.policyText>}
        {policy.content?.surpported_contents && <P.policyText>지원내용</P.policyText>}
        {policy.content?.supported_period && <P.policyText>지원기간</P.policyText>}
        {policy.content?.Application_period && <P.policyText>신청기간</P.policyText>}
        {policy.content?.way && <P.policyText>신청방법</P.policyText>}
        {policy.content?.submission_papers && <P.policyText>제출서류</P.policyText>}
      </P.policyMenu> */}

      <ScrollView
       showsVerticalScrollIndicator={false} // 세로 스크롤바 숨기기
       showsHorizontalScrollIndicator={false} // 가로 스크롤바 숨기기
      >
        <View>
          <Image source={{uri: 'https://reactjs.org/logo-og.png' }}
          style={{ width: '100%', height: 300 }} />
        </View>

        {policy.sub_title && <P.contentBox>
          <P.contentBoxTitle>사업목적</P.contentBoxTitle>
          <P.contentBoxContent>{policy.sub_title}</P.contentBoxContent>
        </P.contentBox>}

        <PolicyStatus supported={policy.supported} excluded={policy.excluded} policy={policy} />
        
        {policy.content?.surpported_contents &&  <P.contentBox>
          <P.contentBoxTitle>지원내용</P.contentBoxTitle>
          <P.contentBoxContent>{policy.content?.surpported_contents}</P.contentBoxContent>
        </P.contentBox>}

        {policy.content?.supported_period && <P.contentBox>
          <P.contentBoxTitle>지원기간</P.contentBoxTitle>
          <P.contentBoxContent>{policy.content?.supported_period}</P.contentBoxContent>
        </P.contentBox>}

        {policy.content?.Application_period && <P.contentBox>
          <P.contentBoxTitle>신청기간</P.contentBoxTitle>
          <P.contentBoxContent>{policy.content?.Application_period}</P.contentBoxContent>
        </P.contentBox>}

        {policy.content?.way && <P.contentBox>
          <P.contentBoxTitle>신청방법</P.contentBoxTitle>
          <P.contentBoxContent>{policy.content?.way}</P.contentBoxContent>
        </P.contentBox>}

        {policy.content?.submission_papers && <P.contentBox>
          <P.contentBoxTitle>제출서류</P.contentBoxTitle>
          <P.contentBoxContent>{policy.content?.submission_papers}</P.contentBoxContent>
        </P.contentBox>}
      </ScrollView>
    </P.Container>
  );
};

export default policyDetail;