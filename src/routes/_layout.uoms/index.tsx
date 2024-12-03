import { ListLayout } from '@components/core/layouts/list-layout'
import { Table } from '@components/core/table'
import { NewUomForm } from '@features/uoms/components/NewUomForm'
import { uomQueries, useGetPaginatedUoms } from '@features/uoms/hooks'
import { uomStore } from '@features/uoms/store'
import type { UomQueryParams } from '@features/uoms/validator'
import { Modal } from '@mantine/core'
import { createFileRoute, getRouteApi, useNavigate } from '@tanstack/react-router'
import { generatePagination } from '@utils/generate-pagination'
import { useSelector } from '@xstate/store/react'

export const Route = createFileRoute('/_layout/uoms/')({
	component: RouteComponent,
	validateSearch: (search: UomQueryParams) => ({
		page: search.page ?? 1,
		perPage: search.perPage ?? 30,
	}),
	preSearchFilters: [
		(search) => ({
			...search,
			page: search.page ?? 1,
			perPage: search.perPage ?? 30,
		}),
	],
	loaderDeps: (search) => search.search,
	loader: ({ context: { queryClient }, deps }) =>
		queryClient.ensureQueryData(uomQueries.list(deps)),
})

const uomListRouteApi = getRouteApi('/_layout/uoms/')

function RouteComponent() {
	const navigate = useNavigate({ from: Route.fullPath })
	const createModalOpened = useSelector(uomStore, (state) => state.context.createModalOpened)
	const { page, perPage } = uomListRouteApi.useSearch()
	const { data, isPending } = useGetPaginatedUoms({ page, perPage })
	const { meta, data: uoms } = data ?? {}
	const columns = [
		{
			accessor: 'name',
			title: 'Tên',
			noWrap: true,
		},
	]
	const pagination = generatePagination({
		navigate,
		isPending,
		meta,
	})
	return (
		<ListLayout
			title="Đơn vị tính"
			createHandler={() => uomStore.send({ type: 'openCreateModal' })}
		>
			<Modal
				title="Tạo đơn vị tính"
				opened={createModalOpened}
				onClose={() => uomStore.send({ type: 'closeCreateModal' })}
			>
				<NewUomForm />
			</Modal>
			<Table columns={columns} records={uoms} pagination={pagination} isPending={isPending} />
		</ListLayout>
	)
}
