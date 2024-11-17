import React, { useEffect, useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
const client = new W3CWebSocket(process.env.REACT_APP_WEBSOCKET_URL);
const PracticeSession = () => {
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);
  useEffect(() => {
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      console.log('got reply!', dataFromServer);
      setChatLog((prevLog) => [...prevLog, dataFromServer]);
    };
  }, []);
  const sendMessage = () => {
    client.send(JSON.stringify({
      type: "message",
      msg: message,
    }));
    setMessage('');
  };
  return (
    <div>
      <h2>Real-time Practice Session</h2>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here..."
      />
      <button onClick={sendMessage}>Send</button>
      <div id="chatLog">
        {chatLog.map((logItem, index) => (
          <p key={index}>{logItem.msg}</p>
        ))}
      </div>
    </div>
  );
};
export default PracticeSession;