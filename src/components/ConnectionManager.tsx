import { socket } from '../socket';

export function ConnectionManager() {
  function connect() {
    socket.connect();
  }

  function disconnect() {
    socket.disconnect();
  }

  return (
    <>
      <button type="button" onClick={connect}>Connect</button>
      <button type="button" onClick={disconnect}>Disconnect</button>
    </>
  );
}
