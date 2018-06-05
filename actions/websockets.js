import io from 'socket.io-client';
import {messageTypes} from '../constants/websocket.js';
import config from '../config.json';

const socket = io( config.serverAddress );

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
