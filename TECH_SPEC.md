# ChatApp Technical Specification

This document outlines the initial technology choices for building the ChatApp desktop clients. It accompanies the product requirements in `PRODUCT_SPEC.md`.

## Goals
- Deliver a peer-to-peer Slack-style chat application with end-to-end encrypted messaging and signed messages.
- Provide macOS and Windows desktop apps from a single codebase.
- Keep core logic reusable for future browser or mobile clients.

## Platform
- **Desktop framework:** Electron, allowing one JavaScript/TypeScript codebase for macOS and Windows.
- **Language:** TypeScript for application logic and UI.
- **UI layer:** React rendered within Electron.

## Networking
- **P2P transport:** libp2p with WebRTC support for NAT traversal.  Connections can optionally relay through peers when direct links are unavailable.
- **Message routing:** Each connected peer shares messages with others per channel membership. Hosts (archive nodes) keep full history and synchronize with other hosts.

## Cryptography
- **Library:** libsodium (through Node bindings) for end-to-end encryption and digital signatures.
- Each message is encrypted for recipients and signed by the sender.  Peers verify ordering via incremental sequence numbers or hashes.

## Storage
- **Local persistence:** SQLite (via better-sqlite3) or LevelDB for storing channel history when operating as an archive node.
- A storage abstraction layer allows swapping in alternate back ends for browsers or mobile devices.

## Packaging and Updates
- **Build tooling:** electron-builder to produce installers for macOS and Windows.
- **Auto-update:** integrated update checks so peers can upgrade easily.

## Future Extensions
- The TypeScript messaging module and storage layer can be reused in a React Native or Flutter client for Android/iOS, or in a browser-based SPA using WebRTC.


## Development Roadmap
For an ordered plan on how to implement this specification, see [DEVELOPMENT_PLAN.md](./DEVELOPMENT_PLAN.md). It describes the recommended sequence of tasks that leads to a testable prototype and outlines additional feature work and packaging steps.
