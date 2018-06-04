import io from 'socket.io-client';
import {messageTypes, uri} from '../constants/websocket.js';
const socket = io( uri );

const init = ( store ) => {
  Object.keys( messageTypes )
    .forEach( type => socket.on( type, ( payload ) =>
       store.dispatch({ type, payload })));
};

const emit = ( type, payload ) => socket.emit( type, payload );

export {
  init,
  emit
}
