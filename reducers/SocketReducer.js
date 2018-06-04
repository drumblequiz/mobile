import {messageTypes} from '../constants/websocket.js';

const initialState = {
  loggedIn: false,
  userId:"",
  roomId:"",
  displayName:"",
  roomExists: false,
  annonymous: true,
  errorMsg: "",
};

const SocketReducer = (state = initialState, action) => {
  switch (action.type) {
    case messageTypes.roomExist:
      if (action.payload.annonymous)
      {
        if (action.payload.status == "OK")
        {
          return { ...state, annonymous: true, roomExists: true };
        }
        else if (action.payload.status == "inactive")
        {
          return { ...state,  roomExists: false, errorMsg: "Room is not active." };
        }
        if (action.payload.status == "notExists")
        {
           return { ...state,  roomExists: false, errorMsg: "Room does not exist." };
        }
      }
      else
      {
        if (action.payload.status == "OK")
        {
          return { ...state, annonymous: false, roomExists: true };
        }
        else if (action.payload.status == "inactive")
        {
          return { ...state,  roomExists: false, errorMsg: "Room is not active." };
        }
        if (action.payload.status == "notExists")
        {
           return { ...state,  roomExists: false, errorMsg: "Room does not exist." };
        }
      }
    case messageTypes.registerResponse:
      return { ...state};
    case messageTypes.logInInfo:
      return { ...state};
    case messageTypes.correct:
      return { ...state};
    case messageTypes.currentRanking:
      return { ...state};
    case messageTypes.questions:
      return { ...state};
    default:
      return state;
  }
};

export default SocketReducer;
