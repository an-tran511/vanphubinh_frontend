import { InputLabel } from '@components/core/input-label'
import { TextInput } from '@components/form/text-input'
import { Button, Stack } from '@mantine/core'
import { useQueryClient } from '@tanstack/react-query'
import { useSelector } from '@xstate/store/react'
import { useForm } from 'react-hook-form'
import { uomQueries, useFindUomById, useUpdateUom } from '../hooks'
import { uomStore } from '../store'
import type { UpdateUomPayload } from '../validator'

export const EditUomForm = () => {
	const { uomId } = useSelector(uomStore, (state) => state.context)
	const queryClient = useQueryClient()
	const { data } = useFindUomById(uomId)
	const { control, handleSubmit, reset } = useForm<UpdateUomPayload>({
		defaultValues: {
			id: data?.id,
			name: data?.name,
		},
		values: {
			id: data?.id,
			name: data?.name,
		},
	})

	const { mutate, isPending: isUpdating } = useUpdateUom(data?.id)

	const onSubmit = (newData: UpdateUomPayload) => {
		mutate(newData, {
			onSuccess: () => {
				uomStore.send({ type: 'closeEditModal' })
			},
		})
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Stack>
				<div className="grid form-grid gap-y-4 gap-x-4">
					<>
						<InputLabel label="Tên đơn vị" />
						<TextInput control={control} name="name" variant="underline" data-autofocus />
					</>
				</div>

				<Button type="submit" loading={isUpdating}>
					Tạo
				</Button>
			</Stack>
		</form>
	)
}
