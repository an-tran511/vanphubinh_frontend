import { fetchClient } from '@/utils/fetch-client'
import type { PaginatedResponse } from '@utils/type'
import type { NewUom, Uom, UomQueryParams } from './validator'

export const fetchPaginatedUoms = async (deps: UomQueryParams) => {
	const response = await fetchClient
		.url('/uoms/list')
		.query(deps)
		.get()
		.json<PaginatedResponse<Uom>>()
	return response
}

export const createUom = async (data: NewUom) => {
	const response = await fetchClient.url('/uoms/create').post(data).json<Uom>()
	return response
}
