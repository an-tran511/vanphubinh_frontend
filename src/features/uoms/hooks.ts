import { keepPreviousData, queryOptions, useMutation, useQuery } from '@tanstack/react-query'
import { createUom, fetchPaginatedUoms } from './api'
import type { NewUom, UomQueryParams } from './validator'

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

export const useCreateUom = () => {
	return useMutation({
		mutationFn: (data: NewUom) => createUom(data),
	})
}
