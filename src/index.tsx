import React, { useEffect, useState } from 'react'
import { render, Box, useApp } from 'ink'
import { v4 as uuidv4 } from 'uuid'
import { GroupBox } from './GroupBox'

import type { Play, Nest, Bundle, Run, Pack } from './types'
import { UnitBox } from './UnitBox'

interface Props {
  nest: Nest
}

const App: React.FC<Props> = ({ nest }) => {
  const [packs, setPacks] = useState<Pack[]>([])
  const { exit } = useApp()

  useEffect(() => {
    new Promise(resolve => {
      const bundle: Bundle = (name, nest) => {
        setPacks(states => [...states, {
          type: 'group',
          uuid: uuidv4(),
          level: 0,
          name,
          nest
        }])
      }

      const run: Run = (name, func) => {
        setPacks(states => [...states, {
          type: 'unit',
          uuid: uuidv4(),
          level: 0,
          name,
          func
        }])
      }

      nest(bundle, run)
      resolve()
    })
      .catch(exit)
  }, [])

  return (
    <Box flexDirection='column'>
      {
        packs.map((pack, i) => {
          switch (pack.type) {
            case 'group':
              return <GroupBox key={`group-top-${i}`} {...pack} />

            case 'unit':
              return <UnitBox key={`unit-top-${i}`} {...pack} />

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
