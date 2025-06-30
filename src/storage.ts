import Database from 'better-sqlite3';
import { Message } from './model';

export class Storage {
  private db: Database;

  constructor(path: string) {
    this.db = new Database(path);
    this.db.exec(`CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY,
      channel TEXT,
      author TEXT,
      timestamp INTEGER,
      ciphertext BLOB,
      signature BLOB
    )`);
  }

  addMessage(msg: Message) {
    const stmt = this.db.prepare(`INSERT INTO messages (id, channel, author, timestamp, ciphertext, signature)
                                  VALUES (@id, @channel, @author, @timestamp, @ciphertext, @signature)`);
    stmt.run({
      ...msg,
      ciphertext: Buffer.from(msg.ciphertext),
      signature: Buffer.from(msg.signature)
    });
  }

  getMessages(channel: string): Message[] {
    const stmt = this.db.prepare(`SELECT * FROM messages WHERE channel = ? ORDER BY timestamp ASC`);
    const rows = stmt.all(channel);
    return rows.map(r => ({
      ...r,
      ciphertext: new Uint8Array(r.ciphertext),
      signature: new Uint8Array(r.signature)
    }));
  }
}
