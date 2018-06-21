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
  gameStarted: false,
  timer: 0,
  nextQuestion: false,
  showScoreStatus: "inactive", // inactive|ok|error
  serverTime: new Date(),
  correctAnswerReceived: false,
  showError: false,
  disconnected: false,
  answerChosen: "",
};

const SocketReducer = (state = initialState, action) => {
    if (messageTypes.roomExist == action.type) {
      if (action.payload.annonymous)
      {
          if (action.payload.status == "OK")
          {
            return { ...state, annonymous: true, roomExists: true, roomId: action.payload.id };
          }
          else if (action.payload.status == "inactive")
          {
            return { ...state,  roomExists: false, errorMsg: "Room is not active.", showError: true };
          }
          if (action.payload.status == "notExists")
          {
             return { ...state,  roomExists: false, errorMsg: "Room does not exist.", showError: true };
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
            return { ...state,  roomExists: false, errorMsg: "Room is not active.", showError: true };
          }
          if (action.payload.status == "notExists")
          {
             return { ...state,  roomExists: false, errorMsg: "Room does not exist.", showError: true };
          }
      }
    }
    else if (action.type == messageTypes.registerResponse)
    {
        if (action.payload == false)
        {
           return { ...state,  registerStatus: "error", errorMsg: "Incorrect Email.", showError: true };
        }
        else if (action.payload == true)
        {
           return { ...state,  registerStatus: "ok"};
        }
      }
      else if (action.type == messageTypes.logInInfo)
      {
        if (action.payload.success == false)
        {
           return { ...state, errorMsg: "Incorrect Hash.", showError: true };
        }
        else if (action.payload.success == true)
        {
           return { ...state,  loggedIn: true, userId: action.payload.id};
        }
    }
    else if (action.type == messageTypes.correct)
    {
        return { ...state, correctAnswArr: action.payload, correctAnswerReceived: true };
    }
    else if (action.type == messageTypes.currentRanking)
    {
        return { ...state, ranking: action.payload.place};
    }
    else if (action.type == messageTypes.roomQuestions)
    {
        if (action.payload.roomId == state.roomId)
        {
            // because react native does not support array sorting, doing it by hand
            newAns = [];
            toReturn = [];
            maxNumber = action.payload.qi[0].AnswerId;
            for (i = 0; i < action.payload.qi.length; i++)
            {
                if (maxNumber < action.payload.qi[i].AnswerId)
                {
                    maxNumber = action.payload.qi[i].AnswerId;
                    toReturn[0] = action.payload.qi;
                }
            }

            newAns[0] = 0;
            for (i = 0;  i < action.payload.qi.length; i++)
            {
                minNumb = maxNumber;
                for (i2 = 0;  i2 < action.payload.qi.length; i2++)
                {
                    if (action.payload.qi[i2].AnswerId <= minNumb && action.payload.qi[i2].AnswerId > newAns[i])
                    {
                      minNumb = action.payload.qi[i2].AnswerId;
                      toReturn[i] = action.payload.qi[i2];
                    }
                }
                newAns[i] = minNumb;
                newAns[i+1] = minNumb;
            }

            return { ...state, answers: toReturn, gameStarted: true, nextQuestion: true};
        }
        else
        {
            return state;
        }
    }
    else if (action.type == messageTypes.roomJoined)
    {
        if (action.payload.status)
        {
            return { ...state, roomJoinedStatus: action.payload.status, errorMsg: action.payload.error};
        }
        else
        {
            return { ...state, roomJoinedStatus: action.payload.status, errorMsg: action.payload.error, backToHome: true, showError: true};
        }
    }
    else if (action.type == messageTypes.showFinalScore)
    {
        if (action.payload.roomId == state.roomId)
        {
           return { ...state, showScoreStatus: "ok"};
        }
        else
        {
            return state;
        }
    }
    else if (action.type == messageTypes.serverTime)
    {
        if (action.payload.roomId == state.roomId)
        {
           return { ...state, serverTime: action.payload.time};
        }
        else
        {
            return { ...state, serverTime: action.payload.time};
        }
    }
    else if (action.type == messageTypes.disconnect)
    {
        return { ...state, disconnected: true};
    }
    else if (action.type == 'SET_ROOM_JOINED')
    {
        return { ...state, roomJoinedStatus: action.payload.status};
    }
    else if (action.type == 'SET_NEXT_QUESTION')
    {
        return { ...state, nextQuestion: action.payload.status};
    }
    else if (action.type == 'SET_ROOM_EXISTS')
    {
        return { ...state, roomExists: action.payload.status};
    }
    else if (action.type == 'SET_GAME_STARTED')
    {
        return { ...state, gameStarted: action.payload.status};
    }
    else if (action.type == 'SET_BACK_TO_HOME')
    {
        return { ...state, backToHome: action.payload.status};
    }
    else if (action.type == 'SET_ROOM_ID')
    {
        return { ...state, roomId: action.payload.status};
    }
    else if (action.type == 'SET_REGISTER_STATUS')
    {
        return { ...state, registerStatus: action.payload.status};
    }
    else if (action.type == 'SET_SHOW_SCORE_STATUS')
    {
        return { ...state, showScoreStatus: action.payload.status};
    }
    else if (action.type == 'SET_CORRECT_ANSWER_RECEIVED')
    {
        return { ...state, correctAnswerReceived: action.payload.status};
    }
    else if (action.type == 'SET_SHOW_ERROR')
    {
        return { ...state, showError: action.payload.status};
    }
    else if (action.type == 'SET_ANSWER_CHOSEN')
    {
        return { ...state, answerChosen: action.payload.status};
    }
    else
    {
      return state;
    }
};

export default SocketReducer;
