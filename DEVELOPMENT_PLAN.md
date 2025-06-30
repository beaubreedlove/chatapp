# ChatApp Development Plan

This document outlines the recommended order for implementing the ChatApp technical specification. Following these steps should yield a testable desktop application early in development.

## 1. Project Bootstrap
- Initialize an Electron project using React and TypeScript.
- Configure `electron-builder` to produce macOS and Windows builds so packaging can be tested from the start.

## 2. Cryptography Module
- Integrate libsodium bindings.
- Provide utilities for key generation, message encryption/decryption, and signing/verification.

## 3. Networking Layer
- Integrate libp2p with WebRTC transport for peer-to-peer connectivity.
- Implement peer discovery and connection establishment.
- Exchange small encrypted "ping" messages to verify connectivity and encryption.

## 4. Storage Abstraction
- Design a storage interface for reading and writing channel data.
- Implement a desktop backend using SQLite or LevelDB.

## 5. Minimal Chat Functionality
- Define a message model that handles signing, encrypting, broadcasting, and displaying messages chronologically.
- Build a basic UI for channel selection and text messaging using React within Electron.
- At this stage peers should be able to exchange messages in real time and hosts should persist them locally.

## 6. Expanded Features
- Add DMs and group DMs.
- Support editing and deleting messages and basic Markdown formatting.
- Begin initial support for file transfers and inline image previews.

## 7. Packaging and Auto-Update
- Finalize the `electron-builder` configuration for installers.
- Add auto-update checks so clients can upgrade easily.

Following this plan will produce a working prototype after step 5, allowing for early testing and incremental polish as further features are added.
