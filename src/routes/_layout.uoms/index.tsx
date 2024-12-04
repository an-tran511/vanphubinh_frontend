import { ListLayout } from '@components/core/layouts/list-layout'
import { Table } from '@components/core/table'
import { EditUomForm } from '@features/uoms/components/EditUomForm'
import { NewUomForm } from '@features/uoms/components/NewUomForm'
import { uomQueries, useGetPaginatedUoms } from '@features/uoms/hooks'
import { uomStore } from '@features/uoms/store'
import type { Uom, UomQueryParams } from '@features/uoms/validator'
import { FocusTrap, Group, Loader, Modal, ThemeIcon } from '@mantine/core'
import { createFileRoute, getRouteApi, useNavigate } from '@tanstack/react-router'
import { generatePagination } from '@utils/generate-pagination'
import { useSelector } from '@xstate/store/react'
import { EyeIcon } from 'lucide-react'
import { Suspense } from 'react'

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
	const editModalOpened = useSelector(uomStore, (state) => state.context.editModalOpened)
	const { page, perPage } = uomListRouteApi.useSearch()
	const { data, isPending } = useGetPaginatedUoms({ page, perPage })
	const { meta, data: uoms } = data ?? {}
	const columns = [
		{
			accessor: 'name',
			title: 'Tên',
			noWrap: true,
		},
		{
			accessor: 'actions',
			title: 'Hành động',
			render: (uom: Uom) => (
				<Group gap="xs">
					<ThemeIcon
						onClick={() => {
							uomStore.send({ type: 'openEditModal', id: uom.id })
						}}
						size="sm"
						variant="light"
					>
						<EyeIcon size={12} strokeWidth={2} />
					</ThemeIcon>
				</Group>
			),
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
			<Modal
				title="Chỉnh sửa đơn vị tính"
				opened={editModalOpened}
				onClose={() => uomStore.send({ type: 'closeEditModal' })}
			>
				<FocusTrap.InitialFocus />
				<Suspense
					fallback={
						<div className="flex justify-center items-center h-full">
							<Loader size="sm" />
						</div>
					}
				>
					<EditUomForm />
				</Suspense>
			</Modal>

			<Table columns={columns} records={uoms} pagination={pagination} isPending={isPending} />
		</ListLayout>
	)
}
