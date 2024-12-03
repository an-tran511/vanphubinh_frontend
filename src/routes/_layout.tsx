import { AppShell, Box, Burger, Group, em } from '@mantine/core'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout')({
	component: RouteComponent,
})

function RouteComponent() {
	const [opened, { toggle }] = useDisclosure(false)
	const isMobile = useMediaQuery(`(max-width: ${em(1023)})`)
	return (
		<AppShell
			header={{ height: 48, collapsed: !isMobile }}
			navbar={{
				width: '235',
				breakpoint: 'md',
				collapsed: { mobile: !opened },
			}}
			transitionDuration={500}
			transitionTimingFunction="ease"
			withBorder
			padding={0}
		>
			<AppShell.Header>
				<Group h="100%" px={{ base: 'md', md: 'lg' }} justify="space-between">
					<Burger opened={opened} onClick={toggle} hiddenFrom="md" size="xs" />
					<Box />
				</Group>
			</AppShell.Header>
			<AppShell.Navbar p="xs" m={0}>
				<div />
			</AppShell.Navbar>
			<AppShell.Main h="100dvh">
				<Outlet />
			</AppShell.Main>
		</AppShell>
	)
}
