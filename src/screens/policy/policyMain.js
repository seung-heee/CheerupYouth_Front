import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import * as S from "../../../style/MainStyle";
import * as P from "../../../style/policy";
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { SERVER_URL } from "../../components/ServerAddress";
import PolicyTop from '../../components/PolicyTop';
import MainHeader from '../../components/MainHeader';

const PolicyMain = ({ navigation }) => {
  const [allPolicy, setAllPolicy] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredPolicy, setFilteredPolicy] = useState([]);

  // 모든 정책 조회
  const getPolicy = async () => {
    try {
      const response = await axios.get('http://192.168.35.9:3000/policy');
      console.log("Response data:", response.data);
      setAllPolicy(response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        // 서버가 응답했지만 상태 코드가 2xx 범위가 아닙니다.
        console.error('Response error:', error.response.data);
      } else if (error.request) {
        // 요청이 이루어졌지만 응답을 받지 못했습니다.
        console.error('Request error:', error.request);
      } else {
        // 요청을 설정하는 동안 발생한 문제
        console.error('Error:', error.message);
      }
      console.error('Error config:', error.config);
    }
  }

  // 정책 신청 가능 여부 확인
  const getPolicyMatch = async (email) => {
    try {
      const response = await axios.get(`http://192.168.35.9:3000/policy/match?email=${email}`);
      console.log(response.data, '가능여부')
      return response.data;
    } catch (error) {
      console.error('정책 신청 가능 여부 확인 실패:', error);
      throw error;
    }
  };

  // 데이터 로드 및 상태 설정
  const fetchPolicies = async () => {
    try {
      const policies = await getPolicy();
      const email = 'tmdgml2595@naver.com'; // 실제 사용자 이메일로 대체
      const policyMatches = await getPolicyMatch(email);

      const policiesWithStatus = policies.map((policy) => {
        const match = policyMatches.find(match => match.key === policy.key);
        let isEligible;
        if (match) {
          if (match.policy === true) {
            isEligible = '신청 가능';
          } else if (match.policy === false) {
            isEligible = '신청 불가';
          } else {
            isEligible = '보류';
          }
        } else {
          isEligible = '보류';
        }

        return {
          ...policy,
          isEligible
        };
      });

      setAllPolicy(policiesWithStatus);
    } catch (error) {
      console.error('정책 데이터를 불러오는 데 실패했습니다.', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // fetchPolicies();
    getPolicy();
  }, []);

  // if (loading) {
  //   return <ActivityIndicator size="large" color="#0000ff" />;
  // }

  return (
    <P.Container>
      <MainHeader navigation={navigation} />
      <PolicyTop allPolicy={allPolicy} setFilteredPolicy={setFilteredPolicy} />
      {filteredPolicy.map((policy) => (
        <P.policyBox key={policy.key} onPress={() => navigation.navigate('policy_detail', { key: policy.key })}>
          <Image source={{ uri: policy.img }} style={{ width: '30%', height: 100 }} />
          <View style={{ marginLeft: 10 }}>
            <P.title>{policy.title}</P.title>
            <P.subtitle>{policy.sub_title}</P.subtitle>
          </View>
        </P.policyBox>
      ))}
    </P.Container>
  );
};

export default PolicyMain;
