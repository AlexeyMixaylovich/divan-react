import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = 'http://localhost:9000';

export const socket = io(URL, {
  // autoConnect: false,
  extraHeaders: {
    authorization: 'stage-user-token_1026333',
    limit: '2',
    // id: '6524fe45b9aea3044fa80201',
  },
});
