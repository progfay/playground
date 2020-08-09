import React, { useState, useEffect, useRef } from 'react'
import { Box, Text, measureElement } from 'ink'

import type { DOMElement } from 'ink'

interface LineProps {
  lineNumber: string
  text: string
}

export const Line: React.FC<LineProps> = ({ lineNumber, text }) => {
  const ref = useRef<DOMElement>(null)
  const [height, setHeight] = useState<number>(0)

  useEffect(() => {
    if (ref.current === null) return
    const { height } = measureElement(ref.current)
    setHeight(height)
  })

  return (
    <Box>
      <Text color='gray' bold>{` ${lineNumber} `}</Text>
      <Box width={2}>
        <Text color='gray'>{'│\n'.repeat(height).trimEnd()}</Text>
      </Box>
      <Box ref={ref}>
        <Text>{text}</Text>
      </Box>
    </Box>
  )
}
