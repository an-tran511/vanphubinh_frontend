import { Box, Button, Group, Stack, Title } from '@mantine/core'
import type { ReactNode } from 'react'

interface ListLayoutProps {
	children: ReactNode
	title: string
	createHandler?: () => void
}

export const ListLayout = (props: ListLayoutProps) => {
	const { title, children, createHandler } = props

	return (
		<Stack h="100%" gap="0">
			<Box
				style={{
					borderBottom: '1px solid #E7E8EC',
				}}
				px={{ base: 'md' }}
				py="xs"
			>
				<Group justify="space-between">
					<Group gap="xs">
						<Button
							variant="filled"
							justify="space-between"
							radius="md"
							onClick={() => createHandler?.()}
						>
							Mới
						</Button>

						<Title order={4} visibleFrom="md">
							{title}
						</Title>
						<Title order={5} hiddenFrom="md">
							{title}
						</Title>
					</Group>
				</Group>
			</Box>

			{children}
		</Stack>
	)
}
