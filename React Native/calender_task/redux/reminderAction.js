import { SET_REMINDER } from './reminderType';

export const setReminder = (data) => {
  return {
    type: SET_REMINDER,
    payload: data
  }
}