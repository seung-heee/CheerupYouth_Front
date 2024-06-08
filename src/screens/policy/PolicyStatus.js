import React from 'react';
import * as P from "../../../style/policy";
import { Button } from 'react-native-paper';
import { View, Text, TouchableOpacity, Image, StyleSheet} from "react-native";
import PolicyModal from './PolicyModal';
import SupportedMatching from './SupportedMatching';
import ExcludedMatching from './ExcludedMatching';

const PolicyStatus = ({supported, excluded, policy}) => {
  const styles = StyleSheet.create({
    button: {
      padding: 5, // 'px' 단위 제거
    },
    text: {
      fontWeight: 'bold', // '900' 대신 'bold' 사용
    },
  });

  return (
    <>
    {supported && (
          <P.contentBox>
            <SupportedMatching supported={supported} />
            <P.contentBoxContent>{policy.content?.supported_target}</P.contentBoxContent>
            {Object.keys(supported)
              .filter(key => key.startsWith('conditions'))
              .map(key => {
                if (!supported[key]) return null;

                return (
                <P.contentSideBox>
                  {/* <P.contentChecked>O</P.contentChecked> */}
                  <P.contentBoxContent>{supported[key]}</P.contentBoxContent>
                </P.contentSideBox>
              )})
            }
          </P.contentBox>
        )}

        {excluded && (
          <P.contentBox>
            <ExcludedMatching excluded={excluded} />
            {/* <TouchableOpacity onPress={() => console.log('제외대상 탭')} style={styles.button}>
              <Text style={styles.text}>제외대상</Text>
            </TouchableOpacity> */}
            {Object.keys(excluded)
              .filter(key => key.startsWith('conditions'))
              .map(key => {
                if (!excluded[key]) return null;

                return (
                  <P.contentSideBox>
                    {/* <P.contentChecked>O</P.contentChecked> */}
                    <P.contentBoxContent>{excluded[key]}</P.contentBoxContent>
                  </P.contentSideBox>
              )})
            }
          </P.contentBox>
        )}
    </>
  );
};

export default PolicyStatus;