import React, {useState, useRef, useEffect} from 'react';
import {View, Text, TextInput} from 'react-native';
import PlusComponent from './../components/PlusComponent';
import Form from './Form';
import {Agenda} from 'react-native-calendars';
import styled from 'styled-components/native';
import { useSelector, useDispatch } from 'react-redux';
import { refineDate } from './../utility/refineDate';
import { setReminder } from './../redux/reminderAction';

const Schedule = ({ navigation }) => {
  //Redux Dispatcher
  const dispatch = useDispatch();

  //Redux State Selector
  const reminders = useSelector( state => state );

  //All UseState
  const [initialDate, setInitialDate] = useState(null);
  const [formDisplay, setFormDisplay] = useState(false);
  const [test, setTest] = useState();

  //To Render Each Item in Calender
  const renderItem = (item) => {
    return (
    <RenderItem>
      <View>
        <RenderData>{item.name}</RenderData>
        <RenderData>Time: {item.hour}:{item.minutes}</RenderData>
      </View>
    </RenderItem>
    );
  }

  useEffect(() => {
    const allDates = Object.keys(reminders)
    const firstDate = allDates[0];
    setInitialDate(firstDate);

    setInterval(() => {
      let currentDate = new Date();
      let year = currentDate.getFullYear();
      let month = currentDate.getMonth() + 1;
      let date = currentDate.getDate();
      let hour = `${currentDate.getHours()}`;
      let minutes = `${currentDate.getMinutes()}`;

      let afterRefining = refineDate(year, month, date);

      let isItExist = false;
      let dateToProcess;

      for( let i = 0; i < allDates.length; i++ ) {
        if (allDates[i] == afterRefining) {
          isItExist = true;
          dateToProcess = allDates[i];
          break;
        }
      }

      if(isItExist) {
        let respectiveData = reminders[dateToProcess];
        for( let j = 0; j < respectiveData.length; j++ ) {
          let hourToCompare = respectiveData[j].hour;
          let minutesToCompare = respectiveData[j].minutes;
          if ((hourToCompare === hour) && (minutesToCompare === minutes)) {
            if (reminders[dateToProcess][j].popUpShown == false) {
              alert(reminders[dateToProcess][j].name);
              reminders[dateToProcess][j].popUpShown = true;
              dispatch(setReminder(reminders));
            }
          }
        }
      }
    },2000)
  }, [reminders])

  return (
    <Container>
      {
        initialDate
        &&
        <Agenda
          items={reminders}
          renderItem={renderItem}
          selected={initialDate}
        />
      }
      {
        !initialDate
        &&
        <Blank>
          <Text>No Reminder is set yet, Please add the Reminder</Text>
        </Blank>
      }
      <PlusComponent navigation={navigation} />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  position: relative;
`;

const RenderItem = styled.View`
  border-radius: 5px;
  margin: 5px;
  flex: 1;
  align-items: center;
  background-color: #00bbf2;
  justify-content: center;
`;

const RenderData = styled.Text`
  color: #fff;
  text-align: center
`;

const Blank = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default Schedule;