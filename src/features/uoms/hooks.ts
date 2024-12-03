import { keepPreviousData, queryOptions, useQuery } from '@tanstack/react-query'
import { fetchPaginatedUoms } from './api'
import type { UomQueryParams } from './validator'

export const uomQueries = {
	all: () => ['uoms'],
	lists: () => [...uomQueries.all(), 'list'],
	list: (params: UomQueryParams) =>
		queryOptions({
			queryKey: [...uomQueries.lists(), params],
			queryFn: () => fetchPaginatedUoms(params),
			placeholderData: keepPreviousData,
		}),
}

export const useGetPaginatedUoms = (params: UomQueryParams) => {
	return useQuery(uomQueries.list(params))
}
