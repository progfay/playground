
import React from 'react'
import { Box, Text } from 'ink'
import { ConsoleBox } from './ConsoleBox'

import type { Unit, Group } from './types'
import type { TextProps } from 'ink'

function isUnit (group: Group): group is Unit {
  return typeof group === 'function'
}

export const TITLE_PROPS_WITH_LEVEL: TextProps[] = [
  { color: 'black', backgroundColor: 'blueBright', bold: true },
  { color: 'black', backgroundColor: 'blueBright' },
  { color: 'white', backgroundColor: 'gray', bold: true },
  { color: 'white', backgroundColor: 'gray' },
  { color: 'white', backgroundColor: 'gray', bold: true, dimColor: true },
  { color: 'white', backgroundColor: 'gray', dimColor: true }
]

const DEFAULT_TITLE_PROPS = TITLE_PROPS_WITH_LEVEL[TITLE_PROPS_WITH_LEVEL.length - 1]

interface SectionProps {
  level: number
  group: Group
}

export const Section: React.FC<SectionProps> = ({ level, group }) => {
  if (isUnit(group)) return <ConsoleBox borderStyle='round' borderColor='gray' unit={group} />

  const [title, ...subgroups] = group
  return (
    <>
      <Text {...TITLE_PROPS_WITH_LEVEL[level] ?? DEFAULT_TITLE_PROPS}>{` ${title} `}</Text>
      <Box paddingLeft={2} flexDirection='column'>
        {
          subgroups.map((subgroup, i) => (
            <Section key={`${title}-${i}`} level={level + 1} group={subgroup} />
          ))
        }
      </Box>
    </>
  )
}
