const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('api', {
  sendMessage: (peerId, channel, text, recipientPublicKey) => ipcRenderer.invoke('send-message', peerId, channel, text, recipientPublicKey),
  getMessages: (channel) => ipcRenderer.invoke('get-messages', channel),
  onMessage: (cb) => ipcRenderer.on('message', (_e, msg) => cb(msg))
});
