import React, { useState, useEffect } from 'react'
import { Box, Text, Newline } from 'ink'
import { Writable } from 'stream'
import { Console } from 'console'

import type { Unit } from './types'

type StateSetter<T> = Dispatch<SetStateAction<T>>
import type { Dispatch, SetStateAction } from 'react'

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

interface BlockProps {
	unit: Unit
}

export const Block: React.FC<BlockProps> = ({ unit }) => {
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
		<>
			<Box borderStyle="single" marginLeft={2}>
				<Text>
					{lines.flatMap((line, i, arr) => ([
						<Text key={`text-${i}`}> {line} </Text>,
						i !== arr.length - 1 ? <Newline key={`newline-${i}`} /> : null
					]))}
				</Text>
			</Box>
			<Newline />
		</>
	)
}
