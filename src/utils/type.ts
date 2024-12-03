export type Meta = {
	total: number
	page: number
	perPage: number
	lastPage: number
}

export type PaginatedResponse<T, M = Meta> = {
	data: T[]
	meta: M
}
