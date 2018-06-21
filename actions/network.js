import {messageTypes} from '../constants/websocket.js';

export function doesRoomExist( rn ) {
  return (dispatch, getState, {emit}) => {
    //dispatch({ type: actionTypes.messageSendRequested })
    emit(messageTypes.doesRoomExist, { roomName: rn })
  }
}

export function joinRoom( rn, uid, dn ) {
  return (dispatch, getState, {emit}) => {
    //dispatch({ type: actionTypes.messageSendRequested })
    emit(messageTypes.joinRoom, {roomName: rn, userId: uid, displayName: dn  })
  }
}

export function register( mail ) {
  return (dispatch, getState, {emit}) => {
    //dispatch({ type: actionTypes.messageSendRequested })
    emit(messageTypes.register, {email:mail})
  }
}

export function getPlayerRanking( pId ) {
  return (dispatch, getState, {emit}) => {
    //dispatch({ type: actionTypes.messageSendRequested })
    emit(messageTypes.GetPlayerRanking, {playerId: pId})
  }
}

export function logIn( hsh ) {
  return (dispatch, getState, {emit}) => {
    //dispatch({ type: actionTypes.messageSendRequested })
    emit(messageTypes.LogInn, {hash: hsh})
  }
}

export function select( ans ) {
  return (dispatch, getState, {emit}) => {
    //dispatch({ type: actionTypes.messageSendRequested })
    emit(messageTypes.select, ans)
  }
}

export function getCorrectAnswer( questionInstanceId ) {
  return (dispatch, getState, {emit}) => {
    //dispatch({ type: actionTypes.messageSendRequested })
    emit(messageTypes.getCorrectAnswer, questionInstanceId)
  }
}

export const roomJoinedChanged = (status) => {
  return {
    type: 'SET_ROOM_JOINED',
    payload: {status}
  };
};

export const nextQuestionChanged = (status) => {
  return {
    type: 'SET_NEXT_QUESTION',
    payload: {status}
  };
};

export const roomExistsChanged = (status) => {
  return {
    type: 'SET_ROOM_EXISTS',
    payload: {status}
  };
};

export const gameStartedChanged = (status) => {
  return {
    type: 'SET_GAME_STARTED',
    payload: {status}
  };
};

export const backToHomeChanged = (status) => {
  return {
    type: 'SET_BACK_TO_HOME',
    payload: {status}
  };
};

export const roomIdChanged = (status) => {
  return {
    type: 'SET_ROOM_ID',
    payload: {status}
  };
};

export const registerStatusChanged = (status) => {
  return {
    type: 'SET_REGISTER_STATUS',
    payload: {status}
  };
};

export const showScoreStatusChanged = (status) => {
  return {
    type: 'SET_SHOW_SCORE_STATUS',
    payload: {status}
  };
};

export const correctAnswerReceivedChanged = (status) => {
  return {
    type: 'SET_CORRECT_ANSWER_RECEIVED',
    payload: {status}
  };
};

export const showErrorChanged = (status) => {
  return {
    type: 'SET_SHOW_ERROR',
    payload: {status}
  };
};
