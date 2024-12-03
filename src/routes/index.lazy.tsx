import { Button } from '@mantine/core'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<div className="p-2">
			<h3>Welcome Home!</h3>
			<Button>Click me</Button>
		</div>
	)
}
