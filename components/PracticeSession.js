import React, { useEffect, useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

if (!process.env.REACT_APP_WEBSOCKET_URL) {
  console.error('REACT_APP_WEBSOCKET_URL environment variable is not set.');
}

const client = new W3CWebSocket(process.env.REACT_APP_WEBSOCKET_URL);

const PracticeSession = () => {
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);

  useEffect(() => {
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };

    client.onmessage = (message) => {
      try {
        const dataFromServer = JSON.parse(message.data);
        console.log('Got reply!', dataFromServer);
        setChatLog((prevLog) => [...prevLog, dataFromServer]);
      } catch (error) {
        console.error('Error parsing message data:', error);
      }
    };

    client.onerror = (error) => {
      console.error('WebSocket Error: ', error);
    };

    client.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      client.close();
    };
  }, []);

  const sendMessage = () => {
    try {
      if (client.readyState === W3CWebSocket.OPEN) {
        client.send(JSON.stringify({
          type: 'message',
          msg: message,
        }));
        setMessage('');
      } else {
        console.error('WebSocket is not open. Ready state: ', client.readyState);
      }
    } catch (error) {
      console.error('Error sending message: ', error);
    }
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