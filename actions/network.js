import {messageTypes} from '../constants/websocket.js';

// export function wsStageTitle( stageId, stageTitle ) {
//   return ( dispatch, getState, {emit}) => {
//     dispatch({
//       type: UPDATE_STAGE_TITLE,
//       payload: {
//         stageId: stageId,
//         stageTitle: stageTitle
//       }
//     }),
//     emit( messageTypes.UPDATE_STAGE_TITLE, { stageId: stageId, stageTitle: stageTitle });
//   };
// }


export function doesRoomExist( rn ) {
  return (dispatch, getState, {emit}) => {
    //dispatch({ type: actionTypes.messageSendRequested })
    emit(messageTypes.doesRoomExist, { roomName: rn })
  }
}
