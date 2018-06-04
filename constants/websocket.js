export const uri = 'http://192.168.0.101:3000';

export const messageTypes = [
  'UPDATE_STAGE_TITLE',
  'doesRoomExist'
].reduce( ( accum, msg ) =>
  {
    accum[ msg ] = msg;
    return accum;
  }, {});
