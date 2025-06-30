export interface Message {
  id: string;
  channel: string;
  author: string;
  timestamp: number;
  ciphertext: Uint8Array;
  signature: Uint8Array;
}
