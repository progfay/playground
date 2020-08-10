import { useEffect, useState } from 'react'
import { useApp } from 'ink'
import { v4 as uuidv4 } from 'uuid'

import type { Run, Group, Pack, Assort } from './types'

type UseAssortsHooks = (pack: Pick<Pack, 'nest' | 'level'>) => Assort[]

export const useAssorts: UseAssortsHooks = ({ nest, level }) => {
  const [assorts, setAssorts] = useState<Assort[]>([])
  const { exit } = useApp()

  useEffect(() => {
    new Promise(() => {
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

  return assorts
}
