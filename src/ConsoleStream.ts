import { Writable } from 'stream'
import sliceAnsi from 'slice-ansi'
import stripAnsi from 'strip-ansi'

type ConsoleHandler = (line: string) => void

export class ConsoleStream extends Writable {
  handler: ConsoleHandler

  constructor (handler: ConsoleHandler) {
    super()
    this.handler = handler
  }

  _write (chunk: Buffer, _: string, callback: () => void): void {
    const original = chunk.toString('utf-8').replace(/\n$/, '')
    const stripped = stripAnsi(original)
    let left = 0

    while (true) {
      const right = stripped.indexOf('\n', left)
      if (right === -1) {
        this.handler(sliceAnsi(original, left))
        break
      }

      this.handler(sliceAnsi(original, left, right))
      left = right + 1
    }
    callback()
  }
}
