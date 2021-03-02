import { SET_REMINDER } from './reminderType';

const initialState = {};

export const reminderReducer = ( state = initialState, action ) => {
  switch(action.type) {
    case SET_REMINDER:
      return action.payload
    default:
      return state
  }
}