import { fetchClient } from '@/utils/fetch-client'
import type { PaginatedResponse } from '@utils/type'
import type { CreateUomPayload, Uom, UomQueryParams, UpdateUomPayload } from './validator'

export const fetchPaginatedUoms = async (deps: UomQueryParams) => {
	const response = await fetchClient
		.url('/uoms/list')
		.query(deps)
		.get()
		.json<PaginatedResponse<Uom>>()
	return response
}

export const createUom = async (data: CreateUomPayload) => {
	const response = await fetchClient.url('/uoms/create').post(data).json<Uom>()
	return response
}

export const fetchUomById = async (id: string) => {
	const response = await fetchClient.url(`/uoms/${id}/find`).get().json<Uom>()
	return response
}

export const updateUom = async (data: UpdateUomPayload) => {
	const response = await fetchClient.url(`/uoms/${data.id}/update`).post(data).json<Uom>()
	return response
}
