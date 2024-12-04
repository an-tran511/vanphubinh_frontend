import {
	keepPreviousData,
	queryOptions,
	useMutation,
	useQuery,
	useSuspenseQuery,
} from '@tanstack/react-query'
import { createUom, fetchPaginatedUoms, fetchUomById, updateUom } from './api'
import type { CreateUomPayload, UomQueryParams, UpdateUomPayload } from './validator'

export const uomQueries = {
	all: () => ['uoms'],
	lists: () => [...uomQueries.all(), 'list'],
	list: (params: UomQueryParams) =>
		queryOptions({
			queryKey: [...uomQueries.lists(), params],
			queryFn: () => fetchPaginatedUoms(params),
			placeholderData: keepPreviousData,
		}),
	find: (id: string) =>
		queryOptions({
			queryKey: [...uomQueries.lists(), id],
			queryFn: () => fetchUomById(id),
		}),
}

export const useGetPaginatedUoms = (params: UomQueryParams) => {
	return useQuery(uomQueries.list(params))
}

export const useCreateUom = () => {
	return useMutation({
		mutationFn: (data: CreateUomPayload) => createUom(data),
	})
}

export const useFindUomById = (id: string) => {
	return useSuspenseQuery(uomQueries.find(id))
}

export const useUpdateUom = (id: string) => {
	return useMutation({
		mutationKey: [...uomQueries.lists()],
		mutationFn: (data: UpdateUomPayload) => updateUom(data),
	})
}
