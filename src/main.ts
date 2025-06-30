import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { Storage } from './storage';
import { Network } from './network';
import { Message } from './model';
import { init as cryptoInit, generateKeyPair, encryptMessage, decryptMessage, signMessage, verifyMessage } from './crypto';
import { randomUUID } from 'crypto';

let mainWindow: BrowserWindow | null = null;
const storage = new Storage(path.join(app.getPath('userData'), 'chat.db'));
const network = new Network();
const keyPair = generateKeyPair();

async function createWindow() {
  await cryptoInit();
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  await network.start();
  network.on('message', (msg: Message) => {
    storage.addMessage(msg);
    mainWindow?.webContents.send('message', msg);
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));
}

app.whenReady().then(createWindow);

ipcMain.handle('send-message', async (_event, peerId: string, channel: string, text: string, recipientPublicKey: Uint8Array) => {
  const { ciphertext, nonce } = encryptMessage(text, recipientPublicKey, keyPair.privateKey);
  const payload = new Uint8Array([...nonce, ...ciphertext]);
  const signature = signMessage(payload, keyPair.privateKey);
  const msg: Message = {
    id: randomUUID(),
    channel,
    author: Buffer.from(keyPair.publicKey).toString('base64'),
    timestamp: Date.now(),
    ciphertext: payload,
    signature,
  };
  storage.addMessage(msg);
  await network.sendMessage(peerId, msg);
  return msg;
});

ipcMain.handle('get-messages', (_event, channel: string) => {
  return storage.getMessages(channel);
});
