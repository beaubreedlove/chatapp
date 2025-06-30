import { createLibp2p } from 'libp2p';
import { webRTCStar } from '@libp2p/webrtc-star';
import { EventEmitter } from 'events';
import { Message } from './model';

export class Network extends EventEmitter {
  private node: any;

  async start() {
    this.node = await createLibp2p({
      transports: [webRTCStar()],
    });

    await this.node.start();
    this.node.addEventListener('message', (evt: any) => {
      const msg: Message = JSON.parse(evt.detail.toString());
      this.emit('message', msg);
    });
  }

  async sendMessage(peerId: string, msg: Message) {
    if (!this.node) throw new Error('node not started');
    const conn = await this.node.dial(peerId);
    await conn.stream.write(JSON.stringify(msg));
  }
}
