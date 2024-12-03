import vine from '@vinejs/vine'
import type { Infer } from '@vinejs/vine/types'

export const uomQueryParamsSchema = vine.object({
	page: vine.number().optional(),
	perPage: vine.number().optional(),
})

export type UomQueryParams = Infer<typeof uomQueryParamsSchema>
export const uomQueryParamsValidator = vine.compile(uomQueryParamsSchema)

export const uomSchema = vine.object({
	id: vine.string().minLength(22).maxLength(23),
	name: vine.string(),
})

export type Uom = Infer<typeof uomSchema>
