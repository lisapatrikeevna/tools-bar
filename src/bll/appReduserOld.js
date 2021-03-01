import {Dispatch} from "redux";
//import * as admin from 'firebase-admin';

const initialState = {
  token: ''
}

export const changeStateReducer = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return {...state, ...rest }
    default:
      return state
  }
}
