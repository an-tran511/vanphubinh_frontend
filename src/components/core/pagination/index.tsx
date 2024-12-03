import { Box, Group, Pagination as MantinePagination, Text } from '@mantine/core'

interface PaginationProps {
	page: number
	total: number
	lastPage: number
	onPageChange: (page: number) => void
	isLoading: boolean
}

export function Pagination({ page, total, lastPage, onPageChange, isLoading }: PaginationProps) {
	return (
		<Box
			px="md"
			style={{
				borderTop: '1px solid var(--mantine-color-gray-3)',
			}}
		>
			{page && onPageChange && (
				<>
					<Group justify="space-between" py="7" visibleFrom="md">
						<Text size="sm" c="dimmed">
							Hiện{' '}
							<b>
								{total ? (page - 1) * 30 + 1 : 0} - {page === lastPage ? total : page * 30}
							</b>{' '}
							trong tổng <b>{total}</b>
						</Text>
						<MantinePagination
							size="sm"
							onChange={onPageChange}
							value={page}
							total={lastPage}
							withEdges
							radius="md"
						/>
					</Group>
					<Group justify="space-between" py="xs" hiddenFrom="md">
						<Text c="dimmed" size="xs">
							<b>
								{total ? (page - 1) * 30 + 1 : 0} - {page === lastPage ? total : page * 30}
							</b>{' '}
							/ <b>{total}</b>
						</Text>
						<MantinePagination.Root
							total={lastPage}
							disabled={isLoading}
							size="xs"
							onChange={onPageChange}
							radius="md"
						>
							<Group gap={7} justify="center">
								<MantinePagination.Previous />
								<Text size="xs">
									{page} / {lastPage}
								</Text>
								<MantinePagination.Next />
							</Group>
						</MantinePagination.Root>
					</Group>
				</>
			)}
		</Box>
	)
}
