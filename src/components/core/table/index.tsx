import { Pagination } from '@components/core/pagination'
import { Alert, Card, Stack } from '@mantine/core'
import { DataTable, type DataTableProps } from 'mantine-datatable'
import classes from './Table.module.css'

export type TableProps<T = Record<string, unknown>> = DataTableProps<T> & {
	withBorder?: boolean
	isLoadingError?: boolean
	isPending?: boolean
	pagination: {
		isLoading: boolean
		total: number
		page: number
		lastPage: number
		onPageChange: (page: number) => void
	}
}
export function Table<T>(props: TableProps<T>) {
	const { pagination, isLoadingError, isPending, withBorder, ...otherProps } = props
	const { page = 1, onPageChange, lastPage = 1, isLoading, total } = pagination ?? {}

	const loadingErrorComponent = (
		<Stack h="100%" justify="center" align="center" px={{ base: 'lg', md: 'xs' }}>
			<Alert variant="light" color="red" title="Đã xảy ra lỗi trong quá trình tải dữ liệu">
				Xin hãy thử kiểm tra kết nối internet của bạn và tải lại trang
			</Alert>
		</Stack>
	)

	const paginationComponent = pagination && (
		<Pagination
			page={page}
			total={total}
			lastPage={lastPage}
			onPageChange={onPageChange}
			isLoading={isLoading}
		/>
	)

	const tableComponent = (
		<>
			<DataTable
				withRowBorders
				withTableBorder={false}
				scrollAreaProps={{
					style: {
						overflowY: 'auto',
					},
				}}
				className={classes.table}
				fetching={isPending}
				highlightOnHover={true}
				verticalSpacing="xs"
				verticalAlign="top"
				noRecordsText="Không có dữ liệu"
				withColumnBorders={false}
				{...otherProps}
			/>
			{paginationComponent}
		</>
	)

	return (
		<Card h="100%" p="0" withBorder={withBorder} radius="0">
			{isLoadingError ? loadingErrorComponent : tableComponent}
		</Card>
	)
}
