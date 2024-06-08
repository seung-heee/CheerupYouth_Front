import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import { OPENAI_API_KEY } from '@env';
import { SERVER_URL } from '../../components/ServerAddress';

const MatchAI = ({policyKey}) => {
  const key = policyKey
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // 사용자 정보 저장 변수
  const [userChat, setUserChat] = useState('');

  const [users, setUsers] = useState(null);
  const [infoDetail, setInfoDetail] = useState(null);
  const [infoDetailFull, setInfoDetailFull] = useState(null);
  const [userCity, setUserCity] = useState(null);
  // 정책 정보 저장 변수
  const [policyChat, setPolicyChat] = useState(null)
  const [policy, setPolicy] = useState(null);

  useEffect(() => {
    const fetchMemberInfo = async () => {
      try {
        const id = await AsyncStorage.getItem('id'); // 사용자 id 얻어오기 

        if (!id) {
          throw new Error('No member ID found in storage');
        }
  
        const response = await axios.get(`${SERVER_URL}/users/allInfo`, {
          params: {
            userId: id,
          },
        });

        setUsers(response.data.users[0])
        setInfoDetail(response.data.InfoDetail[0])
        setInfoDetailFull(response.data.InfoDetailFull[0])
        setUserCity(response.data.InfoDetail[0].District) // 회원이 사는 지역 저장

        await fetchPolicyInfo(response.data.InfoDetail[0].District);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchMemberInfo();
  }, [key]);


  const fetchPolicyInfo = async (city) => {
    console.log(city, key)

    try {
      const policyResponse = await axios.post(`${SERVER_URL}/policy/${key}`, {
        city,
      });
      console.log(policyResponse.data, '응답정책');
      setPolicy(policyResponse.data)
      console.log(policy, 'ㅎㅇ')
      await HandleMatchAI(policyResponse.data);
    } catch (error) {
      console.error('Error fetching policy info:', error);
    }
  };

  const HandleMatchAI = async (policyData) => {
    console.log('매칭 실행');

    const { supported, excluded } = policy;

    if (!supported || !excluded) {
      console.log('정책에 지원 조건 또는 제외 조건이 없습니다.');
      return;
    }

    // 조건이 있는 값들만 필터링하여 대화 형식으로 변환합니다.
    const supportedConditions = Object.keys(supported)
      .filter(key => key.startsWith('conditions') && supported[key])
      .map(key => supported[key])
      .join(', ');

    const excludedConditions = Object.keys(excluded)
      .filter(key => key.startsWith('conditions') && excluded[key])
      .map(key => excluded[key])
      .join(', ');

    setPolicyChat(`나의 조건과 해당 정책의 조건이 일치하는지 알려줘 해당 정책의 지원 조건은 ${supportedConditions}, 제외조건은 ${excludedConditions}이야`) 
    setUserChat(`나의 조건을 알려줄게. 나는 ${infoDetail.District}에 살고있어. 출생연도는 ${infoDetail.BirthDate.split('-')[0]}년이고, 월수입은 ${infoDetail.Income}야 현재 직업은 ${infoDetailFull.CurrentJob}, 최종 학력은 ${infoDetailFull.HighestEducation}, 주거 상태는 ${infoDetailFull.ResidentialStatus}, 특이사항은 ${infoDetailFull.Special} 여기까지가 나의 조건이야`)

    try {
      const result = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo', // chat용 최신 모델 사용
          messages: [
            {"role": "system", "content": "You are a helpful assistant who matches user conditions with appropriate housing policies."},
            {"role": "user", "content": "To tell you my conditions, please let me know if they match the conditions of the following policy"},
            {"role": "assistant", "content": "Of course. Please give me specific information such as where you live, year of birth, gender, marital status, etc"},
            { role: 'user', content: userChat }, // 사용자 조건
            { role: 'user', content: policyChat }, // 정책 조건
            { role: 'user', content: "조건이 맞지 않는다면 어느 조건에 어떻게 부합하지 않는지 한국어로 자세하게 설명해주고 해결방안을 제시해줘" }, // 정책 조건
          ],
          max_tokens: 300, // 응답의 최대 토큰 수를 늘림
          temperature: 0.7, // 응답의 창의성을 제어
          top_p: 1.0 // 샘플링을 제어
        },
        {
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(result.data.choices[0].message.content)
      setResponse(result.data.choices[0].message.content);
    } catch (error) {
      console.log('매칭 시도 중 에러 발생')
      console.error(error);
    }
  };

  return (
    <View><Text>{response}</Text></View>
  );
};

export default MatchAI;