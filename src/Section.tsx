
import React from 'react'
import { Box, Text } from 'ink'
import { Block } from './Block'
import type { Unit, Group } from './types'

function isUnit(group: Group): group is Unit {
	return typeof group === 'function'
}

interface SectionProps {
	group: Group
}

export const Section: React.FC<SectionProps> = ({ group }) => {
	if (isUnit(group)) return <Block unit={group} />

	const [title, ...subgroups] = group
	return (
		<>
			<Text> {title} </Text>
			<Box marginLeft={2} padding={0} flexDirection="column">
				{
					subgroups.map((subgroup, i) => (
						<Section key={`${title}-${i}`} group={subgroup} />
					))
				}
			</Box>
		</>
	)
}
