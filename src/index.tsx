import React from 'react'
import { render } from 'ink'
import { Section } from './Section'

import type { RenderOptions } from 'ink'
import type { Group } from './types'

type PlayFunction = (group: Group, opts?: NodeJS.WriteStream | RenderOptions) => void
export const play: PlayFunction = (group, opts) => {
	render(<Section group={group} />, opts)
}
