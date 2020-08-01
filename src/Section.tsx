
import React from 'react'
import { Box, Text } from 'ink'
import { ConsoleBox } from './ConsoleBox'
import type { Unit, Group } from './types'

function isUnit(group: Group): group is Unit {
	return typeof group === 'function'
}

interface SectionProps {
	group: Group
}

export const Section: React.FC<SectionProps> = ({ group }) => {
	if (isUnit(group)) return <ConsoleBox borderStyle='round' borderColor='gray' unit={group} />

	const [title, ...subgroups] = group
	return (
		<>
			<Text> {title} </Text>
			<Box paddingLeft={2} flexDirection="column">
				{
					subgroups.map((subgroup, i) => (
						<Section key={`${title}-${i}`} group={subgroup} />
					))
				}
			</Box>
		</>
	)
}
