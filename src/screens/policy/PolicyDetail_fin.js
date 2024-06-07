import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Modal, StyleSheet} from "react-native";
import * as P from "../../../style/policy";
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ScrollView } from 'react-native-gesture-handler';
import { SERVER_URL } from "../../components/ServerAddress";

const PolicyDetail_fin = ({route, navigation}) => {
  const { key } = route.params;
  const [ policy, setPolicy ] = useState({})
  const [ isSupportedOpen, setIsSupportedOpen ] = useState(false);
  const [ isExcludedOpen, setIsExcludedOpen ] = useState(false);
  
  const handlePress = () => {
    console.log('아이템 클릭됨!');
    // 추가적인 로직을 여기에 작성합니다.
  };

  const getSelectPolicy = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/policy/${key}`);
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
        <TouchableOpacity onPress={() => navigation.navigate('policyMain')}>
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
            <View
              style={{
                flex: 1,
                flexDirection: 'row', // 가로 배치
                alignItems: 'center', // 세로 중앙 정렬
              }} 
            >
              <P.contentBoxTitle>지원대상</P.contentBoxTitle>
              <Icon onPress={() => setIsSupportedOpen(true)} name="wechat" size={25} color="#2E4B8F" />
            </View>
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
            <View
              style={{
                flex: 1,
                flexDirection: 'row', // 가로 배치
                alignItems: 'center', // 세로 중앙 정렬
              }} 
            >
              <P.contentBoxTitle>제외대상</P.contentBoxTitle>
              <Icon onPress={() => setIsExcludedOpen(true)} name="wechat" size={25} color="#2E4B8F" />
            </View>
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

      {/* 지원대상 모달창 */}
      <View style={styles.container}>
        <Modal
          visible={isSupportedOpen}
          onShow={() => console.log('지원대상 모달창')}
          onRequestClose={() => setIsSupportedOpen(false)}
          transparent={true} // 필요에 따라 true로 설정할 수 있습니다.
          style={{ alignItems: 'center' }}
          >
          <TouchableOpacity style={styles.modalBackground} activeOpacity={1} onPressOut={() => setIsSupportedOpen(false)}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>지원대상 매칭</Text>
              <Text style={styles.modalContent}>지원대상 매칭 내용</Text>
              <TouchableOpacity style={styles.closeButton} onPress={() => setIsSupportedOpen(false)}>
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>

      {/* 제외대상 모달창 */}
      <View style={styles.container}>
        <Modal
          visible={isExcludedOpen}
          onShow={() => console.log('제외대상 모달창')}
          onRequestClose={() => setIsExcludedOpen(false)}
          transparent={true} // 필요에 따라 true로 설정할 수 있습니다.
          style={{ alignItems: 'center' }}
          >
          <TouchableOpacity style={styles.modalBackground}  activeOpacity={1} onPressOut={() => setIsExcludedOpen(false)}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>제외대상 매칭</Text>
              <Text style={styles.modalContent}>제외대상 매칭 내용</Text>
              <TouchableOpacity style={styles.closeButton} onPress={() => setIsExcludedOpen(false)}>
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </P.Container>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 배경을 반투명하게 설정
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center', // 화면 상단에 위치시키기
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 배경을 반투명하게 설정
  },
  modalContainer: {
    width: '90%',
    height: '50%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  modalContent: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
  closeButtonText: {
    fontSize: 18,
    color: 'black',
  },
});

export default PolicyDetail_fin;