import React from 'react'
import { Text, Box } from 'ink'
import Spinner from 'ink-spinner'

import type { TextProps } from 'ink'
import { Status } from './types'

export const TITLE_PROPS_WITH_LEVEL: TextProps[] = [
  { color: 'black', backgroundColor: 'blueBright', bold: true },
  { color: 'black', backgroundColor: 'blueBright' },
  { color: 'white', backgroundColor: 'gray', bold: true },
  { color: 'white', backgroundColor: 'gray' },
  { color: 'white', backgroundColor: 'gray', bold: true, dimColor: true },
  { color: 'white', backgroundColor: 'gray', dimColor: true }
]

const DEFAULT_TITLE_PROPS = TITLE_PROPS_WITH_LEVEL[TITLE_PROPS_WITH_LEVEL.length - 1]

interface StatusBadgeProps {
  status: Status
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  switch (status) {
    case 'Running':
      return <Spinner type='dots' />

    case 'Failed':
      return <Text>❌</Text>

    case 'Success':
      return <Text>✅</Text>

    default:
      return null
  }
}

interface TitleProps {
  level: number
  text: string
  status?: Status
}

export const Title: React.FC<TitleProps> = ({ level, text, status }) => (
  <Box flexDirection='row'>
    <Text {...TITLE_PROPS_WITH_LEVEL[level] ?? DEFAULT_TITLE_PROPS}>{` ${text} `}</Text>
    {status !== undefined && <StatusBadge status={status} />}
  </Box>
)
