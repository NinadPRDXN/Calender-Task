import { createStore } from 'redux';
import { reminderReducer } from './reminderReducer';

export const store = createStore(reminderReducer);