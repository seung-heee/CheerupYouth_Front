import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import * as P from "../../../style/policy";

const SupportedMatching = ({supported}) => {
  const styles = StyleSheet.create({
    button: {
      padding: 5,
    },
    text: {
      fontWeight: 'bold',
    },
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(()=>{
    console.log('넘어온 지원대상 내용', supported)
  }, [])

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setIsOpen(true)} style={styles.button}>
        <Text style={styles.text}>지원대상</Text>
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        onShow={() => console.log('modal did open')}
        onRequestClose={() => setIsOpen(false)}
        transparent={false} // 필요에 따라 true로 설정할 수 있습니다.
        style={{ alignItems: 'center' }}
      >
        <P.policyModalStyle>
          <Text style={{ fontSize: 20 }}>모달창</Text>
          <Text style={{ fontSize: 20 }}>지원대상 매칭 내용</Text>
          <TouchableOpacity style={{ margin: 3 }} onPress={() => setIsOpen(false)}>
            <Text style={styles.text}>X</Text>
          </TouchableOpacity>
        </P.policyModalStyle>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: 'blue',
  },
  text: {
    fontSize: 18,
    color: 'red',
  },
});

export default SupportedMatching;
