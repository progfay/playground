
import React, { useState, useCallback } from 'react'

import type { Unit, Status } from './types'
import { ConsoleBox } from './ConsoleBox'
import { Title } from './Title'

export const UnitBox: React.FC<Unit> = ({ name, level, func }) => {
  const [status, setStatus] = useState<Status>('Running')

  const onSuccess = useCallback(() => {
    setStatus('Success')
  }, [])
  const onFailed = useCallback(() => {
    setStatus('Failed')
  }, [])

  return (
    <>
      <Title text={name} status={status} level={level} />
      <ConsoleBox
        borderStyle='round'
        borderColor='gray'
        func={func}
        onSuccess={onSuccess}
        onFailed={onFailed}
      />
    </>
  )
}
