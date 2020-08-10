
import React, { useEffect, useState } from 'react'
import { Box, useApp } from 'ink'
import { v4 as uuidv4 } from 'uuid'
import { UnitBox } from './UnitBox'
import { Title } from './Title'

import type { Run, Group, Pack, Assort } from './types'

export const PackBox: React.FC<Pack> = ({ name, uuid, level, nest }) => {
  const [assorts, setAssorts] = useState<Assort[]>([])
  const { exit } = useApp()

  useEffect(() => {
    new Promise(resolve => {
      const group: Group = (name, nest) => {
        setAssorts(states => [...states, {
          type: 'pack',
          uuid: uuidv4(),
          level: level + 1,
          name,
          nest
        }])
      }

      const run: Run = (name, func) => {
        setAssorts(states => [...states, {
          type: 'unit',
          uuid: uuidv4(),
          level: level + 1,
          name,
          func
        }])
      }

      nest(group, run)
    })
      .catch(exit)
  }, [])

  return (
    <>
      <Title text={name} level={level} />
      <Box paddingLeft={2} flexDirection='column'>
        {
          assorts.map((assort, i) => {
            switch (assort.type) {
              case 'pack':
                return <PackBox key={`group-${uuid}-${i}`} {...assort} />

              case 'unit':
                return <UnitBox key={`unit-${uuid}-${i}`} {...assort} />

              default:
                return null
            }
          })
        }
      </Box>
    </>
  )
}
