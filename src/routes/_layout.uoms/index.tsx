import { ListLayout } from '@/components/core/layouts/list-layout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/uoms/')({
	component: RouteComponent,
})

function RouteComponent() {
	return <ListLayout title="Đơn vị tính">Hello "/_layout/uoms/"!</ListLayout>
}
