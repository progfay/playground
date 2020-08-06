import React, { useState, useEffect } from 'react'
import { Box } from 'ink'
import { Writable } from 'stream'
import { Console } from 'console'
import { Line } from './Line'

import type { Dispatch, SetStateAction } from 'react'
import type { BoxProps } from 'ink'
import type { Func } from './types'
import { nextTick } from 'process'

type StateSetter<T> = Dispatch<SetStateAction<T>>

class ConsoleStream extends Writable {
  setLines: StateSetter<string[]>

  constructor (setLines: StateSetter<string[]>) {
    super()
    this.setLines = setLines
  }

  _write (chunk: Buffer, _: string, callback: () => void): void {
    this.setLines(lines => [...lines, chunk.toString('utf-8').replace(/\n$/, '')])
    callback()
  }
}

interface ConsoleBoxProps extends BoxProps {
  func: Func
}

export const ConsoleBox: React.FC<ConsoleBoxProps> = ({ func, ...boxProps }) => {
  const [lines, setLines] = useState<string[]>([])

  useEffect(() => {
    const console = new Console({
      stdout: new ConsoleStream(setLines),
      stderr: new ConsoleStream(setLines),
      colorMode: true
    })

    nextTick(async (console: Console) => {
      try {
        await func(console)
      } catch (e) {
        console.error(e.toString())
      }
    }, console)
  }, [])

  const maxLineNumberDigitLength = lines.length.toString().length

  return (
    <Box flexDirection='column' {...boxProps}>
      {
        lines.map((line, i) => (
          <Line key={`line-${i}`} lineNumber={(i + 1).toString().padStart(maxLineNumberDigitLength, ' ')} text={line} />
        ))
      }
    </Box>
  )
}
