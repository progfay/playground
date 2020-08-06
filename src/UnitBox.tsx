
import React from 'react'

import type { Unit } from './types'
import { ConsoleBox } from './ConsoleBox'
import { Title } from './Title'

export const UnitBox: React.FC<Unit> = ({ name, level, func }) => {
  return (
    <>
      <Title text={name} level={level} />
      <ConsoleBox borderStyle='round' borderColor='gray' func={func} />
    </>
  )
}
