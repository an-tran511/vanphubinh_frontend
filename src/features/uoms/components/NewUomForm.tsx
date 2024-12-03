import { InputLabel } from '@components/core/input-label'
import { TextInput } from '@components/form/text-input'
import { Button, Stack } from '@mantine/core'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { uomQueries, useCreateUom } from '../hooks'
import { uomStore } from '../store'
import type { NewUom } from '../validator'

export const NewUomForm = () => {
	const queryClient = useQueryClient()
	const { control, handleSubmit } = useForm<NewUom>({
		defaultValues: {
			name: '',
		},
	})

	const { mutate, isPending: isCreating } = useCreateUom()

	const onSubmit = (data: NewUom) => {
		mutate(data, {
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: uomQueries.lists() })
				uomStore.send({ type: 'closeCreateModal' })
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

				<Button type="submit" loading={isCreating}>
					Tạo
				</Button>
			</Stack>
		</form>
	)
}
