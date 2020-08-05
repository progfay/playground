import React, { useState } from 'react'
import { render } from 'ink'

import type { Play, Bundle, Run, Pack } from './types'

export const play: Play = (nest, opts?) => {
  const [packs, setPacks] = useState<Pack[]>([])

  const bundle: Bundle = (name, nest) => {
    setPacks(states => [...states, { type: 'group', name, uuid: '', nest }])
  }

  const run: Run = (name, func) => {
    setPacks(states => [...states, { type: 'unit', name, uuid: '', func }])
  }

  nest(bundle, run)

  const App: React.FC = () => (
    <>
      {
        packs.map(pack => {
          switch (pack.type) {
            case 'group':
              return null

            case 'unit':
              return null

            default:
              return null
          }
        })
      }
    </>
  )

  render(<App />, opts)
}
