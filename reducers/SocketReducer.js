import {messageTypes} from '../constants/websocket.js';

const initialState = {
  loggedIn: false,
  userId:"",
  roomId:"",
  displayName:"",
  roomExists: false,
  annonymous: true,
  errorMsg: "",
  registerStatus: "inactive", // inactive|ok|error
  correctAnswArr: [],
  ranking: "",
  answers: [],
  roomJoinedStatus: false,
  backToHome: false,
};

const SocketReducer = (state = initialState, action) => {
  switch (action.type) {
    case messageTypes.roomExist:
      if (action.payload.annonymous)
      {
        if (action.payload.status == "OK")
        {
          return { ...state, annonymous: true, roomExists: true, roomId: action.payload.id };
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
          return { ...state, annonymous: false, roomExists: true, roomId: action.payload.id};
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
      if (action.payload == false)
      {
         return { ...state,  registerStatus: "error"};
      }
      else if (action.payload == true)
      {
         return { ...state,  registerStatus: "ok"};
      }
    case messageTypes.logInInfo:
    if (action.payload.success == false)
    {
       return { ...state};
    }
    else if (action.payload.success == true)
    {
       return { ...state,  loggedIn: true, userId: action.payload.id};
    }
    case messageTypes.correct:
      return { ...state, correctAnswArr: action.payload };
    case messageTypes.currentRanking:
      return { ...state, ranking: action.payload.place};
    case messageTypes.roomQuestions:
      if (action.payload.roomId == state.roomId)
      {
         return { ...state, answers: action.payload.qi};
      }
    case messageTypes.roomJoined:
        if (action.payload.status)
        {
            return { ...state, roomJoinedStatus: action.payload.status, errorMsg: action.payload.error};
        }
        else
        {
            return { ...state, roomJoinedStatus: action.payload.status, errorMsg: action.payload.error, backToHome: true};
        }
    default:
      return state;
  }
};

export default SocketReducer;
