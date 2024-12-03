import type { UseNavigateResult } from '@tanstack/react-router'
import type { Meta } from '#utils/types'

type RoutePath = '/uoms' | '/products' | '/customers' | '/suppliers' | '/users'

export function generatePagination({
	navigate,
	isPending,
	meta,
}: {
	navigate: UseNavigateResult<RoutePath>
	isPending: boolean
	meta?: Meta
}) {
	return {
		page: meta?.page ?? 1,
		lastPage: meta?.lastPage ?? 1,
		total: meta?.total ?? 0,
		onPageChange: (nextPage: number) => {
			navigate({
				search: (old) => ({
					...old,
					page: nextPage,
				}),
			})
		},
		isLoading: isPending,
	}
}
