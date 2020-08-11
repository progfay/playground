import { Writable } from 'stream'

type ConsoleHandler = (line: string) => void

export class ConsoleStream extends Writable {
  handler: ConsoleHandler

  constructor (handler: ConsoleHandler) {
    super()
    this.handler = handler
  }

  _write (chunk: Buffer, _: string, callback: () => void): void {
    this.handler(chunk.toString('utf-8').replace(/\n$/, ''))
    callback()
  }
}
