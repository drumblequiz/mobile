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

export const roomJoinedChanged = (status) => {
  return {
    type: 'SET_ROOM_JOINED',
    payload: {status}
  };
};
