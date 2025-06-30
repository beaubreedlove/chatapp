import React, { useEffect, useState } from 'react';
import { Message } from '../model';

declare global {
  interface Window {
    api: {
      sendMessage(peerId: string, channel: string, text: string, recipientPublicKey: Uint8Array): Promise<Message>;
      getMessages(channel: string): Promise<Message[]>;
      onMessage(cb: (msg: Message) => void): void;
    };
  }
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');
  const channel = 'general';

  useEffect(() => {
    window.api.getMessages(channel).then(setMessages);
    window.api.onMessage((msg) => {
      if (msg.channel === channel) setMessages((m) => [...m, msg]);
    });
  }, []);

  async function handleSend() {
    const peerId = prompt('Peer ID?') || '';
    const recipientPkBase64 = prompt('Recipient public key?') || '';
    const recipientPk = Uint8Array.from(Buffer.from(recipientPkBase64, 'base64'));
    await window.api.sendMessage(peerId, channel, text, recipientPk);
    setText('');
  }

  return (
    <div>
      <h1>Channel: {channel}</h1>
      <div style={{ height: 300, overflow: 'auto', border: '1px solid #ccc' }}>
        {messages.map(m => (
          <div key={m.id}>{m.author}: encrypted message ({m.ciphertext.length} bytes)</div>
        ))}
      </div>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}
