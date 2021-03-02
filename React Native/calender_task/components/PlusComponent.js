import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import styled from 'styled-components/native';

function PlusComponent({ navigation }) {

  const sendToForm = () => {
    navigation.push('Form');
  }
  
  return (
    <Plus onPress={sendToForm}>
      <PlusButton>+</PlusButton>
    </Plus>
  )
}

const Plus = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  display: flex;
  position: absolute;
  right: 10px;
  bottom: 10px;
  align-items: center;
  background-color: #00bbf2;
  justify-content: center;
`;

const PlusButton = styled.Text`
  color: #fff;
  font-size: 25px;
  font-weight: 900;
`;

export default PlusComponent;
