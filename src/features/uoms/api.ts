import { fetchClient } from '@/utils/fetch-client'
import type { PaginatedResponse } from '@utils/type'
import type { Uom, UomQueryParams } from './validator'

export const fetchPaginatedUoms = async (deps: UomQueryParams) => {
	const response = await fetchClient
		.url('/uoms/list')
		.query(deps)
		.get()
		.json<PaginatedResponse<Uom>>()
	return response
}
