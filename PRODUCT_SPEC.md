# P2P Slack-style Chat Application: Product Specification

## Overview
This application provides a decentralized alternative to Slack that can be run peer-to-peer (P2P) by small groups of friends. Each participant runs the app on their computer and connects directly to their peers. The goal is a familiar Slack-like experience without reliance on a central server.

## Major Features
- **Channels**: Users can create named channels. Channels can be public or private. Members may join or leave at any time.
- **Direct Messages (DMs)**: One-to-one conversations.
- **Group DMs**: Ad-hoc conversations with multiple peers outside of channels.
- **Threading**: Any message can start a thread, even if it is already in a thread. Threads can nest infinitely.
- **Message Ordering**: Messages in a channel or thread appear chronologically, giving a traditional chat room feel.
- **Message Persistence**: Channel hosts ("archive nodes") keep the entire history of the channels they host. Regular clients may store only recent messages or none at all depending on configuration. Hosts synchronize history with one another.
- **Editing and Deleting**: Users can edit or delete their own messages. Edits/deletions propagate to all peers.
- **File Sharing**: Upload images, videos, and other files. Images and videos render inline in the chat history.
- **Formatting**: Basic Markdown formatting for messages (bold, italics, links, code blocks, lists, etc.).
- **Notifications**: Visual or audible alerts for mentions and direct messages.
- **End-to-End Encryption**: All communication between peers is end‑to‑end encrypted. Only intended recipients can read messages.
- **Message Integrity**: Every message includes a cryptographic signature from its sender and an incremental sequence or hash that allows peers to verify ordering and detect tampering.
- **Presence**: Optional indicators that show whether a peer is online.
- **Peer Roles**: Peers may operate as channel hosts (archive nodes) that store entire histories, as lightweight clients that fetch history on demand, or as relay nodes that forward messages when direct connections to hosts are unavailable.
- **Host Trust**: Cryptographic signatures ensure messages are authentic, but clients rely on at least one honest host to retain and share complete history.

## User Flows
1. **Starting a Network**
   - A user launches the app and either creates a new P2P network or connects to an existing peer to join an existing network.
   - The app exchanges necessary keys for encryption and establishes connections to peers.
   - During setup, a user may choose to operate as a channel host, relay node, or lightweight client.

2. **Channel Management**
   - Users create public or private channels, giving them names and descriptions.
   - To join a channel, a user selects it from a list of available channels (public) or is invited (private).
   - A user can leave or be removed from a channel at any time.

3. **Messaging**
   - In any channel, DM, or group DM, users type a message and send it. The message is encrypted and propagated to connected peers.
   - Each message is signed by its sender and assigned a sequence number or hash to prove its position in history.
   - Users may reply to any message, creating a new thread. Threads can form on any message, at any level of nesting.
   - Messages containing supported file types (images, videos, documents) show previews or renders inline.
   - A user may edit or delete their own message; updates are reflected for all peers.

4. **Receiving Messages**
   - New messages appear in chronological order in the appropriate channel or thread.
   - Notifications are shown when the user is mentioned or receives a DM. Notification behavior is configurable.
   - When connecting to a channel, clients fetch missing history from one or more hosts and verify message signatures and ordering.

5. **Adding Peers**
   - Users can share a connection invite (for example, a code or link) with friends.
   - Upon accepting an invite, peers connect directly and synchronize messages for channels they share.

6. **Configuration**
   - Each user can configure how long messages are stored locally (e.g., days, weeks, indefinitely).
   - Privacy options allow control over presence indicators and notifications.
   - Users can enable host mode for specific channels or opt to relay messages for others. Relays specify how long they buffer messages.

## Out of Scope for Product Spec
- Implementation details such as specific networking protocols, encryption libraries, or database choices are reserved for the technical specification.
- Hosting or server-based functionality beyond P2P connections.

