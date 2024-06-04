import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image} from "react-native";
import * as P from "../../../style/policy";
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ScrollView } from 'react-native-gesture-handler';

const policyDetail = ({route, navigation}) => {

  const { key } = route.params;
  const [ policy, setPolicy ] = useState({})

  const getSelectPolicy = async () => {
    try {
      const response = await axios.get(`/policy/${key}`);
      console.log(response.data)
      setPolicy(response.data)
    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect(()=>{
    getSelectPolicy()
    console.log(policy.img)
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
      
      <P.policyMenu>
        {policy.sub_title && <P.policyText>사업목적</P.policyText>}
        {policy.content?.supported_target&& <P.policyText>지원대상</P.policyText>}
        {policy.content?.excluded_target && <P.policyText>제외대상</P.policyText>}
        {policy.content?.surpported_contents && <P.policyText>지원내용</P.policyText>}
        {policy.content?.supported_period && <P.policyText>지원기간</P.policyText>}
        {policy.content?.Application_period && <P.policyText>신청기간</P.policyText>}
        {policy.content?.way && <P.policyText>신청방법</P.policyText>}
        {policy.content?.submission_papers && <P.policyText>제출서류</P.policyText>}
      </P.policyMenu>

      {policy.img && (
        <>
        <View>
          <Image
            source={{ uri: policy.img }}
            style={{ width: 200, height: 200, resizeMode: 'contain' }}
            onError={() => console.log('Failed to load image')}
          />
        </View>
        </>
      )}

      <ScrollView>
        {policy.sub_title && <P.contentBox>
          <P.contentBoxTitle>사업목적</P.contentBoxTitle>
          <P.contentBoxContent>{policy.sub_title}</P.contentBoxContent>
        </P.contentBox>}

        {policy.supported && (
          <P.contentBox>
            <P.contentBoxTitle>지원대상</P.contentBoxTitle>
            <P.contentBoxContent>{policy.content?.supported_target}</P.contentBoxContent>
            {Object.keys(policy.supported)
              .filter(key => key.startsWith('conditions'))
              .map(key => {
                // if (!policy.supported[key]) return null;

                return (
                <P.contentBoxContent>

                  {policy.supported[key]}
                </P.contentBoxContent>
              )})
            }
          </P.contentBox>
        )}

        {policy.excluded && (
          <P.contentBox>
            <P.contentBoxTitle>제외대상</P.contentBoxTitle>
            {Object.keys(policy.excluded)
              .filter(key => key.startsWith('conditions'))
              .map(key => {
                // if (!policy.excluded[key]) return null;

                return (
                  <>
                  <P.contentBoxContent>
                    {policy.excluded[key]}
                  </P.contentBoxContent>
                  </>
              )})
            }
          </P.contentBox>
        )}

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