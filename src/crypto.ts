import sodium from 'libsodium-wrappers';

export interface KeyPair {
  publicKey: Uint8Array;
  privateKey: Uint8Array;
}

export async function init() {
  await sodium.ready;
}

export function generateKeyPair(): KeyPair {
  const kp = sodium.crypto_box_keypair();
  return { publicKey: kp.publicKey, privateKey: kp.privateKey };
}

export function encryptMessage(message: string, recipientPublicKey: Uint8Array, senderPrivateKey: Uint8Array): { ciphertext: Uint8Array; nonce: Uint8Array } {
  const nonce = sodium.randombytes_buf(sodium.crypto_box_NONCEBYTES);
  const ciphertext = sodium.crypto_box_easy(message, nonce, recipientPublicKey, senderPrivateKey);
  return { ciphertext, nonce };
}

export function decryptMessage(ciphertext: Uint8Array, nonce: Uint8Array, senderPublicKey: Uint8Array, recipientPrivateKey: Uint8Array): string {
  const decrypted = sodium.crypto_box_open_easy(ciphertext, nonce, senderPublicKey, recipientPrivateKey);
  return sodium.to_string(decrypted);
}

export function signMessage(message: Uint8Array, privateKey: Uint8Array): Uint8Array {
  return sodium.crypto_sign_detached(message, privateKey);
}

export function verifyMessage(message: Uint8Array, signature: Uint8Array, publicKey: Uint8Array): boolean {
  return sodium.crypto_sign_verify_detached(signature, message, publicKey);
}
