
import React from 'react'
import { Box } from 'ink'
import { UnitBox } from './UnitBox'
import { Title } from './Title'
import { useAssorts } from './useAssorts'

import type { Pack } from './types'

export const PackBox: React.FC<Pack> = ({ name, uuid, level, nest }) => {
  const assorts = useAssorts({ nest, level })

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
