export const uri = 'http://192.168.0.101:3000';

export const messageTypes = [
  'joinRoom',
  'doesRoomExist',
  'register',
  'GetPlayerRanking',
  'LogInn',
  'roomExist',
  'registerResponse',
  'logInInfo',
  'correct',
  'currentRanking',
  'questions'
].reduce( ( accum, msg ) =>
  {
    accum[ msg ] = msg;
    return accum;
  }, {});

  //on Room name enter
  //this.socket.emit('doesRoomExist', {roomName:"ABC"  } );
  //on user name center
  //this.socket.emit('joinRoom', {roomName:"ABC", userId: this.state.userId, displayName: "DisplayName"  } );
  // on create account
  //this.socket.emit('register', {email:"test@gmail.com"} );
  // to get current ranking
  //this.socket.emit('GetPlayerRanking', {playerId: this.state.userId});
  // Log in
  // this.socket.emit('LogInn', {hash: "asdasdasdfaf"});
