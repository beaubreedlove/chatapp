# ChatApp

This repository contains an early MVP implementation of ChatApp following the first five steps of the development plan. It uses Electron with React, libp2p for peer networking, libsodium for encryption, and SQLite for local storage.

## Development

1. Install dependencies with `npm install`.
2. Run `npm start` to compile TypeScript and launch the Electron app.
3. Launch the app on multiple machines and share peer IDs and public keys when prompted to send encrypted messages.

Messages are stored locally in `chat.db` under the user's data directory.
