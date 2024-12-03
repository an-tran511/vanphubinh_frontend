import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_layout/')({
	component: RouteComponent,
})

function RouteComponent() {
	return <>Trang chủ</>
}
