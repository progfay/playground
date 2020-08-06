import React from 'react'
import { Text } from 'ink'

import type { TextProps } from 'ink'

export const TITLE_PROPS_WITH_LEVEL: TextProps[] = [
  { color: 'black', backgroundColor: 'blueBright', bold: true },
  { color: 'black', backgroundColor: 'blueBright' },
  { color: 'white', backgroundColor: 'gray', bold: true },
  { color: 'white', backgroundColor: 'gray' },
  { color: 'white', backgroundColor: 'gray', bold: true, dimColor: true },
  { color: 'white', backgroundColor: 'gray', dimColor: true }
]

const DEFAULT_TITLE_PROPS = TITLE_PROPS_WITH_LEVEL[TITLE_PROPS_WITH_LEVEL.length - 1]

interface TitleProps {
  level: number
  text: string
}

export const Title: React.FC<TitleProps> = ({ level, text }) => (
  <Text {...TITLE_PROPS_WITH_LEVEL[level] ?? DEFAULT_TITLE_PROPS}>{` ${text} `}</Text>
)
