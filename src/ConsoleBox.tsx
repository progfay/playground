import React, { useState, useEffect } from 'react'
import { Box, Text, Newline } from 'ink'
import { Writable } from 'stream'
import { Console } from 'console'

import type { Dispatch, SetStateAction } from 'react'
import type { BoxProps } from 'ink'
import type { Unit } from './types'

type StateSetter<T> = Dispatch<SetStateAction<T>>

class ConsoleStream extends Writable {
	setLines: StateSetter<string[]>

	constructor(setLines: StateSetter<string[]>) {
		super()
		this.setLines = setLines
	}

  _write(chunk: Buffer, _: string, callback: () => void) {
		this.setLines(lines => [...lines, chunk.toString('utf-8').replace(/\n$/, '')])
    callback()
  }
}

interface ConsoleBoxProps extends BoxProps {
	unit: Unit
}

export const ConsoleBox: React.FC<ConsoleBoxProps> = ({ unit, ...boxProps }) => {
	const [lines, setLines] = useState<string[]>([])

	useEffect(() => {
		const console = new Console({
			stdout: new ConsoleStream(setLines),
			stderr: new ConsoleStream(setLines),
			colorMode: true
		})

		unit(console)
	}, [])

	return (
    <Box {...boxProps}>
      <Text>
        {lines.flatMap((line, i, arr) => ([
          <Text key={`text-${i}`}> {line} </Text>,
          i !== arr.length - 1 ? <Newline key={`newline-${i}`} /> : null
        ]))}
      </Text>
    </Box>
	)
}
