import React from 'react'
import { render, Box } from 'ink'
import { PackBox } from './PackBox'
import { UnitBox } from './UnitBox'
import { useAssorts } from './useAssorts'

import type { Play, Nest } from './types'

interface Props {
  nest: Nest
}

const App: React.FC<Props> = ({ nest }) => {
  const assorts = useAssorts({ nest, level: 0 })

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
