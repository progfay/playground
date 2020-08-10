import React, { useEffect, useState } from 'react'
import { render, Box, useApp } from 'ink'
import { v4 as uuidv4 } from 'uuid'
import { PackBox } from './PackBox'

import type { Play, Nest, Group, Run, Assort } from './types'
import { UnitBox } from './UnitBox'

interface Props {
  nest: Nest
}

const App: React.FC<Props> = ({ nest }) => {
  const [assorts, setAssorts] = useState<Assort[]>([])
  const { exit } = useApp()

  useEffect(() => {
    new Promise(resolve => {
      const group: Group = (name, nest) => {
        setAssorts(states => [...states, {
          type: 'pack',
          uuid: uuidv4(),
          level: 0,
          name,
          nest
        }])
      }

      const run: Run = (name, func) => {
        setAssorts(states => [...states, {
          type: 'unit',
          uuid: uuidv4(),
          level: 0,
          name,
          func
        }])
      }

      nest(group, run)
      resolve()
    })
      .catch(exit)
  }, [])

  return (
    <Box flexDirection='column'>
      {
        assorts.map((assort, i) => {
          switch (assort.type) {
            case 'pack':
              return <PackBox key={`group-top-${i}`} {...assort} />

            case 'unit':
              return <UnitBox key={`unit-top-${i}`} {...assort} />

            default:
              return null
          }
        })
      }
    </Box>
  )
}

export const play: Play = (nest, opts?) => {
  render(<App nest={nest} />, opts)
}
