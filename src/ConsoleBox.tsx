import React, { useState, useEffect, useCallback } from 'react'
import { Box, useApp } from 'ink'
import { Console } from 'console'
import { Line } from './Line'
import { ConsoleStream } from './ConsoleStream'

import type { BoxProps } from 'ink'
import type { Func } from './types'

interface ConsoleBoxProps extends BoxProps {
  func: Func
  onSuccess?: () => void
  onFailed?: (e: Error) => void
}

export const ConsoleBox: React.FC<ConsoleBoxProps> = ({ func, onSuccess, onFailed, ...boxProps }) => {
  const [lines, setLines] = useState<string[]>([])
  const { exit } = useApp()

  const handler = useCallback((line) => {
    setLines(previous => [...previous, line])
  }, [])

  useEffect(() => {
    const run = async (func: Func): Promise<void> => {
      const console = new Console({
        stdout: new ConsoleStream(handler),
        stderr: new ConsoleStream(handler),
        colorMode: true
      })

      try {
        await func(console)
        onSuccess?.()
      } catch (e) {
        console.error(e.toString())
        onFailed?.(e as Error)
      }
    }

    run(func)
      .catch(exit)
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
