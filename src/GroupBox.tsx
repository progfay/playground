
import React, { useEffect, useState } from 'react'
import { Box } from 'ink'
import { v4 as uuidv4 } from 'uuid'
import { UnitBox } from './UnitBox'

import type { Bundle, Run, Group, Pack } from './types'
import { nextTick } from 'process'
import { Title } from './Title'

export const GroupBox: React.FC<Group> = ({ name, uuid, level, nest }) => {
  const [packs, setPacks] = useState<Pack[]>([])

  useEffect(() => {
    nextTick(() => {
      const bundle: Bundle = (name, nest) => {
        setPacks(states => [...states, {
          type: 'group',
          uuid: uuidv4(),
          level: level + 1,
          name,
          nest
        }])
      }

      const run: Run = (name, func) => {
        setPacks(states => [...states, {
          type: 'unit',
          uuid: uuidv4(),
          level: level + 1,
          name,
          func
        }])
      }

      nest(bundle, run)
    })
  }, [])

  return (
    <>
      <Title text={name} level={level} />
      <Box paddingLeft={2} flexDirection='column'>
        {
          packs.map((pack, i) => {
            switch (pack.type) {
              case 'group':
                return <GroupBox key={`group-${uuid}-${i}`} {...pack} />

              case 'unit':
                return <UnitBox key={`unit-${uuid}-${i}`} {...pack} />

              default:
                return null
            }
          })
        }
      </Box>
    </>
  )
}
