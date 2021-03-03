import React, { useState } from 'react';
import { Text, TouchableOpacity, TextInput } from 'react-native';
import styled from 'styled-components/native';
import { refineDate } from './../utility/refineDate';
import { useSelector, useDispatch } from 'react-redux';
import { setReminder } from './../redux/reminderAction';
import DateTimePickerModal from "react-native-modal-datetime-picker";

function Form({navigation}) {
  //Redux State Selector
  const reminders = useSelector( state => state );

  //All useState
  const [errMsg, setErrMsg] = useState({
    display: false,
    msg: 'Error Message'
  });
  const [visible, setVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [hour, setHour] = useState('');
  const [minutes, setMinutes] = useState('');
  const [task, setTask] = useState('');

  const dispatch = useDispatch();

  const closeForm = () => {
    setSelectedDate('');
    setHour('');
    setMinutes('');
    setTask('');
  }

  const changeUserData = () => {
    if(selectedDate == '' || hour == '' || minutes == '') {
      setErrMsg({
        display: true,
        msg: 'Please select Date and Time'
      });
    }
    else if(task == '') {
      setErrMsg({
        display: true,
        msg: 'Please enter description about your Task'
      });
    }
    else {
      const allDates = Object.keys(reminders);
      let appendRequired = false;
      let dateToAppend;

      for( let i = 0; i < allDates.length; i++ ) {
        if (allDates[i] == selectedDate) {
          appendRequired = true;
          dateToAppend = allDates[i];
          break;
        }
      }

      if(appendRequired) {
        let respectiveData = reminders[dateToAppend];
        respectiveData.push({name: task, hour: hour, minutes: minutes, popUpShown: false});
        dispatch(setReminder(reminders));
      } else {
        let dataToDispatch = {
          ...reminders,
          [selectedDate] : [{name: task, hour: hour, minutes: minutes, popUpShown: false}]
        };
        
        dispatch(setReminder(dataToDispatch));
      }
      navigation.push('Schedule');
    }
  }

  const setDateTime = (event) => {
    let year = event.getFullYear();
    let month = event.getMonth() + 1;
    let date = event.getDate();
    
    setSelectedDate(refineDate(year, month, date));
    setHour(`${event.getHours()}`);
    setMinutes(`${event.getMinutes()}`);

    setVisibility(false)
  }

  return (
    <>
      <Overlay>
        <FormContainer>
          {errMsg.display && <ErrorMsg>{errMsg.msg}</ErrorMsg>}
          <DateTimePickerModal
            isVisible={visible}
            mode="datetime"
            onConfirm={(event) => setDateTime(event)}
            onCancel={() => setVisibility(false)}
          />
          <DateTime onPress={ () => setVisibility(true) }>
            <DateTimeText>Select Date & Time</DateTimeText>
          </DateTime>
          {
            (selectedDate != '') && 
            (hour != '') && 
            (minutes != '') && 
            <SelectedDate>{selectedDate} {hour}:{minutes}</SelectedDate>
          }
          <TextArea value={task} onChangeText={(text) => setTask(text)} />
          <ButtonContainer>
            <FormButtons onPress={ () => changeUserData() }>
              <FormButtonText>Save</FormButtonText>
            </FormButtons>
            <FormButtons onPress={ closeForm }>
              <FormButtonText>Cancel</FormButtonText>
            </FormButtons>
          </ButtonContainer>
        </FormContainer>
      </Overlay>
    </>
  )
}

const Overlay = styled.View`
  width: 100%;
  height: 100%;
  flex: 1;
  align-items: center;
  background-color: #000000bb;
  justify-content: center;
`;

const FormContainer = styled.View`
  width: 80%;
  height: 250px;
  padding: 20px;
  position: absolute;
  z-index: 1;
  background-color: #fff;
`;

const DateTime = styled.TouchableOpacity`
  height: 25%;
  border-radius: 5px;
  display: flex;
  align-items: center;
  background-color: #00bbf2;
  justify-content: center;
`;

const DateTimeText = styled.Text`
  color: #fff;
`;

const TextArea = styled.TextInput`
  border: 1px solid #00bbf2;
  border-radius: 5px;
  margin-top: 5px;
`;

const ButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const FormButtons = styled.TouchableOpacity`
  padding: 5px 8px;
  border: 1px solid #00bbf2;
  margin: 5px;
`;

const FormButtonText = styled.Text`
  color: #00bbf2;
`;

const ErrorMsg = styled.Text`
  color: #ff6347;
  text-align: center;
`;

const SelectedDate = styled.Text`
  text-align: center;
  color: #00bbf2;
`;

export default Form;
